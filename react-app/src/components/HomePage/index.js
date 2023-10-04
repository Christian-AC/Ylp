import './HomePage.css'
import { useState } from "react";
import { useSelector } from 'react-redux';
import { Redirect,useHistory } from 'react-router-dom';
import LoginModal from './loginModal';
import SignupModal from './signupModal';
import Footer from "../Footer";
import Banner from "../Banner"



function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    const [search, setSearch] = useState("");
    const history = useHistory();

    const handleForm = async (e) => {
        e.preventDefault();

        if (search.length > 0) {
        history.push(`/search/${search}`);
        } else {
        history.push(`/`);
        }
    };

    return (
        <>
        {!sessionUser && (
        <div className="homepage-container">
            <h1  className="home-title">Welcome to Ylp my Yelp Clone!</h1>
            <h3 className="home-content"> With Ylp you can add your own business or add review of other business that you have visted.</h3>
            {!sessionUser && (
                <>
                <LoginModal/>
                </>
            )}
        </div>
        )}
        {sessionUser && (
            <Banner/>
        )}
            {/* <Footer/> */}
        </>
    )
}


export default HomePage;
