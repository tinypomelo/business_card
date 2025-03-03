import { IntroductionStyled } from '../styled/StyledCard'
import location from '../assets/logo.png'
import { renderSVG } from 'uqr'

interface Props {
  name: string
  occupation: string
  phone: string
  email: string
  colors: Record<string, string>
}

const Introduction = (props: Props) => {
  return (
    <IntroductionStyled colors={props.colors}>
      <table>
       <tbody>
          <tr>
            <td><img className="qrcode"src={`data:image/svg+xml;utf8,${encodeURIComponent(generateURL())}`} /></td>
            <td><img className="logo" src={location} alt="" /></td>
          </tr>
          <tr>
            <td>
              <p className="name">{clearSpaces(props.name)}</p>
              <p className="occupation">{clearSpaces(props.occupation)}</p>
              <p>&nbsp;</p>
              <p className="phone"><i className="fas fa-phone"></i>{clearSpaces(props.phone)}</p>
              <p className="email"><i className="fas fa-envelope"></i>{props.email}</p>
            </td>
            <td>
              <p className="company">TRUNG T&Acirc;M<br/>ĐIỀU H&Agrave;NH SCADA</p>
              <p className="info">Địa chỉ: 12 Thi S&aacute;ch, Quận 1, TP. HCM, Việt Nam</p>
              <p className="info">Điện thoại: +(84-28) 38 233 392</p>
              <p className="info">Fax: +(84-28) 38 239 264</p>
              <p className="info">Website: scada.evnspc.vn</p>
            </td>
          </tr>
        </tbody>
      </table>

    </IntroductionStyled>
    
  )

  function generateURL(): string {
    // let res = 'http://localhost/decoder/' + props.name + '/' + props.email + '/' + props.phone + '/' + props.occupation;
    let res = 'https://scadanamecard.netlify.app/decoder/' + props.name + '/' + props.email + '/' + props.phone + '/' + props.occupation;
    res = res.replace(/\s+/g,"%20");
    return renderSVG(res);
  }

  function clearSpaces(input: string): string {
    let res = input.replace(/%20/g, " ");
    return res;
  }
}

export default Introduction
