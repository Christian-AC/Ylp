import './footer.css';
import { AiFillGithub,AiFillLinkedin } from 'react-icons/ai'


const Footer = () => {

  return (
    <div id="footer">
      <div id='footer-container'>
            <div className="each">
                <a className="feet" href="https://github.com/Christian-AC">
                    Made By: Christian Alcantara <AiFillGithub className="githubby" href="https://github.com/Christian-AC" />
                </a>
                <a className="feet" href="https://www.linkedin.com/in/christian-cayanan-48455a18a/">
                    <AiFillLinkedin href="https://www.linkedin.com/in/christian-cayanan-48455a18a/"/>
                </a>
            </div>
      </div>
   </div>
  );
}

export default Footer;
