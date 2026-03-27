import React, { useState, useEffect, useCallback } from 'react';
import { Play, Star, Calendar, Clock, Globe, Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SeasonCarousel from './SeasonCarousel';
import LoginModal from '../ui/LoginModal';
import RegisterModal from '../ui/RegisterModal';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const moviesData = [
    {
      title: "Inception",
      format: "1080p", // 👈
      year: "2010",
      rating: "8.8",
      duration: "148 min",
      langs: "EN / ES",
      description: "Un ladrón especializado en robar secretos del subconsciente recibe un encargo imposible: implantar una idea en la mente de una persona. Para lograrlo, deberá navegar por múltiples niveles de sueños donde el tiempo y la realidad se distorsionan."
    },
    {
      title: "The Dark Knight",
      format: "1080p",
      year: "2008",
      rating: "9.0",
      duration: "152 min",
      langs: "EN / ES",
      description: "Batman se enfrenta a su enemigo más caótico: el Joker. Mientras Gotham cae en el desorden, el héroe debe decidir hasta dónde está dispuesto a llegar para detener el crimen sin convertirse en aquello que combate."
    },
    {
      title: "Interstellar",
      format: "1080p",
      year: "2014",
      rating: "8.6",
      duration: "169 min",
      langs: "EN / ES",
      description: "En un futuro donde la Tierra se vuelve inhabitable, un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad."
    },
    {
      title: "Parasite",
      format: "1080p",
      year: "2019",
      rating: "8.5",
      duration: "132 min",
      langs: "KO / ES",
      description: "Una familia pobre logra infiltrarse poco a poco en la vida de una familia adinerada, desencadenando una serie de eventos inesperados."
    },
    {
      title: "Gladiator",
      format: "1080p",
      year: "2000",
      rating: "8.5",
      duration: "155 min",
      langs: "EN / ES",
      description: "Un general romano traicionado es forzado a convertirse en esclavo y luego en gladiador. Su objetivo es claro: vengar la muerte de su familia."
    },
    {
      title: "Whiplash",
      format: "1080p",
      year: "2014",
      rating: "8.4",
      duration: "107 min",
      langs: "EN / ES",
      description: "Un joven baterista de jazz ingresa a un conservatorio de élite, donde es sometido a la presión extrema de un profesor obsesivo."
    },
    {
      title: "Mad Max: Fury Road",
      format: "1080p",
      year: "2015",
      rating: "8.1",
      duration: "120 min",
      langs: "EN / ES",
      description: "En un mundo postapocalíptico dominado por la escasez, Max se une a Furiosa para escapar de un tirano que controla el agua."
    },
    {
      title: "Joker",
      format: "1080p",
      year: "2019",
      rating: "8.2",
      duration: "122 min",
      langs: "EN / ES",
      description: "Arthur Fleck, un hombre marginado por la sociedad, desciende lentamente hacia la locura mientras Gotham ignora su sufrimiento."
    },
    {
      title: "The Matrix",
      format: "1080p",
      year: "1999",
      rating: "8.7",
      duration: "136 min",
      langs: "EN / ES",
      description: "Un programador descubre que la realidad es una simulación controlada por máquinas. Al unirse a rebeldes, deberá decidir si acepta la verdad."
    }
  ];

  const backgroundImages = [
    '/assets/portadas/POR01.jpg', '/assets/portadas/POR02.jpg', '/assets/portadas/POR03.jpg',
    '/assets/portadas/POR04.jpg', '/assets/portadas/POR05.jpg', '/assets/portadas/POR06.jpg',
    '/assets/portadas/POR07.jpg', '/assets/portadas/POR08.jpg', '/assets/portadas/POR09.jpg'
  ];

  const movie = moviesData[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % moviesData.length);
  }, [moviesData.length]);

  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + moviesData.length) % moviesData.length);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isDragging]);

  const handleMouseDown = (e) => {
    if (e.target.closest('button')) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -100) nextSlide();
    else if (dragOffset > 100) prevSlide();
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    if (e.target.closest('button')) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    setDragOffset(e.touches[0].clientX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -100) nextSlide();
    else if (dragOffset > 100) prevSlide();
    setIsDragging(false);
    setDragOffset(0);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <>
      <div
        className={`relative w-full bg-[#080705] overflow-hidden font-sans select-none 
          h-[550px] min-[480px]:h-[600px] min-[801px]:h-[750px] 
          ${isDragging ? 'cursor-grabbing' : 'cursor-default'}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
            .hero-bg-image { transition: all 0.9s cubic-bezier(0.23, 1, 0.32, 1); }
            .hero-bg-image-active { opacity: 0.4; transform: scale(1); filter: brightness(0.6); }
            .hero-bg-image-inactive { opacity: 0; transform: scale(1.1); }
          
          @keyframes fadeInUpBlur {
            from { opacity: 0; transform: translateY(20px); filter: blur(10px); }
            to { opacity: 1; transform: translateY(0); filter: blur(0); }
          }
          .animate-content {
            animation: fadeInUpBlur 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          }

          .custom-pagination-dot {
            background: #4B5563 !important;
            width: 6px !important; height: 6px !important;
            margin: 0 4px !important; border-radius: 99px !important;
            transition: all 0.4s ease !important; cursor: pointer !important;
          }
          .custom-pagination-dot-active {
            background: #3b82f6 !important; width: 20px !important;
            box-shadow: 0 0 12px rgba(183, 255, 107, 0.5) !important;
          }
        `}</style>

        {/* Background Images */}
        <div className="absolute inset-0 pointer-events-none">
          {backgroundImages.map((image, idx) => (
            <img
              key={idx}
              src={image}
              className={`hero-bg-image absolute inset-0 w-full h-full object-cover ${
                idx === currentSlide ? 'hero-bg-image-active' : 'hero-bg-image-inactive'
              }`}
              alt=""
            />
          ))}
        </div>

        {/* Degradado */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080705] via-transparent to-transparent pointer-events-none"></div>

        {/* Main Content */}
        <div className="absolute inset-0 z-20 pt-28 min-[480px]:pt-32 min-[801px]:pt-0 min-[801px]:flex min-[801px]:items-center">
          <div className="max-w-[1400px] mx-auto px-6 min-[801px]:px-12 w-full flex flex-col min-[801px]:flex-row justify-between items-start min-[801px]:items-center gap-8 min-[801px]:gap-12">

            <div
              key={currentSlide}
              className="flex-1 w-full max-w-3xl animate-content"
              style={{ transform: `translateX(${dragOffset * 0.2}px)` }}
            >
              {/* Formato / Calidad */}
              <span className="text-[#3b82f6] font-bold tracking-[0.3em] text-[10px] min-[801px]:text-xs uppercase mb-3 block">
                {movie.format}
              </span>

              {/* Título Principal */}
              <h1 className="text-2xl min-[480px]:text-3xl min-[801px]:text-5xl font-black mb-5 text-white drop-shadow-2xl tracking-tighter uppercase leading-tight">
                {movie.title}
              </h1>

              {/* Info Line */}
              <div className="flex flex-wrap items-center gap-y-3 gap-x-5 min-[801px]:gap-x-8 mb-6 text-gray-200 border-l-4 border-[#3b82f6] pl-5">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 min-[801px]:w-6 min-[801px]:h-6 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-lg min-[801px]:text-2xl">{movie.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm min-[801px]:text-lg font-semibold">{movie.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-sm min-[801px]:text-lg font-semibold">{movie.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="text-[9px] min-[801px]:text-[11px] font-black bg-white/15 px-2 py-0.5 rounded uppercase tracking-wider">{movie.langs}</span>
                </div>
              </div>

              {/* Descripción */}
              <div
                className="h-20 min-[801px]:h-32 overflow-y-auto no-scrollbar text-base min-[801px]:text-lg text-gray-300/80 leading-relaxed mb-8 max-w-xl font-medium pr-6"
                style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)' }}
              >
                {movie.description}
              </div>

              {/* Botones */}
              <div className="flex flex-col min-[480px]:flex-row items-center gap-3 min-[801px]:gap-5 w-full min-[480px]:w-auto">

                {/* 👈 Ver Ahora → pelicula descripcion */}
                <button
                  onClick={() => { navigate('/pelicula/descripcion'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="w-full min-[480px]:w-auto flex justify-center items-center gap-2 bg-[#3b82f6] hover:bg-[#1d4ed8] text-white px-8 py-3 min-[801px]:px-7 min-[801px]:py-3.5 rounded-full font-black text-[10px] min-[801px]:text-xs transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(59,130,246,0.2)] uppercase cursor-pointer"
                >
                  <Play className="fill-white w-3.5 h-3.5" /> Ver Ahora
                </button>

                {/* 👈 Ver Más Tarde → abre login si no está logueado */}
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full min-[480px]:w-auto flex justify-center items-center gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-3 min-[801px]:px-6 min-[801px]:py-3.5 rounded-full font-black text-[10px] min-[801px]:text-xs transition-all border border-white/10 uppercase group cursor-pointer"
                >
                  <Bookmark className="w-3.5 h-3.5" /> Ver Más Tarde
                </button>
              </div>
            </div>

            {/* Carrusel Desktop */}
            <div
              className="relative z-50 flex-shrink-0 hidden min-[801px]:block"
              onMouseDown={(e) => e.stopPropagation()}
            >
              <SeasonCarousel
                onSlideChange={setCurrentSlide}
                activeSlide={currentSlide}
              />
            </div>
          </div>
        </div>

        {/* Paginación */}
        <div className="absolute bottom-6 min-[801px]:bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-1">
          {moviesData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`custom-pagination-dot ${idx === currentSlide ? 'custom-pagination-dot-active' : ''}`}
              aria-label="dot"
            />
          ))}
        </div>
      </div>

      {/* MODALES */}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          onRegisterClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
        />
      )}
      {isRegisterOpen && (
        <RegisterModal
          onClose={() => setIsRegisterOpen(false)}
          onLoginClick={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
        />
      )}
    </>
  );
};

export default HeroSection;