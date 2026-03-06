import React from 'react';
import { IoIosArrowUp } from "react-icons/io";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#0c1821] border-t border-white/5 py-4 min-[566px]:py-6 px-6 min-[801px]:px-12 mt-5">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center gap-6">
        
        {/* LADO IZQUIERDO: Logo y Textos Condicionales */}
        <div className="flex items-center gap-6 flex-1">
          {/* LOGO FULL */}
          <div className="flex-shrink-0">
            <img 
              src="/assets/logos/logo-full.png" 
              alt="Logo" 
              className="h-7 min-[566px]:h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* TEXTOS: Se ocultan completamente por debajo de 566px */}
          <div className="hidden min-[566px]:flex flex-col">
            <div className="flex items-center gap-2 text-gray-300 text-[12px] font-medium">
              <span className="font-bold text-gray-200">© SeriesLat</span>
              <span className="text-gray-500 font-normal border-l border-white/10 pl-2">Tus películas y series favoritas gratis en 1 Link</span>
            </div>
            <p className="text-gray-500 text-[11px] font-normal leading-tight mt-0.5">
              Descargar películas y series en 720p HD, 1080p Full HD y 4K UHD
            </p>
          </div>
        </div>

        {/* LADO DERECHO: Navegación (Condicional) y Flecha */}
        <div className="flex items-center gap-4 min-[800px]:gap-8">
          {/* Navegación: Solo visible desde 800px para evitar colisión con el texto central */}
          <nav className="hidden min-[800px]:flex items-center gap-6">
            {['Inicio', 'Películas', 'Series', 'Anime'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[14px] font-medium tracking-wide text-gray-300 hover:text-[#3b82f6] transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* BOTÓN FLECHA: Siempre visible, ajustado un poco en tamaño para móvil */}
          <button
            onClick={scrollToTop}
            className="w-8 h-8 min-[566px]:w-9 min-[600px]:h-9 border-2 border-[#3b82f6] rounded-md flex items-center justify-center text-[#3b82f6] hover:bg-[#3b82f6] hover:text-white transition-all duration-300 cursor-pointer active:scale-90"
            aria-label="Subir"
          >
            <IoIosArrowUp className="text-lg min-[566px]:text-xl" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;