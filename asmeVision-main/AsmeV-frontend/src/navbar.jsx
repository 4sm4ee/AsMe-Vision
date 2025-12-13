import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function Navbar() {
    const { setShowAuthModal, setIsSignup } = useContext(AuthContext);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            const token = localStorage.getItem('token');
            setIsLoggedIn(!!token);
            if (token) {
                const user = JSON.parse(localStorage.getItem('user') || '{}');
                setIsAdmin(user.role === 'admin');
            } else {
                setIsAdmin(false);
            }
        };
        window.addEventListener('storage', handleStorage);
        handleStorage(); // Initial check
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.dispatchEvent(new Event('storage'));
        navigate('/');
    };

    return (
        <nav className="navigation row">
            <h1 className="navigation_title col-md-6">
                <div className='d-flex flex-column justify-content-center align-items-start text-center mb-0 mt-1 ms-5'><span>AsMe</span><span>vision</span></div>
            </h1>
            <div className="navigation_links col-md-6 d-flex justify-content-start align-items-center gap-3">
                <Link to="/">Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to="/upload">Upload Image</Link>
                        <Link to="/gallery">Gallery</Link>
                        {isAdmin && <Link to="/admin">Admin</Link>}
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>Logout</a>
                    </>
                ) : (
                    <div className='navigation_links_second'>
                        <a href="#" className='ms-5' onClick={(e) => { e.preventDefault(); setIsSignup(false); setShowAuthModal(true); }}>Login</a> | 
                        <a href="#" onClick={(e) => { e.preventDefault(); setIsSignup(true); setShowAuthModal(true); }}>Sign Up</a>
                    </div>
                )}
            </div>
        </nav>
    );
} 