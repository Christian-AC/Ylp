import './HomePage.css'
import { AiFillGithub } from 'react-icons/ai'
import SignUpForm from '../auth/SignUpForm';


function HomePage() {
    return (
        <>
        <div className="homepage-container">
            <h1  className="home-title">Welcome to Ylp my Yelp Clone!</h1>
            <SignUpForm/>
        </div>
        </>
    )
}


export default HomePage;
