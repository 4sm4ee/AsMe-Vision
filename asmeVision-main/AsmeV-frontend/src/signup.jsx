import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './section.css';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname: formData.name, lastname: '', email: formData.email, password: formData.password })
      });
      if (!response.ok) throw new Error('Erreur d\'inscription');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <Link to="/" className="text-muted mb-3 d-block">← Retour à l'accueil</Link>
      <div className="card bg-dark p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h3 className="text-center">Créer un compte</h3>
        <p className="text-center text-muted">Rejoignez AsMe Vision gratuitement</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Votre nom" value={formData.name} onChange={handleChange} className="form-control mb-3 bg-dark text-white" required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="form-control mb-3 bg-dark text-white" required />
          <input type="password" name="password" placeholder="Mot de passe" value={formData.password} onChange={handleChange} className="form-control mb-3 bg-dark text-white" required />
          <input type="password" name="confirmPassword" placeholder="Confirmer le mot de passe" value={formData.confirmPassword} onChange={handleChange} className="form-control mb-3 bg-dark text-white" required />
          <button type="submit" className="btn btn-cyan w-100">Créer mon compte</button>
        </form>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
      </div>
    </div>
  );
}