import React, { useRef } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SeriesSection = ({ activeGlobalId, setActiveGlobalId }) => {
  const navigate = useNavigate();
  const touchTimer = useRef(null);

  const seriesList = Array.from({ length: 15 }).map((_, i) => ({
    title: `Serie Destacada ${i + 1}`,
    año: '2026',
    temporadas: Math.floor(Math.random() * 5) + 1,
  }));

  const handleTouchStart = (id) => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => {
      setActiveGlobalId(id);
    }, 80);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
  };

  return (
    <div className="mt-20 w-full max-w-[1032px]">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-10 min-[850px]:h-12 w-[4px] bg-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex-shrink-0"></div>
          <h2 className="text-sm min-[1100px]:text-base font-black uppercase leading-tight tracking-tighter text-white">
            Series <br className="hidden min-[850px]:block" /> Destacadas
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold text-gray-500 tracking-wider">42,890</span>
          <button
            onClick={() => navigate('/series')}
            className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-black px-4 py-2 rounded-sm uppercase transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Más Series
          </button>
        </div>
      </div>

      {/* GRID 5x3 */}
      <div className="grid grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-5 gap-3 min-[480px]:gap-6">
        {seriesList.map((serie, idx) => {
          const myId = `serie-${idx}`;
          const isSelected = activeGlobalId === myId;

          return (
            <div
              key={idx}
              className="group cursor-pointer relative outline-none"
              onClick={() => navigate('/serie/descripcion')}
              onTouchStart={(e) => {
                e.stopPropagation();
                handleTouchStart(myId);
              }}
              onTouchMove={handleTouchEnd}
              onTouchEnd={handleTouchEnd}
            >
              <div className={`aspect-[2/3] w-full bg-white/5 rounded-xl min-[480px]:rounded-2xl border overflow-hidden relative
                transition-all duration-500 ease-out
                ${isSelected ? 'border-[#3b82f6] scale-[1.02] shadow-[0_0_25px_rgba(59,130,246,0.4)] !duration-150' : 'border-white/10'}
                min-[801px]:group-hover:border-[#3b82f6]/50 min-[801px]:group-hover:scale-[1.02] min-[801px]:group-hover:duration-150`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                <div className={`absolute inset-0 bg-[#3b82f6]/10 backdrop-blur-[3px] transition-opacity duration-500 ease-out
                  ${isSelected ? 'opacity-100 !duration-150' : 'opacity-0'}
                  min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:duration-150`}></div>

                <div className="absolute inset-0 flex items-center justify-center text-[8px] min-[480px]:text-[10px] text-gray-700 font-bold uppercase tracking-widest text-center px-1">
                  Póster
                </div>

                {/* Botón Play */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform
                  ${isSelected ? 'opacity-100 scale-100 !duration-150' : 'opacity-0 scale-75'}
                  min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:scale-100 min-[801px]:group-hover:duration-150`}>
                  <div className="bg-[#3b82f6] p-2.5 min-[480px]:p-4 rounded-full shadow-lg shadow-[#3b82f6]/40">
                    <Play className="w-4 h-4 min-[480px]:w-6 min-[480px]:h-6 text-white fill-white" />
                  </div>
                </div>

                {/* Badge temporadas */}
                <div className="absolute top-1.5 left-1.5 min-[480px]:top-3 min-[480px]:left-3 bg-[#3b82f6] text-white text-[7px] min-[480px]:text-[9px] font-black px-1.5 py-0.5 min-[480px]:px-2 min-[480px]:py-1 rounded-md uppercase z-20">
                  {serie.temporadas} Temp
                </div>
              </div>

              <h4 className={`mt-2 text-[11px] min-[480px]:text-sm font-bold transition-colors duration-500 truncate
                ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-gray-300'}
                min-[801px]:group-hover:text-[#3b82f6] min-[801px]:group-hover:duration-150`}>
                {serie.title}
              </h4>
              <p className="text-[9px] min-[480px]:text-[10px] text-gray-500 font-medium tracking-wide">
                {serie.año}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeriesSection;