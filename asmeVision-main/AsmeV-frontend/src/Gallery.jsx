import { useState, useEffect } from 'react';
import './section.css'; // Reuse existing CSS file

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [editedDesc, setEditedDesc] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You must be logged in to view your gallery.');
                return;
            }
            try {
                const res = await fetch('http://localhost:3000/my-images', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Failed to fetch images');
                const data = await res.json();
                setImages(data.images);
                setFilteredImages(data.images);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchImages();
    }, []);

    useEffect(() => {
        if (selectedImage) {
            setEditedDesc(selectedImage.description);
        }
    }, [selectedImage]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = images.filter(img => 
            img.description.toLowerCase().includes(term) || 
            img.filename.toLowerCase().includes(term)
        );
        setFilteredImages(filtered);
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`http://localhost:3000/update-image/${selectedImage._id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({ description: editedDesc })
            });
            if (!res.ok) throw new Error('Failed to update description');
            // Update local state
            const updatedImages = images.map(img => 
                img._id === selectedImage._id ? { ...img, description: editedDesc } : img
            );
            setImages(updatedImages);
            setFilteredImages(updatedImages);
            setSelectedImage(null); // Close modal
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="gallery-container">
            <input 
                type="text" 
                placeholder="search...." 
                value={searchTerm} 
                onChange={handleSearch} 
                className="search-bar"
            />
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="image-grid">
                {filteredImages.map(img => (
                    <img 
                        key={img._id} 
                        src={`http://localhost:3000${img.url}`} 
                        alt={img.filename} 
                        className="grid-image" 
                        onClick={() => setSelectedImage(img)} 
                    />
                ))}
            </div>
            {selectedImage && (
                <div className="modal-backdrop">
                    <div className="modal-box">
                        <img 
                            src={`http://localhost:3000${selectedImage.url}`} 
                            alt={selectedImage.filename} 
                            className="modal-image"
                        />
                        <label>Description:</label>
                        <textarea 
                            value={editedDesc} 
                            onChange={(e) => setEditedDesc(e.target.value)} 
                            className="description-textarea"
                        />
                        <p>DATE ({new Date(selectedImage.uploadedAt).toLocaleString()})</p>
                        <button className="modal-btn" onClick={handleSave}>Save</button>
                        <button className="close-btn" onClick={() => setSelectedImage(null)}>X</button>
                    </div>
                </div>
            )}
        </div>
    );
}