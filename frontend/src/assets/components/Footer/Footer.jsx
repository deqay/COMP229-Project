import React from 'react';
import "./Footer.css";
import { ImFacebook } from 'react-icons/im';
import { BsTwitter } from 'react-icons/bs';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai';
import { AiOutlinePushpin } from 'react-icons/ai';

const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-logo">
                    <AiOutlinePushpin className="pin-icon" />
                </div>
                <div className="footer-links">
                    <ul>
                        <li>
                            <h3>About Us</h3>
                            <a href="#">About Visitara</a><br></br>
                            <a href="#">Careers</a><br></br>
                            <a href="#">Investor Relations</a><br></br>
                            <a href="#">Trust & Safety</a><br></br>
                            <a href="#">Content Guidelines</a><br></br>
                        </li>
                        <li>
                            <h3>Discover</h3>
                            <a href="#">Support</a><br></br>
                            <a href="#">Recent Activity</a><br></br>
                            <a href="#">Events</a><br></br>
                            <a href="#">Visitara Mobile</a><br></br>
                        </li>
                        <li>
                            <h3>Services</h3>
                            <a href="#">Visitara for Business</a><br></br>
                            <a href="#">Advertise on Visitara</a><br></br>
                            <a href="#">Claim your Business Page</a><br></br>
                            <a href="#">Business Support</a><br></br>
                            <a href="#">Visitara Blog for Business</a><br></br>
                        </li>
                        <li>
                            <h3>Contact Us</h3>
                            <a href="#">Email</a><br></br>
                        </li>
                    </ul>
                </div>
                <div className="footer-social">
                    <div className="social-icons">
                        <ImFacebook className="icon" />
                        <BsTwitter className="icon" />
                        <AiFillInstagram className="icon" />
                        <AiFillLinkedin className="icon" />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2023 Visitara. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
