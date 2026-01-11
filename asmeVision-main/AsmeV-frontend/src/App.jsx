import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

// Layouts utilisateur
import Navbar from "./userPages/navbar";
import Navbarlogin from "./userPages/Navbarlogin";

// Pages utilisateur
import Section from "./userPages/section";
import Upload from "./userPages/ai_analyze";
import Gallery from "./userPages/Gallery";

// Layout Admin
import AdminLayout from "./layouts/Admin.jsx";

// Composant de layout pour les pages d'accueil (non connecté)
export function HomeLayout() {
  return (
    <>
    <div className="background_field">
      <Navbar />
      <Outlet />
    </div>
    </>
  );
}

// Composant de layout pour les pages connectées (upload, gallery)
export function UploadLayout() {
  return (
    <>
    <div className="background_field">
      <Navbarlogin />
      <Outlet />
    </div>
      
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Routes utilisateur - Page d'accueil */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Section />} />
        </Route>

        {/* Routes utilisateur - Pages connectées */}
        <Route element={<UploadLayout />}>
          <Route path="/upload" element={<Upload />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>

        {/* Routes Admin - Dashboard */}
        <Route path="/admin/*" element={<AdminLayout />} />
        {/* Redirection par défaut */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}