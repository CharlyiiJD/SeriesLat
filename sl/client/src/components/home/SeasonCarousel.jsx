import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Importamos el hook de navegación

const SeasonCarousel = ({ onSlideChange, activeSlide }) => {
  const navigate = useNavigate(); // 2. Inicializamos el hook

  const movies = [
    { rating: '9.4/10', year: '2010', format: 'BDRemux 1080p', image: '/assets/peliculas/PEL01.jpg' },
    { rating: '9.6/10', year: '2008', format: 'BDRip 1080p', image: '/assets/peliculas/PEL02.jpg' },
    { rating: '9.2/10', year: '2014', format: '4K HDR10', image: '/assets/peliculas/PEL03.jpg' },
    { rating: '9.5/10', year: '2019', format: 'WEB-DL 1080p', image: '/assets/peliculas/PEL04.jpg' },
    { rating: '9.7/10', year: '2000', format: 'BDRemux 4K', image: '/assets/peliculas/PEL05.jpg' },
    { rating: '9.3/10', year: '2014', format: 'BRRip 1080p', image: '/assets/peliculas/PEL06.jpg' },
    { rating: '9.6/10', year: '2015', format: '4K ULTRA HD', image: '/assets/peliculas/PEL07.jpg' },
    { rating: '9.8/10', year: '2019', format: 'BDRip 1080p', image: '/assets/peliculas/PEL08.jpg' },
    { rating: '9.5/10', year: '1999', format: 'WEB-DL 4K', image: '/assets/peliculas/PEL09.jpg' }
  ];

  const [currentIndex, setCurrentIndex] = useState(activeSlide || 0);

  useEffect(() => {
    if (activeSlide !== undefined && activeSlide !== currentIndex) {
      setCurrentIndex(activeSlide);
    }
  }, [activeSlide]);

  const nextSlide = () => {
    const next = (currentIndex + 1) % movies.length;
    setCurrentIndex(next);
    if (onSlideChange) onSlideChange(next);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="hidden min-[801px]:block relative w-[280px] h-[420px] select-none">
      <style>{`
        .card-container:hover .card-image {
          transform: scale(1.08);
          filter: blur(2px);
        }
        .play-icon {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.5);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .card-container:hover .play-icon {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1);
        }
        .hover-info {
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }
        .card-container:hover .hover-info {
          opacity: 1;
          transform: translateY(0);
        }
        .rating-badge {
          transition: all 0.3s ease;
        }
        .card-container:hover .rating-badge {
          opacity: 0;
          pointer-events: none;
        }
      `}</style>

      <div className="w-full h-full overflow-hidden rounded-2xl border-2 border-black/60 bg-black shadow-2xl relative">
        <div 
          className="flex h-full w-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {movies.map((movie, idx) => (
            <div 
              key={idx} 
              className="min-w-full h-full relative card-container group cursor-pointer"
              // 3. Añadimos el onClick para navegar
              onClick={() => navigate('/pelicula/descripcion')} 
            >
              <img 
                src={movie.image} 
                className="card-image absolute inset-0 w-full h-full object-fill transition-all duration-700 ease-in-out" 
                alt="Movie"
              />

              <div className="play-icon absolute top-1/2 left-1/2 z-30 pointer-events-none">
                <div className="w-20 h-20 bg-[#3b82f6] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                  <Play className="fill-white text-white w-10 h-10 ml-1.5" />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10 pointer-events-none" />

              <div className="relative z-20 h-full p-5 flex flex-col justify-between font-sans pointer-events-none">
                <div className="bg-[#c1121f] self-start px-3 py-1 rounded text-[10px] text-white font-black uppercase tracking-tight shadow-lg">
                  Película
                </div>

                <div className="relative h-8">
                  <div className="rating-badge absolute bottom-0 left-0">
                    <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-[11px] font-black italic shadow-sm">
                      {movie.rating}
                    </span>
                  </div>

                  <div className="hover-info flex items-center justify-between w-full absolute bottom-0">
                    <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-black px-2 py-1.5 rounded border border-white/10 uppercase tracking-tighter">
                      {movie.format}
                    </span>
                    <span className="text-[#3b82f6] font-black text-sm drop-shadow-md">
                      {movie.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeasonCarousel;