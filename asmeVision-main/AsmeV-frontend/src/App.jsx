import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './navbar';
import Section from './section';
import Upload from './ai_analyze';
import Gallery from './gallery';
import NotFound from './NotFound';
import Admin from './Admin'; // Add this import
import { AuthProvider } from './AuthContext';
import AuthModal from './AuthModal';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <nav>
          <Navbar />
        </nav>
        <section>
          <Routes>
            <Route path="/" element={<Section />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<Admin />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </section>
        <AuthModal />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;