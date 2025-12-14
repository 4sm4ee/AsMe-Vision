// section.jsx
import { useState } from "react";
import "./section.css";
import image1 from "./assets/ChatGPTImage.png";
import AuthModal from "./AuthModal";

export default function Section() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className='row'>
                <div className='col-md-6 d-flex flex-column justify-content-center align-items-center'>
                    <div className="img-wrapper">
                        <img
                            width={350}
                            height={320}
                            src={image1}
                            alt=""
                            className="pulse-img"
                        />
                    </div>
                    <p className='paragraph_section d-flex flex-column align-items-center justify-content-center'>
                        <span>AsMe</span>
                        <span>vision</span>
                    </p>
                </div>

                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <p className="description-text w-100">
                        Upload your images and let our AI analyze, describe, and save them automatically.
                    </p>

                    <button className="upload-btn" onClick={() => setShowModal(true)}>
                        Upload
                    </button>
                </div>
            </div>

            <AuthModal 
                showModal={showModal} 
                setShowModal={setShowModal} 
                initialIsSignup={false}
            />
        </>
    );
}