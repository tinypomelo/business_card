import { Button, Input } from "../styled/UserInputSection"

interface Props {
    inputs: Record<string, string | undefined>,
    themes: string[],
    colorChange: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    download_image: () => void,
    downloadState: boolean,
    downloadable: boolean,
}

const InputDetails = ({
    handleInputChange,
    inputs,
    downloadState,
    downloadable,
    download_image
}: Props) => {
    return (
        <>
            <Input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={inputs.name || ""}
                id="name"
                placeholder="Tên"
                required
                autoComplete="off"
            />
            <Input
                type="text"
                name="occupation"
                onChange={handleInputChange}
                value={inputs.occupation || ""}
                id="occupation"
                placeholder="Chức danh"
                required
                autoComplete="off"
            />
            <Input
                type="email"
                name="email"
                onChange={handleInputChange}
                value={inputs.email || ""}
                id="email"
                placeholder="Email"
                required
                autoComplete="off"
            />
            <Input
                type="text"
                name="phone"
                onChange={handleInputChange}
                value={inputs.phone || ""}
                id="phone"
                placeholder="Số điện thoại"
                required
                autoComplete="off"
            />
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

export default InputDetails
