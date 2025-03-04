import { useCallback, useEffect, useState } from 'react'
import {useParams} from "react-router-dom";
import Card from "../components/Card";

import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

import OutputDetails from '../components/OutputDetails.js'

import { doFetch } from "../services/fetchService.js";

const Decoder = () => {
    const params = useParams();
    const [downloadState, setDownloadState] = useState(false);
    const [breakpoint, setBreakpoint] = useState(Math.round(window.document.body.clientWidth / 16));
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

    window.addEventListener('resize', () => {
        setBreakpoint(Math.round((window.document.body.clientWidth) / 16));
    })

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
    return (
        <main id="main">
            <Card
                name={params.name}
                occupation={params.occupation}
                phone={params.phone}
                email={params.email}
                colors={colors}
                download_fun={download_image}
                download_state={downloadState}
                breakpoint={breakpoint}
                downloadable={true}
            />;
            <p>
                <OutputDetails
                    downloadState={true}
                    downloadable={true}
                    download_image={download_image}
                />
            </p>
        </main>
    )
}

export default Decoder;