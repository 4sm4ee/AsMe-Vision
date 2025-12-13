import { useState, useEffect } from 'react';
import './section.css'; // Reuse for styling

export default function Admin() {
    const [users, setUsers] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in as admin.');
            return;
        }
        fetchUsers(token);
        fetchImages(token);
    }, []);

    const fetchUsers = async (token) => {
        try {
            const res = await fetch('http://localhost:3000/admin/users', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch users');
            const data = await res.json();
            setUsers(data.users);
        } catch (err) {
            setError(err.message);
        }
    };

    const fetchImages = async (token) => {
        try {
            const res = await fetch('http://localhost:3000/admin/images', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch images');
            const data = await res.json();
            setImages(data.images);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteUser = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/admin/user/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete user');
            setUsers(users.filter(user => user._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteImage = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/admin/image/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to delete image');
            setImages(images.filter(img => img._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="admin-container">
            <h2>Admin Dashboard</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <h3>Manage Users</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Manage Images</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Filename</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map(img => (
                        <tr key={img._id}>
                            <td>{img._id}</td>
                            <td>{img.userId}</td>
                            <td>{img.filename}</td>
                            <td>{img.description.substring(0, 50)}...</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDeleteImage(img._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}