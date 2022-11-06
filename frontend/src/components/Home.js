import React from 'react';
import "../App.css";
import "../static/med3.png";

const Home = () => {
    return(
        <div className="View WelcomeView">
            <nav className="Banner">
                <a href="/">LoremIpsum</a>
            </nav>

            <div className="Message">
                <div className="Title">
                    <h1>Trusted Health Information</h1>
                </div>
                <span className="Details">Access the LoremIpsum Portal</span>
            </div>
            <div className="NavButtons">
                <a href="/login">
                    <div className="NavButton">Login</div>
                </a>
            </div>
        </div>
    )
}

export default Home;