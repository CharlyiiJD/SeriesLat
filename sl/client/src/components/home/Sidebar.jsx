import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importamos el navegador

const Sidebar = ({ activeGlobalId, setActiveGlobalId }) => {
  const [filter, setFilter] = useState('series');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const touchTimer = useRef(null);
  const navigate = useNavigate(); // Inicializamos el hook

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSplitMode = windowWidth < 1500 && windowWidth > 600;

  const handleTouchStart = (id) => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => {
      setActiveGlobalId(id);
    }, 80);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
  };

  const formatDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const popularItems = Array.from({ length: 10 });

  const ContentCard = ({ type, idx, globalIdx }) => {
    const isSelected = activeGlobalId === globalIdx;

    // Función para manejar la navegación al hacer clic
    const handleClick = () => {
      if (type === 'series') {
        navigate('/serie/loki'); // Ruta para tu nuevo archivo de series
      } else {
        navigate('/pelicula/spiderman'); // Ruta para películas
      }
    };

    return (
      <div 
        onClick={handleClick} // Agregamos el evento de clic
        onTouchStart={(e) => {
          e.stopPropagation();
          handleTouchStart(globalIdx);
        }}
        onTouchMove={handleTouchEnd}
        onTouchEnd={handleTouchEnd}
        className={`group flex items-center gap-3 bg-white/[0.02] border p-2 rounded-xl cursor-pointer overflow-hidden outline-none
          transition-all duration-500 ease-out
          ${isSelected 
            ? 'bg-white/[0.08] border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.2)] !duration-150' 
            : 'border-white/5 hover:bg-white/[0.06] hover:border-[#3b82f6]/30 min-[801px]:hover:duration-150'
          }`}
      >
        <div className="h-14 aspect-[2/3] bg-white/10 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/5">
          <div className="absolute inset-0 flex items-center justify-center text-[7px] text-gray-600 font-bold uppercase">Img</div>
          <div className={`absolute inset-0 bg-[#3b82f6]/10 transition-opacity duration-500 ${isSelected ? 'opacity-100 !duration-150' : 'opacity-0'}`}></div>
        </div>

        <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
          <h4 className={`text-[13px] font-bold transition-colors duration-500 truncate
            ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-gray-200 group-hover:text-[#3b82f6]'}`}>
            {type === 'series' ? 'Serie Top' : 'Peli Top'} {idx + 1}
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 font-medium">2024</span>
              <span className="text-[10px] text-gray-500 font-medium">
                {type === 'movies' ? formatDuration(125) : '3 Temp'}
              </span>
            </div>
            <div className={`flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md transition-all duration-500 ${isSelected ? 'shadow-[0_0_8px_rgba(59,130,246,0.3)] !duration-150' : ''}`}>
              <Star className="w-2.5 h-2.5 text-[#3b82f6] fill-[#3b82f6]" />
              <span className="text-[10px] font-black text-[#3b82f6]">8.9</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl transition-all duration-500">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-4">
          <h3 className="text-base font-black uppercase tracking-tighter text-white">Populares</h3>
          <div className="h-5 w-[3px] bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full"></div>
        </div>

        {!isSplitMode && (
          <div className="relative flex bg-black/40 rounded-full p-1 border border-white/5 w-[140px]">
            <motion.div 
              layout
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className={`absolute top-1 bottom-1 rounded-full bg-[#3b82f6] ${
                filter === 'series' ? 'left-1 w-[55px]' : 'left-[70px] w-[65px]'
              }`}
            />
            <button onClick={() => setFilter('series')} className={`relative z-10 flex-1 py-1 text-[9px] font-black ${filter === 'series' ? 'text-white' : 'text-gray-500'}`}>SERIES</button>
            <button onClick={() => setFilter('movies')} className={`relative z-10 flex-1 py-1 text-[9px] font-black ${filter === 'movies' ? 'text-white' : 'text-gray-500'}`}>PELÍCULAS</button>
          </div>
        )}
      </div>

      <div className="w-full h-[1px] bg-[#3b82f6]/20 mb-6"></div>

      <div className="relative">
        {isSplitMode ? (
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-black text-[#3b82f6] uppercase tracking-[0.25em] mb-2 border-l-2 border-[#3b82f6] pl-2">Series</span>
              {popularItems.map((_, i) => (
                <ContentCard key={`s-${i}`} type="series" idx={i} globalIdx={`side-s-${i}`} />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[11px] font-black text-[#3b82f6] uppercase tracking-[0.25em] mb-2 border-l-2 border-[#3b82f6] pl-2">Películas</span>
              {popularItems.map((_, i) => (
                <ContentCard key={`m-${i}`} type="movies" idx={i} globalIdx={`side-m-${i}`} />
              ))}
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex flex-col gap-3"
            >
              {popularItems.map((_, idx) => (
                <ContentCard key={idx} type={filter} idx={idx} globalIdx={`side-f-${idx}`} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default Sidebar;