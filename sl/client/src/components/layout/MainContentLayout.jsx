import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Play } from 'lucide-react'; 

// Corregimos las rutas saliendo de 'layout' para entrar en 'home'
import CatalogHeader from '../home/CatalogHeader';
import Sidebar from '../home/Sidebar';
import EpisodesSection from '../home/EpisodesSection'; 
import SeriesSection from '../home/SeriesSection';

const MainContentLayout = () => {
  const movies = Array.from({ length: 30 });
  
  // ESTADO GLOBAL ÚNICO: Controla el brillo en toda la página
  const [activeGlobalId, setActiveGlobalId] = useState(null);
  const touchTimer = useRef(null);

  // Función para manejar el toque con un pequeño delay para evitar falsos positivos al scrollear
  const handleTouchStart = (id) => {
    // Si ya hay un timer corriendo, lo limpiamos
    if (touchTimer.current) clearTimeout(touchTimer.current);
    
    // 80ms es el "sweet spot": suficiente para ignorar roces locos, 
    // pero lo bastante rápido para que se sienta instantáneo al tocar.
    touchTimer.current = setTimeout(() => {
      setActiveGlobalId(id);
    }, 80);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
  };

  return (
    <section 
      className="bg-[#080705] text-white py-12 px-4 min-[801px]:px-12" 
      onClick={() => setActiveGlobalId(null)}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 min-[1500px]:grid-cols-[1fr_320px] gap-12">
          
          <div className="flex flex-col overflow-hidden">
            <CatalogHeader />

            <div className="grid grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-5 gap-3 min-[480px]:gap-6">
              {movies.map((_, idx) => {
                const myId = `movie-${idx}`;
                const isSelected = activeGlobalId === myId;
                
                return (
                  <Link 
                    to={`/pelicula/${idx}`} 
                    key={idx}
                    className="outline-none"
                  >
                    <div 
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        handleTouchStart(myId);
                      }}
                      onTouchMove={handleTouchEnd}
                      onTouchEnd={handleTouchEnd}
                      className="group cursor-pointer relative outline-none"
                    >
                      {/* Contenedor Principal: Aseguramos overflow-hidden para que el contenido interno no sobresalga */}
                      <div className={`aspect-[2/3] w-full bg-white/5 rounded-xl min-[480px]:rounded-2xl border overflow-hidden relative
                        transition-all duration-500 ease-out
                        ${isSelected ? 'border-[#3b82f6] scale-[1.02] shadow-[0_0_25px_rgba(59,130,246,0.4)] !duration-150' : 'border-white/10'}
                        min-[801px]:group-hover:border-[#3b82f6]/50 min-[801px]:group-hover:scale-[1.02] min-[801px]:group-hover:duration-150`}
                      >
                        {/* Fondo y Blur: Se mantienen dentro del rounded-xl por el overflow-hidden anterior */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                        
                        <div className={`absolute inset-0 bg-[#3b82f6]/10 backdrop-blur-[3px] transition-opacity duration-500 ease-out
                          ${isSelected ? 'opacity-100 !duration-150' : 'opacity-0'}
                          min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:duration-150`}></div>

                        {/* Botón Play */}
                        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform
                          ${isSelected ? 'opacity-100 scale-100 !duration-150' : 'opacity-0 scale-75'}
                          min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:scale-100 min-[801px]:group-hover:duration-150`}>
                          <div className="bg-[#3b82f6] p-2.5 min-[480px]:p-4 rounded-full shadow-lg shadow-[#3b82f6]/40">
                            <Play className="w-4 h-4 min-[480px]:w-6 min-[480px]:h-6 text-white fill-white" />
                          </div>
                        </div>

                        <div className="absolute top-1.5 left-1.5 min-[480px]:top-3 min-[480px]:left-3 bg-[#3b82f6] text-white text-[7px] min-[480px]:text-[9px] font-black px-1.5 py-0.5 min-[480px]:px-2 min-[480px]:py-1 rounded-md uppercase z-20">1080p</div>
                      </div>

                      <h4 className={`mt-2 text-[11px] min-[480px]:text-sm font-bold transition-colors duration-500 truncate
                        ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-gray-300'}
                        min-[801px]:group-hover:text-[#3b82f6] min-[801px]:group-hover:duration-150`}>
                        Contenido {idx + 1}
                      </h4>
                      <p className="text-[9px] min-[480px]:text-[10px] text-gray-500 font-medium tracking-wide">2026 • Acción</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-16 flex justify-center">
              <Link to="/catalogo" className="group flex items-center gap-2 bg-[#3b82f6] text-white px-6 py-3 rounded-xl font-black text-[11px] uppercase transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#3b82f6]/20">
                <Plus className="w-4 h-4" /> Ver más contenido
              </Link>
            </div>

            {/* SECCIONES SINCRONIZADAS */}
            <div className="mt-12 space-y-12">
              <EpisodesSection activeGlobalId={activeGlobalId} setActiveGlobalId={setActiveGlobalId} />
              <SeriesSection activeGlobalId={activeGlobalId} setActiveGlobalId={setActiveGlobalId} />
            </div>
          </div>

          <aside className="w-full mt-12 min-[1500px]:mt-0">
            <div className="sticky top-24">
              <Sidebar activeGlobalId={activeGlobalId} setActiveGlobalId={setActiveGlobalId} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default MainContentLayout;