import React, { useState, useRef } from 'react';
import { Play, Eye, AlertTriangle, Star, Menu, MessageSquare, User, ChevronRight } from 'lucide-react';

const TabOnline = () => {
  const [videoSource, setVideoSource] = useState('Mega');
  const [mostrarOpciones, setMostrarOpciones] = useState(false);
  const [verTodoReparto, setVerTodoReparto] = useState(false);
  const [verTodosComentarios, setVerTodosComentarios] = useState(false);
  const [activeGlobalId, setActiveGlobalId] = useState(null);
  const touchTimer = useRef(null);

  // Datos de ejemplo para el reparto
  const reparto = [
    { nombre: 'Tom Holland', personaje: 'Peter Parker', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/uXJV9YjnSXYupz9s8uD8Y998u3q.jpg' },
    { nombre: 'Zendaya', personaje: 'MJ', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/jY9unN7mK4W7mYvS59Yw3B7IqYv.jpg' },
    { nombre: 'B. Cumberbatch', personaje: 'Doctor Strange', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/fBE3vBKCc9fsZmJp0mOVpY9iD99.jpg' },
    { nombre: 'Jacob Batalon', personaje: 'Ned Leeds', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/v596p9WCo7p889I598fU8WvXv8n.jpg' },
    { nombre: 'Marisa Tomei', personaje: 'May Parker', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4kRPx7px4pKfcecp4cu0KNaMFQ1.jpg' },
    { nombre: 'Jon Favreau', personaje: 'Happy Hogan', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/9h0R5CY6G8UANbqbLczBlHxs2bE.jpg' },
    { nombre: 'Alfred Molina', personaje: 'Doc Ock', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/nSye5LFUy1U19rKBgRNT4KbUeUs.jpg' },
    { nombre: 'Willem Dafoe', personaje: 'Green Goblin', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/ui8e4sgZAwMPi3hzEO53jyBJF9B.jpg' },
    { nombre: 'Jamie Foxx', personaje: 'Electro', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/hPwCMEq6jLAidsXAX5BfoYgIfg2.jpg' },
    { nombre: 'Rhys Ifans', personaje: 'Lizard', foto: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/6HPdPLKkhZKbv5zS84IV0rWv8bJ.jpg' },
  ];

  // Datos de ejemplo para comentarios
  const comentarios = [
    { usuario: 'Juan Pérez', fecha: 'Hace 2 horas', texto: '¡Increíble película! La escena del multiverso me dejó sin palabras.' },
    { usuario: 'María García', fecha: 'Hace 5 horas', texto: 'Tom Holland hace un trabajo espectacular como siempre.' },
    { usuario: 'Carlos López', fecha: 'Hace 1 día', texto: 'Una de las mejores películas del MCU, sin duda.' },
    { usuario: 'Ana Martínez', fecha: 'Hace 2 días', texto: 'Los efectos especiales están increíbles, totalmente recomendada.' },
    { usuario: 'Pedro Sánchez', fecha: 'Hace 3 días', texto: 'Me encantó el cameo sorpresa, no lo esperaba para nada.' },
    { usuario: 'Laura Rodríguez', fecha: 'Hace 4 días', texto: 'La mejor película de Spider-Man hasta la fecha.' },
  ];

  const repartoMostrar = verTodoReparto ? reparto.slice(0, 10) : reparto.slice(0, 6);
  const comentariosMostrar = verTodosComentarios ? comentarios : comentarios.slice(0, 5);

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
    <div 
      className="animate-in fade-in duration-500 space-y-10"
      onClick={() => setActiveGlobalId(null)}
    >
      
      {/* --- SECCIÓN REPRODUCTOR --- */}
      <div className="space-y-4">
        {/* Fuentes de Video - Vista Desktop */}
        <div className="hidden sm:flex flex-wrap gap-3">
          {['Mega', 'Streamwish', 'DoodStream'].map((source) => (
            <button 
              key={source}
              onClick={() => setVideoSource(source)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer ${
                videoSource === source 
                ? 'border-[#3b82f6] bg-[#3b82f6]/10 text-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.2)]' 
                : 'border-white/5 bg-white/5 text-gray-500 hover:text-white hover:bg-white/10'
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        {/* Fuentes de Video - Vista Móvil */}
        <div className="sm:hidden relative">
          <button 
            onClick={() => setMostrarOpciones(!mostrarOpciones)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <Menu size={12} />
            Opciones
          </button>
          
          {mostrarOpciones && (
            <div className="absolute top-full left-0 mt-2 bg-[#0a0908] border border-white/10 rounded-xl overflow-hidden z-10 shadow-2xl min-w-[180px]">
              {['Mega', 'Streamwish', 'DoodStream'].map((source) => (
                <button 
                  key={source}
                  onClick={() => {
                    setVideoSource(source);
                    setMostrarOpciones(false);
                  }}
                  className={`w-full px-5 py-3 text-[10px] font-black uppercase tracking-widest border-b border-white/5 last:border-b-0 transition-all cursor-pointer ${
                    videoSource === source 
                    ? 'bg-[#3b82f6]/10 text-[#3b82f6]' 
                    : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {source}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* El "Player" de Video */}
        <div className="relative w-full aspect-video rounded-3xl bg-black border border-white/10 overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/40 group-hover:bg-gray-900/20 transition-all">
            <div className="bg-[#3b82f6] p-6 rounded-full shadow-2xl shadow-[#3b82f6]/40 cursor-pointer transform group-hover:scale-110 transition-transform">
              <Play size={40} fill="white" className="text-white ml-1" />
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Click para reproducir {videoSource}</p>
          </div>
        </div>

        {/* Footer del Video */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white/[0.02] p-3 sm:p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
             <span className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase">Fuente: <span className="text-[#3b82f6] ml-1">{videoSource}</span></span>
             <button className="flex items-center gap-1.5 text-red-500/80 hover:text-red-500 text-[8px] sm:text-[10px] font-bold uppercase transition-colors cursor-pointer">
                <AlertTriangle size={11} className="sm:w-[14px] sm:h-[14px]"/> Reportar fallo
             </button>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 font-bold text-[8px] sm:text-xs bg-white/5 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-white/5">
            <Eye size={12} className="sm:w-4 sm:h-4 text-[#3b82f6]"/>
            <span className="whitespace-nowrap">45,293</span>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN REPARTO --- */}
      <div>
        <div className="flex items-center justify-between mb-8 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#3b82f6] rounded-full"></div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white/90">Elenco Principal</h3>
          </div>
          {reparto.length > 6 && (
            <button 
              onClick={() => setVerTodoReparto(!verTodoReparto)}
              className="flex items-center gap-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0"
            >
              {verTodoReparto ? 'Ver menos' : 'Ver todo'}
              <ChevronRight size={10} className={`sm:w-3 sm:h-3 transition-transform ${verTodoReparto ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {repartoMostrar.map((actor, i) => (
            <div key={i} className="group flex flex-col items-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 overflow-hidden rounded-full border-2 border-white/5 group-hover:border-[#3b82f6] transition-all duration-500 shadow-xl">
                <img 
                  src={actor.foto} 
                  alt={actor.nombre} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
                />
              </div>
              <p className="text-center font-bold text-[10px] sm:text-[11px] text-white/90 group-hover:text-[#3b82f6] transition-colors truncate w-full">{actor.nombre}</p>
              <p className="text-center text-[8px] sm:text-[9px] text-gray-500 uppercase mt-1 tracking-tighter">{actor.personaje}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- SECCIÓN COMENTARIOS --- */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-5 bg-[#3b82f6] rounded-full"></div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white/90">Comentarios</h3>
        </div>

        {/* Formulario para nuevo comentario */}
        <div className="mb-6 bg-white/[0.02] border border-white/5 rounded-2xl p-5">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3b82f6]/10 flex items-center justify-center border border-[#3b82f6]/20 flex-shrink-0">
              <User size={18} className="text-[#3b82f6]" />
            </div>
            <div className="flex-1">
              <textarea 
                placeholder="Escribe tu comentario..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#3b82f6]/50 transition-colors resize-none"
                rows="3"
              />
              <button className="mt-3 px-5 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all">
                Publicar
              </button>
            </div>
          </div>
        </div>

        {/* Lista de comentarios */}
        <div className="space-y-4">
          {comentariosMostrar.map((comentario, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.04] transition-all">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 flex-shrink-0">
                  <User size={18} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-bold text-white/90">{comentario.usuario}</span>
                    <span className="text-[10px] text-gray-500 uppercase">{comentario.fecha}</span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{comentario.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón Ver Más Comentarios */}
        {comentarios.length > 5 && (
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => setVerTodosComentarios(!verTodosComentarios)}
              className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              {verTodosComentarios ? 'Ver menos' : 'Ver más comentarios'}
              <ChevronRight size={12} className={`transition-transform ${verTodosComentarios ? 'rotate-90' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* --- SECCIÓN RELACIONADOS --- */}
      <div className="pt-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#3b82f6] rounded-full"></div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">Títulos Relacionados</h3>
          </div>
        </div>

        <div className="grid grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-6 gap-3 min-[480px]:gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => {
            const myId = `related-${item}`;
            const isSelected = activeGlobalId === myId;
            
            return (
              <div 
                key={item}
                onTouchStart={(e) => {
                  e.stopPropagation();
                  handleTouchStart(myId);
                }}
                onTouchMove={handleTouchEnd}
                onTouchEnd={handleTouchEnd}
                className="group cursor-pointer relative outline-none"
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

                  <img 
                    src="https://image.tmdb.org/t/p/w500/1g0zzvWwsFp7pBuLZpbF5funnRL.jpg" 
                    className="w-full h-full object-cover" 
                    alt="Relacionada"
                  />

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
                  Spider-Man {item}
                </h4>
                <p className="text-[9px] min-[480px]:text-[10px] text-gray-500 font-medium tracking-wide">2026 • Acción</p>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default TabOnline;