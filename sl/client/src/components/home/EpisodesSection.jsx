import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Play } from 'lucide-react';

// Estilos base
import 'swiper/css';

const EpisodesSection = ({ activeGlobalId, setActiveGlobalId }) => {
  const touchTimer = useRef(null);

  const episodes = Array.from({ length: 10 }).map((_, i) => ({
    title: `Episodio Especial ${i + 1}`,
    info: `T7 E${i + 1} / Feb. 03, 2026`,
    series: "Outlander"
  }));

  // Lógica de Delay para móvil
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
    <div className="mt-14 w-full max-w-[1032px]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="h-10 min-[850px]:h-12 w-[4px] bg-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex-shrink-0"></div>
          <h2 className="text-sm min-[1100px]:text-base font-black uppercase leading-tight tracking-tighter text-white">
            Nuevos <br className="hidden min-[850px]:block" /> Episodios
          </h2>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold text-gray-500 tracking-wider">105,223</span>
          <button className="bg-[#3b82f6] hover:bg-[#2563eb] active:scale-95 text-white text-[10px] font-black px-3 py-1.5 rounded-sm uppercase transition-all cursor-pointer shadow-lg shadow-blue-500/20">
            Ver Todo
          </button>
        </div>
      </div>

      {/* CARRUSEL SWIPER */}
      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={2}
          grabCursor={true}
          loop={false}
          rewind={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1000: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper !overflow-visible"
        >
          {episodes.map((ep, idx) => {
            const myId = `ep-${idx}`;
            const isSelected = activeGlobalId === myId;

            return (
              <SwiperSlide key={idx}>
                <div 
                  className="group cursor-pointer outline-none"
                  onTouchStart={(e) => {
                    e.stopPropagation();
                    handleTouchStart(myId);
                  }}
                  onTouchMove={handleTouchEnd}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* Contenedor con overflow-hidden para que el brillo respete el rounded-sm */}
                  <div className={`aspect-video w-full bg-white/5 rounded-sm overflow-hidden relative border
                    transition-all duration-500 ease-out
                    ${isSelected 
                      ? 'border-[#3b82f6] shadow-[0_0_20px_rgba(59,130,246,0.3)] !duration-150' 
                      : 'border-white/5 min-[801px]:group-hover:border-[#3b82f6]/40 min-[801px]:group-hover:duration-150'
                    }`}
                  >
                    {/* Fondo y Overlay */}
                    <div className={`absolute inset-0 bg-black/30 transition-colors duration-500 ${isSelected ? 'bg-transparent !duration-150' : ''}`}></div>
                    
                    <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex items-center justify-center">
                      <span className="text-[8px] text-gray-700 font-black uppercase tracking-[0.3em]">EP {idx + 1}</span>
                    </div>

                    {/* Botón Play */}
                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform z-20
                      ${isSelected ? 'opacity-100 scale-100 !duration-150' : 'opacity-0 scale-75'}
                      min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:scale-100 min-[801px]:group-hover:duration-150`}>
                      <div className="bg-[#3b82f6] p-2 rounded-full shadow-lg">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    </div>

                    {/* Efecto Blur */}
                    <div className={`absolute inset-0 bg-[#3b82f6]/5 backdrop-blur-[2px] transition-opacity duration-500
                      ${isSelected ? 'opacity-100 !duration-150' : 'opacity-0'}`}></div>
                  </div>

                  <div className="mt-3 space-y-0.5 px-0.5">
                    <h4 className={`text-[13px] font-bold leading-snug transition-colors duration-500 truncate
                      ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-white min-[801px]:group-hover:text-[#3b82f6]'}`}>
                      {ep.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-semibold tracking-tight">
                      {ep.info}
                    </p>
                    <p className={`text-[9px] font-bold uppercase tracking-tight transition-opacity duration-500
                      ${isSelected ? 'text-[#3b82f6] brightness-125 !duration-150' : 'text-[#3b82f6]'}`}>
                      {ep.series}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default EpisodesSection;