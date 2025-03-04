import { Button } from '../styled/FooterStyled'

interface Props {
    download_image: () => void,
    downloadState: boolean,
    downloadable: boolean,
}

const OutputDetails = ({
    downloadState,
    downloadable,
    download_image
}: Props) => {
    return (
        <>
            <Button
                className="for-desktop download_btn"
                title={downloadable ? "" : "Please fill out all fields"}
                onClick={download_image}
            >
                Tải về
                <i className={downloadState ? "fas fa-circle-notch load" : "fas fa-download"}></i>
            </Button>
        </>
    )
}

export default OutputDetails
