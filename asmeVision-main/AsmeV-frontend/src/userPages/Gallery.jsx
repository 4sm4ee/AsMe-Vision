import { useState, useEffect } from 'react';
import './gallery.css'; // Updated CSS file with merged styles

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour voir votre historique');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:3000/my-images', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors du chargement des images');
      }

      setImages(data.images);
      setFilteredImages(data.images);
      
      if (data.images.length > 0) {
        setSelectedImage(data.images[0]);
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = images.filter(img => 
      img.description.toLowerCase().includes(term) || 
      img.filename.toLowerCase().includes(term)
    );
    setFilteredImages(filtered);
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      return;
    }

    setDeleting(true);

    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`http://localhost:3000/delete-image/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la suppression');
      }

      // Mettre à jour la liste des images
      const updatedImages = images.filter(img => img._id !== imageId);
      setImages(updatedImages);
      setFilteredImages(updatedImages.filter(img => 
        img.description.toLowerCase().includes(searchTerm) || 
        img.filename.toLowerCase().includes(searchTerm)
      ));

      // Si l'image supprimée était sélectionnée, sélectionner la première image restante
      if (selectedImage?._id === imageId) {
        setSelectedImage(updatedImages.length > 0 ? updatedImages[0] : null);
      }

      setDeleting(false);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err.message);
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <div className="error-message">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="gallery-container">
        <div className="empty-state">
          <p>Aucune image disponible</p>
          <a href="/upload">Analyser une image</a>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <input 
        type="text" 
        placeholder="search...." 
        value={searchTerm} 
        onChange={handleSearch} 
        className="search-bar"
      />
      <div className="image-grid">
        {filteredImages.map((image) => (
          <img 
            key={image._id} 
            src={`http://localhost:3000${image.url}`} 
            alt={image.filename} 
            className="grid-image" 
            onClick={() => setSelectedImage(image)} 
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
            <div className="description-box">
              <h3 className='text-dark'>Description</h3>
              <p className="description-text">{selectedImage.description}</p>
            </div>
            <p className="date-box text-dark">
              <strong>Date:</strong> {formatDate(selectedImage.uploadedAt)}
            </p>
            <button 
              className="delete-btn"
              onClick={() => handleDelete(selectedImage._id)}
              disabled={deleting}
            >
              {deleting ? 'Suppression...' : 'Supprimer'}
            </button>
            <button className="close-btn" onClick={() => setSelectedImage(null)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}