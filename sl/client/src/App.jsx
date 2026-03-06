import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CatalogPage from './pages/CatalogPage';
import PeliculaDescripcion from './pages/PeliculaDescripcion/PeliculaDescripcion'; 
import SerieDescripcion from './pages/SerieDescripcion/SerieDescripcion'; // 1. Importas la nueva página de series

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />
        
        {/* Ruta del catálogo */}
        <Route path="/catalogo" element={<CatalogPage />} />

        {/* Ruta para la descripción de películas */}
        <Route path="/pelicula/:id" element={<PeliculaDescripcion />} />

        {/* 2. Nueva ruta para la descripción de series 
            Usamos "/serie/:id" para que coincida con la navegación de la Sidebar */}
        <Route path="/serie/:id" element={<SerieDescripcion />} />
      </Routes>
    </Router>
  );
}

export default App;