import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import * as htmlToImage from 'html-to-image'
import download from 'downloadjs'

import { UserInputWrap } from './styled/UserInputSection.js'
import { HeadingStyled } from './styled/Headings.js'
import Card from "./components/Card";
import Footer from './components/Footer.js'

import { doFetch } from "./services/fetchService.js";
import InputDetails from './components/InputDetails.js'

function App() {
  const [downloadState, setDownloadState] = useState(false);
  const [downloadable, setDownloadable] = useState(false);
  const [breakpoint, setBreakpoint] = useState(Math.round(window.document.body.clientWidth / 16));
  const [inputs, setInputs] = useState<Record<string, string | undefined>>({
    name: undefined,
    occupation: undefined,
    phone: undefined,
    email: undefined,
  });
  const [colors, setColors] = useState({
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

  function colorChange(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const target = e.target as EventTarget & HTMLDivElement;

    function borderChange(element: HTMLElement) {
      element.style.borderColor = "#000000"; //#ffb681
      const all_color_selectors = element.parentElement && element.parentElement.childNodes;
      if (all_color_selectors) all_color_selectors.forEach((item) => {
        if (item.nodeName !== "p") {
          if (item !== element) {
            (item as HTMLElement).style.borderColor = "transparent";
          }
        }
      })
    }

    if (target.style.backgroundColor === "rgb(88, 44, 77)") {
      borderChange(target);
      setColors({
        cardBackgroundColor: "#582C4D",
        nameColor: "#ECE2D0",
        occupationColor: "#F3BF99",
        phoneColor: "#BFB5AF",
        aboutInterestsTitleColor: "#ECE2D0",
        descColor: "#D6CCC0",
        emailColor: "#BFB5AF",
        emailBackgroundColor: "#6B3B54",
        infoColor: "#fff",
        companyColor: "#fff"
      })
    } else if (target.style.backgroundColor === "black") {
      borderChange(target);
      setColors({
        cardBackgroundColor: "#1A1B21",
        nameColor: "#FFFFFF",
        occupationColor: "#F3BF99",
        phoneColor: "#767676",
        aboutInterestsTitleColor: "#F5F5F5",
        descColor: "#9a9a9a",
        emailColor: "#918E9B",
        emailBackgroundColor: "#161619",
        infoColor: "#fff",
        companyColor: "#fff"
      })
    } else if (target.style.backgroundColor === "white") {
      borderChange(target);
      setColors({
        cardBackgroundColor: "#F5F5F5",
        nameColor: "#000000",
        occupationColor: "#d46c1f",
        phoneColor: "#767676",
        aboutInterestsTitleColor: "#252525",
        descColor: "#7e7e7e",
        emailColor: "#747474",
        emailBackgroundColor: "#D5D4D8",
        infoColor: "#fff",
        companyColor: "#fff"
      })
    } else if (target.style.backgroundColor === "rgb(61, 90, 128)") {
      borderChange(target);
      setColors({
        cardBackgroundColor: "#3D5A80",
        nameColor: "#E0FBFC",
        occupationColor: "#E7B4A5",
        phoneColor: "#98C1D9",
        aboutInterestsTitleColor: "#E0FBFC",
        descColor: "#98C1D9",
        emailColor: "#98C1D9",
        emailBackgroundColor: "#385071",
        infoColor: "#fff",
        companyColor: "#fff"
      })
    } else if (target.style.backgroundColor === "rgb(244, 232, 193)") {
      borderChange(target);
      setColors({
        cardBackgroundColor: "#F4E8C1",
        nameColor: "#502419",
        occupationColor: "#2B4141",
        phoneColor: "#A2866D",
        aboutInterestsTitleColor: "#502419",
        descColor: "#795543",
        emailColor: "#502419",
        emailBackgroundColor: "#E0D0AC",
        infoColor: "#fff",
        companyColor: "#fff"
      })
    }
    else if (target.style.backgroundColor === "rgb(238, 180, 179)") {
      borderChange(target);
      setColors({
        cardBackgroundColor: "#EEB4B3",
        nameColor: "#402350",
        occupationColor: "#784784",
        phoneColor: "#2F242C",
        aboutInterestsTitleColor: "#402350",
        descColor: "#784784",
        emailColor: "#402350",
        emailBackgroundColor: "#DBA2AC",
        infoColor: "#fff",
        companyColor: "#fff"
      })
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
    <>
      <main id="main">
        <UserInputWrap>
          <HeadingStyled className="main-heading">APP TẠO NAMECARD</HeadingStyled>
          <InputDetails
            handleInputChange={handleInputChange}
            inputs={inputs}
            themes={themes}
            colorChange={colorChange}
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
          />
      </main>
      <Footer />
    </>
  );
}

export default App;