import styled from 'styled-components';

export const CardWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #23252C;
    height: 100%;
    width: 40%;
    position: sticky;
    top: 2rem;
    margin-bottom: 4rem;

    @media screen and (max-width: 45em){
        width: 80%;
        margin-bottom: 2rem;
    }
`;

export const CardStyled = styled.div<{
    colors: Record<string, string>;
}>`
    background-color: ${props => props.colors.cardBackgroundColor};
    width: 32.5rem;
    border: 1px solid transparent;
    border-radius: 0.9rem;
    overflow: hidden;
`;

export const MainContentWrapperStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export const IntroductionWrapperStyled = styled.div`
    display: flex;
    flex-direction: column;
`;

export const IntroductionStyled = styled.div<{
    colors: Record<string, string>
}>`
    margin-bottom: 1.5rem;
    .name, .occupation, .phone, .email{
        margin-left: 1rem;
        margin-right: 1rem;
        text-align: left;
    }
    .name{
        font-size: 1.3rem;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: bold;
        color: ${props => props.colors.nameColor}
    }
    .occupation{
        font-size: 0.8rem;
        font-family: 'Lato', sans-serif;
        color: ${props => props.colors.occupationColor};
    }
    .phone{
        font-size: 0.6rem;
        margin-top: 0.5rem;
        color: ${props => props.colors.phoneColor};
        font-family: 'Inter', sans-serif;
    }
    .email{
        font-size: 0.6rem;
        margin-top: 0.5rem;
        color: ${props => props.colors.emailColor};
        font-family: 'Inter', sans-serif;
    }
    .logo{
        margin-top: 1rem;
        margin-bottom: 2.5rem;
        float: right;
        width: 14rem;
    }
    .company{
        font-size: 1.3rem;
        font-family: Helvetica, Arial, sans-serif;
        font-weight: bold;
        color: ${props => props.colors.companyColor}
    }
    .info{
        font-size: 0.6rem;
        margin-top: 0.5rem;
        color: ${props => props.colors.phoneColor};
        font-family: 'Inter', sans-serif;
    }
    .icon{        
        width:0.75rem;
        margin-right: 0.25rem;
    }
    .icon svg{
        color: #767676;
    }    
    .fas{
        margin-right: 0.25rem;
    }
    .qrcode{
        height: 6.5rem;
        margin-left: 1rem;
        margin-top: 1rem;
    }
`;

export const ContactCTAWrapperStyled = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 1rem 1.1rem 1.3rem 1.1rem;

    a{
        width: 38%;
    }
    
    button {
        cursor: pointer;
        width: 100%;
        padding: 0.3rem 0.6rem;
        outline: none;
        font-family: 'Inter', sans-serif;
        font-size: 0.7rem;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        font-weight: 500;
    }
    .email{
        background-color: #ffffff;
        color: #374151;
    }
    .linkedin{
        background-color: #5093E2;
        color: #ffffff;
    }
`;