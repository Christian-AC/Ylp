import './footer.css';
import { AiFillGithub } from 'react-icons/ai'


const Footer = () => {

  return (
    <div id="footer">
      <div id='footer-container'>
            <div className="each">
                <a className="feet" href="https://github.com/Christian-AC">
                    Christian Alcantara <AiFillGithub className="githubby" href="https://github.com/Christian-AC" />
                </a>
            </div>
      </div>
   </div>
  );
}

export default Footer;
