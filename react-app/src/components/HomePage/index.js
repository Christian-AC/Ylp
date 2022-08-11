import './HomePage.css'
import { AiFillGithub } from 'react-icons/ai'
import { useSelector } from 'react-redux';
import LoginModal from './loginModal';
import SignupModal from './signupModal';


function HomePage() {

    const sessionUser = useSelector(state => state.session.user);
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
        </>
    )
}


export default HomePage;
