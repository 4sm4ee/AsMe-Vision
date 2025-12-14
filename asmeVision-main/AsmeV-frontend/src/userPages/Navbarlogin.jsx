import './navbar.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
export default function Navbarlogin() {
    const navigate = useNavigate();
    const handleLogout = () => {
        const confirmLogout = window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
        
        if (confirmLogout) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('storage'));
            navigate('/');
        }
    };

    return (
        <nav className="navigation row">
            <h1 className="navigation_title col-md-6">
                <div className='d-flex flex-column justify-content-center align-items-start text-center mb-0 mt-1 ms-5'>
                    <span>AsMe</span>
                    <span>vision</span>
                </div>
            </h1>
            <div className="navigation_links_login col-md-6 d-flex justify-content-start align-items-center gap-3">
                <a href="/upload">Home</a>
                <div className='navigation_links_second_login'>
                    <Link to="/gallery" className='ms-5'>Mon historique</Link> | <Link href="#">Mon compte</Link> | <Link onClick={(e)=>{e.preventDefault();handleLogout()}}>Logout</Link>
                </div>
            </div>
        </nav>
    );
}