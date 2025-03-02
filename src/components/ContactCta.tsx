import { ContactCTAWrapperStyled } from '../styled/StyledCard'

interface Props {
    email: string
    linkedin: string
}

const ContactCta = (props: Props) => {
    return (
        <ContactCTAWrapperStyled>
            <a href={`mailto:${props.email}`}><button className="email"><i className="fas fa-envelope"></i>&nbsp;&nbsp;Email</button></a>
        </ContactCTAWrapperStyled>
    )
}

export default ContactCta
