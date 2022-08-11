import './HomePage.css'
import { AiFillGithub } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import LoginModal from './loginModal';
import SignupModal from './signupModal';
import Footer from "../Footer";



function HomePage() {

    const sessionUser = useSelector(state => state.session.user);
    if (sessionUser) {
        return <Redirect to='/business'/>;
      }
    return (
        <>
        <div className="homepage-container">
            <h1  className="home-title">Welcome to Ylp my Yelp Clone!</h1>\
            {!sessionUser && (
                <>
                    <LoginModal/>
                    <SignupModal/>
                </>
            )}
        </div>
            <Footer/>
        </>
    )
}


export default HomePage;
