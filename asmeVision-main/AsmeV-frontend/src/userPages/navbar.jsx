// navbar.jsx
import { useState } from 'react';
import './navbar.css';
import image1 from "../assets/ChatGPTImage.png";
import AuthModal from './AuthModal';
export default function Navbar() {
    const [showModal, setShowModal] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    return (
        <>
            <nav className="navigation row">
                <h1 className="navigation_title col-md-6">
                    <div className="d-flex align-items-center gap-3 ms-1 mt-1">
                        <img 
                        src={image1} 
                        alt="AsMe Vision Logo"
                        className="navigation_logo"
                        />
                        <div className="d-flex flex-column justify-content-center">
                            <span>AsMe</span>
                            <span>vision</span>
                        </div> 
                    </div>
                </h1>

                <div className="navigation_links col-md-6 d-flex justify-content-start align-items-center gap-3">
                    <a href="#">Home</a>
                    <div className='navigation_links_second'>
                        <a 
                            href="#" 
                            className='ms-5'
                            onClick={(e) => {
                                e.preventDefault();
                                setIsSignup(false);
                                setShowModal(true);
                            }}
                        >
                            Login
                        </a> | 
                        <a 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsSignup(true);
                                setShowModal(true);
                            }}
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </nav>

            <AuthModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                initialIsSignup={isSignup} 
            />
        </>
    );
}