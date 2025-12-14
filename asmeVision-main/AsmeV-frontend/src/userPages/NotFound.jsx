import { Link } from 'react-router-dom';
import './section.css'; // Reuse for basic styling

export default function NotFound() {
    return (
        <div className="notfound-container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="display-1">404</h1>
            <h2>Page Not Found</h2>
            <p className="text-muted mb-4">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">Go Back to Home</Link>
        </div>
    );
}