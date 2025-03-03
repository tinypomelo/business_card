import React from 'react';
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

import { UserInputWrap } from '../styled/UserInputSection.js'
import { HeadingStyled } from '../styled/Headings.js'
import Card from "../components/Card";

import InputDetails from '../components/InputDetails.js'

import { doFetch } from "../services/fetchService.js";

const Encoder = () => {
    const [downloadState, setDownloadState] = useState(false);
    const [downloadable, setDownloadable] = useState(false);
    const [breakpoint, setBreakpoint] = useState(Math.round(window.document.body.clientWidth / 16));
    const [inputs, setInputs] = useState<Record<string, string | undefined>>({
        name: undefined,
        occupation: undefined,
        phone: undefined,
        email: undefined,
    });
    const [colors] = useState({
        cardBackgroundColor: "#fff",
        nameColor: "#000000",
        companyColor: "#1E4594",
        occupationColor: "#EC202A",
        phoneColor: "#767676",
        aboutInterestsTitleColor: "#252525",
        descColor: "#7e7e7e",
        infoColor: "#747474",
        emailColor: "#747474",
        emailBackgroundColor: "#D5D4D8"
    });
    const [themes] = useState([
        "black",
        "white",
        "#EEB4B3",
        "#F4E8C1",
        "#3D5A80",
        "#582C4D"
    ]);

    function inputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const target = e.target;
        setInputs(prev => {
            return {
                ...prev,
                [target.name]: target.value
            }
        })
    }

    function input_check() {
        const filled = {
            inputs: false,
            textarea: false,
            image: false
        }

        const all_input_fields = document.querySelectorAll("input");
        const textareas = document.querySelectorAll("textarea");

        for (let index = 0; index < all_input_fields.length; index++) {
            if (index === 0) {
                if (all_input_fields[index].files?.length !== 0) {
                    filled.image = true;
                }
            } else {
                if (all_input_fields[index].value === undefined || all_input_fields[index].value === "") {
                    filled.inputs = false;
                    break;
                } else if (all_input_fields[index].value !== undefined || all_input_fields[index].value !== "") {
                    filled.inputs = true;
                }
            }
        }

        for (let index = 0; index < textareas.length; index++) {
            if (textareas[index].value === "") {
                filled.textarea = false;
                break;
            } else if (textareas[index].value !== "") {
                filled.textarea = true;
            }
        }

        if (filled.image && filled.textarea && filled.inputs) {
            setDownloadable(true)
        } else {
            setDownloadable(false);
        }
    }

    function download_image() {
        setDownloadState(true);

        htmlToImage.toPng(document.querySelector("#card") as HTMLElement, {
            quality: 1.0
        }).then((dataUrl) => {
            download(dataUrl, 'business_card_image')
            setDownloadState(true);

            setTimeout(() => {
                setDownloadState(false);
            }, 1000)
        })
    }

    window.addEventListener('resize', () => {
        setBreakpoint(Math.round((window.document.body.clientWidth) / 16));
    })

    const sendAnalytics = useCallback(async (body: string, options: { signal: AbortSignal }) => {
        await doFetch('https://contact-card-server.netlify.app/.netlify/functions/api', {
            method: 'post',
            headers: {
                'Content-Type': 'text/plain'
            },
            signal: options.signal,
            body,
        })
    }, [])

    useEffect(() => {
        const controller = new AbortController();
        const url = new URL(window.location.href)
        const search = new URLSearchParams(url.searchParams)

        if (search.toString() === "") {
            sendAnalytics('direct', {
                signal: controller.signal
            })
        } else {
            for (const i of search.entries()) {
                sendAnalytics(i[1], {
                    signal: controller.signal
                })
            }
        }

        return () => {
            controller.abort();
        }
    }, [sendAnalytics]);

    function props_conf(field: string) {
        return inputs[field] === '' ? undefined : inputs[field];
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        inputChange(e);
        input_check();
    }
    return (

        <main id="main">
            <UserInputWrap>
                <HeadingStyled className="main-heading">APP TẠO NAMECARD</HeadingStyled>
                <InputDetails
                    handleInputChange={handleInputChange}
                    inputs={inputs}
                    themes={themes}
                    colorChange={() => {}}
                    downloadState={downloadState}
                    downloadable={downloadable}
                    download_image={download_image}
                />
            </UserInputWrap>
            <Card
                name={props_conf('name')}
                occupation={props_conf('occupation')}
                phone={props_conf('phone')}
                email={props_conf('email')}
                colors={colors}
                download_fun={download_image}
                download_state={downloadState}
                breakpoint={breakpoint}
                downloadable={downloadable}
            />;
        </main>
    )
}


export default Encoder;