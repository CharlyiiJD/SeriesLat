import React, { useRef } from 'react';
import { Play } from 'lucide-react';

const SeriesSection = ({ activeGlobalId, setActiveGlobalId }) => {
  const touchTimer = useRef(null);

  const seriesList = Array.from({ length: 12 }).map((_, i) => ({
    title: `Serie Destacada ${i + 1}`,
    info: `Temporada ${Math.floor(Math.random() * 5) + 1} • 2026`,
    tag: "HD"
  }));

  // Lógica de Delay para evitar activaciones por error al deslizar (Scroll)
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
      
      {/* HEADER DE LA SECCIÓN */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-10 min-[850px]:h-12 w-[4px] bg-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex-shrink-0"></div>
          
          <h2 className="text-sm min-[1100px]:text-base font-black uppercase leading-tight tracking-tighter text-white">
            Series <br className="hidden min-[850px]:block" /> Destacadas
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold text-gray-500 tracking-wider">42,890</span>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-black px-4 py-2 rounded-sm uppercase transition-all cursor-pointer shadow-lg shadow-blue-500/20 active:scale-95">
            Más Series
          </button>
        </div>
      </div>

      {/* GRID: 4 Columnas (Desktop) y 3 Filas con Lógica Táctil */}
      <div className="grid grid-cols-2 min-[600px]:grid-cols-3 min-[1000px]:grid-cols-4 gap-x-5 gap-y-10">
        {seriesList.map((serie, idx) => {
          const myId = `serie-${idx}`;
          const isSelected = activeGlobalId === myId;

          return (
            <div 
              key={idx} 
              className="group cursor-pointer outline-none"
              onTouchStart={(e) => {
                e.stopPropagation();
                handleTouchStart(myId);
              }}
              onTouchMove={handleTouchEnd}
              onTouchEnd={handleTouchEnd}
            >
              {/* Contenedor 16:9 con Transición de Entrada Rápida y Salida Suave */}
              <div className={`aspect-video w-full bg-[#141414] rounded-sm overflow-hidden relative border
                transition-all duration-500 ease-out
                ${isSelected 
                  ? 'border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.3)] !duration-150' 
                  : 'border-white/5 min-[801px]:group-hover:border-[#3b82f6]/50 min-[801px]:group-hover:duration-150'
                }`}
              >
                
                {/* Badge de Calidad */}
                <div className={`absolute top-2 left-2 z-20 bg-black/70 backdrop-blur-md text-[#3b82f6] text-[8px] font-black px-1.5 py-0.5 rounded-sm border border-[#3b82f6]/20 transition-colors duration-500 ${isSelected ? 'border-[#3b82f6] !duration-150' : ''}`}>
                  {serie.tag}
                </div>

                {/* Overlay sutil que se aclara al seleccionar */}
                <div className={`absolute inset-0 bg-black/40 transition-colors duration-500 z-10 ${isSelected ? 'bg-transparent !duration-150' : ''}`}></div>
                
                {/* Imagen Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#080808] flex items-center justify-center">
                  <span className="text-[9px] text-gray-700 font-black uppercase tracking-[0.25em]">Preview</span>
                </div>

                {/* Botón Play central persistente */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform z-20
                  ${isSelected ? 'opacity-100 scale-100 !duration-150' : 'opacity-0 scale-75'}
                  min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:scale-100 min-[801px]:group-hover:duration-150`}>
                  <div className="bg-[#3b82f6] p-2 rounded-full shadow-lg shadow-[#3b82f6]/40">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>

                {/* Capa de Blur sutil */}
                <div className={`absolute inset-0 bg-[#3b82f6]/5 backdrop-blur-[2px] transition-opacity duration-500
                  ${isSelected ? 'opacity-100 !duration-150' : 'opacity-0'}`}></div>

                {/* Efecto de brillo (Sweep) al pasar el mouse (Desktop) */}
                <div className="absolute inset-0 translate-x-[-100%] min-[801px]:group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent z-15"></div>
              </div>

              {/* Info de la Serie */}
              <div className="mt-4 space-y-1 px-0.5">
                <h4 className={`text-[14px] font-bold leading-tight transition-colors duration-500 truncate
                  ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-gray-200 min-[801px]:group-hover:text-[#3b82f6]'}`}>
                  {serie.title}
                </h4>
                <p className="text-[11px] text-gray-500 font-semibold tracking-tight">
                  {serie.info}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeriesSection;