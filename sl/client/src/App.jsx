import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import SeriesPage from './pages/SeriesPage';
import PeliculaDescripcion from './pages/PeliculaDescripcion/PeliculaDescripcion';
import SerieDescripcion from './pages/SerieDescripcion/SerieDescripcion';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import ActorPage from './pages/ActorPage';
import Estudio from './pages/Estudio'; 
import NotFound from './pages/NotFound'; // 👈 Importamos tu nueva página

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTAS NORMALES */}
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/pelicula/:id" element={<PeliculaDescripcion />} />
        <Route path="/serie/:id" element={<SerieDescripcion />} />
        <Route path="/buscar" element={<SearchPage />} />
        <Route path="/categoria" element={<CategoryPage />} />
        <Route path="/actor/:slug" element={<ActorPage />} />

        {/* RUTA SECRETA DEL PANEL */}
        <Route path="/estudio" element={<Estudio />} />

        {/* RUTA EXPLÍCITA DE ERROR (Para usar con navigate('/404')) */}
        <Route path="/404" element={<NotFound />} />

        {/* HONEYPOTS — redirigen silenciosamente al inicio */}
        {/* Los mantenemos así para que los bots no sepan que existe un 404 real */}
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/admin/*" element={<Navigate to="/" replace />} />
        <Route path="/dashboard" element={<Navigate to="/" replace />} />
        <Route path="/panel" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/wp-admin" element={<Navigate to="/" replace />} />
        <Route path="/wp-login" element={<Navigate to="/" replace />} />

        {/* CUALQUIER RUTA NO DEFINIDA → Muestra el mensaje gracioso */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;