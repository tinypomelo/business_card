import { CardWrap, CardStyled, MainContentWrapperStyled, IntroductionWrapperStyled } from '../styled/StyledCard'
import { HeadingStyled } from '../styled/Headings'
import Introduction from './Introduction'
import { Button } from '../styled/UserInputSection'
import { Tilt } from 'react-tilt'

interface Props {
    name: string,
    occupation: string,
    email: string,
    phone: string,
    colors: {
        cardBackgroundColor: string,
        nameColor: string,
        occupationColor: string,
        phoneColor: string,
        aboutInterestsTitleColor: string,
        descColor: string,
        emailColor: string,
        emailBackgroundColor: string
    },
    download_fun: () => void,
    download_state: boolean,
    breakpoint: number,
    downloadable: boolean
}

const Card = (props: Props) => {
    // card JSX element
    const cardWithStylesJSX = (
        <CardStyled className="card" id="card" colors={props.colors}>
            <MainContentWrapperStyled>
                <IntroductionWrapperStyled>
                    <Introduction name={props.name} occupation={props.occupation} phone={props.phone} email={props.email} colors={props.colors} />
                </IntroductionWrapperStyled>
            </MainContentWrapperStyled>
        </CardStyled>
    );

    return (
        <>
            <CardWrap id="cardwrap">
                <HeadingStyled>HÌNH MẪU</HeadingStyled>
                {props.breakpoint <= 43 ? cardWithStylesJSX : <Tilt className="Tilt" options={{ max: 20, scale: 1.01, perspective: 1100, speed: 500, reverse: false, transition: true }}>{cardWithStylesJSX}</Tilt>}
                <Button className="for-mobile download_btn" disabled={props.downloadable ? false : true} title={props.downloadable ? "" : "Please fill out all fields"} onClick={() => { props.download_fun() }}><div className="content">Download<i className={props.download_state ? "fas fa-circle-notch load" : "fas fa-download"}></i>{!props.downloadable && <div className="warn">Please fill out all the fields</div>}</div></Button>
            </CardWrap>
        </>
    )
}

Card.defaultProps = {
    name: "Võ Đặng Phương Bình",
    email: "binhvdp.scada@evnspc.vn",
    phone: "+(84) 917 123 595",
    occupation: "Chuyên viên",
}

export default Card
