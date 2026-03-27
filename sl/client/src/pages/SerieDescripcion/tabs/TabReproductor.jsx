import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Play, ChevronDown, ChevronUp, Server, ChevronLeft, ChevronRight, LayoutList, User } from 'lucide-react';
import 'swiper/css';

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

const comentarios = [
  { usuario: 'Juan Pérez', fecha: 'Hace 2 horas', texto: '¡Increíble película! La escena del multiverso me dejó sin palabras.' },
  { usuario: 'María García', fecha: 'Hace 5 horas', texto: 'Tom Holland hace un trabajo espectacular como siempre.' },
  { usuario: 'Carlos López', fecha: 'Hace 1 día', texto: 'Una de las mejores películas del MCU, sin duda.' },
  { usuario: 'Ana Martínez', fecha: 'Hace 2 días', texto: 'Los efectos especiales están increíbles, totalmente recomendada.' },
  { usuario: 'Pedro Sánchez', fecha: 'Hace 3 días', texto: 'Me encantó el cameo sorpresa, no lo esperaba para nada.' },
  { usuario: 'Laura Rodríguez', fecha: 'Hace 4 días', texto: 'La mejor película de Spider-Man hasta la fecha.' },
];

const relacionados = Array.from({ length: 10 }).map((_, i) => ({
  title: `Serie Relacionada ${i + 1}`,
  info: '2026 • Drama',
}));

const TabReproductor = ({ episodio, temporada, temporadas, onBack, onEpisodioChange }) => {
  const navigate = useNavigate(); // 👈 agregado
  const [servidorActivo, setServidorActivo] = useState(0);
  const [temporadasAbiertas, setTemporadasAbiertas] = useState([temporada.id]);
  const [verTodoReparto, setVerTodoReparto] = useState(false);
  const [verTodosComentarios, setVerTodosComentarios] = useState(false);
  const [activeGlobalId, setActiveGlobalId] = useState(null);
  const touchTimer = React.useRef(null);

  const servidores = [
    { id: 0, label: 'Servidor 1' },
    { id: 1, label: 'Servidor 2' },
    { id: 2, label: 'Servidor 3' },
  ];

  const repartoMostrar = verTodoReparto ? reparto : reparto.slice(0, 6);
  const comentariosMostrar = verTodosComentarios ? comentarios : comentarios.slice(0, 5);

  const toggleTemporada = (id) => {
    setTemporadasAbiertas(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleTouchStart = (id) => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setActiveGlobalId(id), 80);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
  };

  const todosLosEpisodios = temporadas.flatMap(temp =>
    Array.from({ length: temp.episodios }, (_, i) => ({
      temporada: temp,
      numero: i + 1,
      titulo: `Episodio ${i + 1}: El comienzo del fin`,
    }))
  );

  const indexActual = todosLosEpisodios.findIndex(
    ep => ep.temporada.id === temporada.id && ep.numero === episodio.numero
  );

  const esPrimero = indexActual === 0;
  const esUltimo = indexActual === todosLosEpisodios.length - 1;

  const irAnterior = () => {
    if (esPrimero) return;
    const prev = todosLosEpisodios[indexActual - 1];
    onEpisodioChange(prev.temporada, { numero: prev.numero, titulo: prev.titulo });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const irSiguiente = () => {
    if (esUltimo) return;
    const next = todosLosEpisodios[indexActual + 1];
    onEpisodioChange(next.temporada, { numero: next.numero, titulo: next.titulo });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6" onClick={() => setActiveGlobalId(null)}>

      {/* INFO EPISODIO ACTIVO */}
      <div className="flex flex-col gap-1">
        <h2 className="text-base font-black uppercase tracking-tight text-white">
          {temporada.nombre} — Episodio {episodio.numero}
        </h2>
        <p className="text-xs text-gray-400 font-medium">{episodio.titulo}</p>
      </div>

      {/* REPRODUCTOR PLACEHOLDER */}
      <div className="w-full aspect-video bg-black rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl shadow-black/60">
        <img src="https://image.tmdb.org/t/p/w500/1g0zzvWwsFp7pBuLZpbF5funnRL.jpg" className="absolute inset-0 w-full h-full object-cover opacity-20" alt="backdrop" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="bg-[#3b82f6] p-5 rounded-full shadow-lg shadow-[#3b82f6]/40 cursor-pointer hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white fill-white" />
          </div>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Reproductor</span>
        </div>
      </div>

      {/* SERVIDORES */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-4 bg-[#3b82f6] rounded-full" />
          <span className="text-[10px] font-black uppercase tracking-widest text-white/70 flex items-center gap-2">
            <Server size={12} /> Servidores disponibles
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {servidores.map((srv) => (
            <button
              key={srv.id}
              onClick={() => setServidorActivo(srv.id)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-200 cursor-pointer
                ${servidorActivo === srv.id
                  ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/30'
                  : 'bg-white/[0.03] border-white/10 text-gray-400 hover:border-[#3b82f6]/40 hover:text-white'
                }`}
            >
              {srv.label}
            </button>
          ))}
        </div>
      </div>

      {/* NAVEGACIÓN ANTERIOR / LISTA / SIGUIENTE */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={irAnterior}
          disabled={esPrimero}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all
            ${esPrimero
              ? 'bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-50'
              : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/40 hover:text-white cursor-pointer'
            }`}
        >
          <ChevronLeft size={14} /> Anterior
        </button>
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/40 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
        >
          <LayoutList size={14} /> Todo
        </button>
        <button
          onClick={irSiguiente}
          disabled={esUltimo}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all
            ${esUltimo
              ? 'bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-50'
              : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/40 hover:text-white cursor-pointer'
            }`}
        >
          Siguiente <ChevronRight size={14} />
        </button>
      </div>

      {/* TEMPORADAS Y EPISODIOS */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 bg-[#3b82f6] rounded-full" />
          <h3 className="text-sm font-black uppercase tracking-widest text-white/90">Temporadas y episodios</h3>
        </div>
        <div className="w-full border border-white/5 rounded-2xl overflow-hidden bg-[#0a0908]">
          {temporadas.map((temp) => (
            <div key={temp.id} className="border-b border-white/5 last:border-b-0">
              <button
                onClick={() => toggleTemporada(temp.id)}
                className={`w-full flex items-center group transition-all duration-300 cursor-pointer py-4 px-2 sm:px-4 ${
                  temporadasAbiertas.includes(temp.id) ? 'bg-[#3b82f6]/5' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className={`flex items-center justify-center w-8 sm:w-12 text-sm sm:text-base font-black transition-colors ${
                  temporadasAbiertas.includes(temp.id) ? 'text-[#3b82f6]' : 'text-white/40 group-hover:text-white'
                }`}>
                  {temp.numero}
                </div>
                <div className="flex-1 flex flex-col items-start ml-2 sm:ml-4">
                  <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors ${
                    temporadasAbiertas.includes(temp.id) ? 'text-white' : 'text-gray-400 group-hover:text-white'
                  }`}>{temp.nombre}</span>
                  <span className="text-[8px] sm:text-[10px] text-gray-600 font-medium uppercase mt-0.5">{temp.fecha}</span>
                </div>
                <div className="flex items-center gap-4 pr-2">
                  <span className="hidden sm:block text-[9px] font-black text-gray-500 uppercase tracking-widest">{temp.episodios} Episodios</span>
                  {temporadasAbiertas.includes(temp.id)
                    ? <ChevronUp size={16} className="text-[#3b82f6]" />
                    : <ChevronDown size={16} className="text-gray-600 group-hover:text-white" />
                  }
                </div>
              </button>

              {temporadasAbiertas.includes(temp.id) && (
                <div className="bg-black/40 animate-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 gap-px bg-white/5">
                    {[...Array(temp.episodios)].map((_, i) => {
                      const epNum = i + 1;
                      const isActive = episodio.numero === epNum && temporada.id === temp.id;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            onEpisodioChange(temp, { numero: epNum, titulo: `Episodio ${epNum}: El comienzo del fin` });
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className={`w-full flex items-center gap-4 p-4 group transition-all cursor-pointer text-left
                            ${isActive
                              ? 'bg-[#3b82f6]/15 border-l-2 border-[#3b82f6]'
                              : 'bg-[#0a0908] hover:bg-[#3b82f6]/10'
                            }`}
                        >
                          <div className={`relative w-20 h-11 sm:w-28 sm:h-16 rounded-lg overflow-hidden flex-shrink-0 border transition-all
                            ${isActive ? 'border-[#3b82f6] shadow-[0_0_12px_rgba(59,130,246,0.4)]' : 'border-white/10 group-hover:border-[#3b82f6]/50'}`}>
                            <img src="https://image.tmdb.org/t/p/w300/1g0zzvWwsFp7pBuLZpbF5funnRL.jpg" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" alt={`Episodio ${epNum}`} />
                            {isActive && (
                              <div className="absolute inset-0 flex items-center justify-center bg-[#3b82f6]/30">
                                <Play className="w-4 h-4 fill-white text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-[10px] sm:text-xs font-bold truncate transition-colors
                              ${isActive ? 'text-[#3b82f6]' : 'text-white/90 group-hover:text-[#3b82f6]'}`}>
                              Episodio {epNum}: El comienzo del fin
                            </h4>
                            {isActive && (
                              <span className="text-[8px] text-[#3b82f6]/70 uppercase font-bold tracking-widest">Reproduciendo</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ELENCO PRINCIPAL */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-8 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#3b82f6] rounded-full"></div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white/90">Elenco Principal</h3>
          </div>
          {reparto.length > 6 && (
            <button
              onClick={(e) => { e.stopPropagation(); setVerTodoReparto(!verTodoReparto); }}
              className="flex items-center gap-1 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[8px] sm:text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap flex-shrink-0"
            >
              {verTodoReparto ? 'Ver menos' : 'Ver todo'}
              <ChevronRight size={10} className={`transition-transform ${verTodoReparto ? 'rotate-90' : ''}`} />
            </button>
          )}
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {repartoMostrar.map((actor, i) => (
            <div
              key={i}
              className="group flex flex-col items-center cursor-pointer"
              onClick={(e) => { // 👈 agregado
                e.stopPropagation();
                navigate('/actor/tom-holland');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 overflow-hidden rounded-full border-2 border-white/5 group-hover:border-[#3b82f6] transition-all duration-500 shadow-xl">
                <img src={actor.foto} alt={actor.nombre} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
              </div>
              <p className="text-center font-bold text-[10px] sm:text-[11px] text-white/90 group-hover:text-[#3b82f6] transition-colors truncate w-full">{actor.nombre}</p>
              <p className="text-center text-[8px] sm:text-[9px] text-gray-500 uppercase mt-1 tracking-tighter">{actor.personaje}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COMENTARIOS */}
      <div>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-5 bg-[#3b82f6] rounded-full"></div>
          <h3 className="text-sm font-black uppercase tracking-widest text-white/90">Comentarios</h3>
        </div>
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
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="mt-3 px-5 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
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
        {comentarios.length > 5 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); setVerTodosComentarios(!verTodosComentarios); }}
              className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all"
            >
              {verTodosComentarios ? 'Ver menos' : 'Ver más comentarios'}
              <ChevronRight size={12} className={`transition-transform ${verTodosComentarios ? 'rotate-90' : ''}`} />
            </button>
          </div>
        )}
      </div>

      {/* TÍTULOS RELACIONADOS */}
      <div className="pt-6 pb-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-[#3b82f6] rounded-full"></div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/90">Títulos Relacionados</h3>
          </div>
        </div>
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={12}
            slidesPerView={3}
            grabCursor={true}
            loop={false}
            rewind={true}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{ 1000: { slidesPerView: 5, spaceBetween: 16 } }}
            className="mySwiper !overflow-visible"
          >
            {relacionados.map((item, idx) => {
              const myId = `related-${idx}`;
              const isSelected = activeGlobalId === myId;
              return (
                <SwiperSlide key={idx}>
                  <div
                    className="group cursor-pointer relative outline-none"
                    onClick={(e) => { // 👈 agregado
                      e.stopPropagation();
                      navigate('/serie/descripcion');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(myId); }}
                    onTouchMove={handleTouchEnd}
                    onTouchEnd={handleTouchEnd}
                  >
                    <div className={`aspect-[2/3] w-full bg-white/5 rounded-xl min-[480px]:rounded-2xl border overflow-hidden relative transition-all duration-500 ease-out
                      ${isSelected ? 'border-[#3b82f6] scale-[1.02] shadow-[0_0_25px_rgba(59,130,246,0.4)] !duration-150' : 'border-white/10'}
                      min-[801px]:group-hover:border-[#3b82f6]/50 min-[801px]:group-hover:scale-[1.02] min-[801px]:group-hover:duration-150`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                      <div className={`absolute inset-0 bg-[#3b82f6]/10 backdrop-blur-[3px] transition-opacity duration-500 ease-out
                        ${isSelected ? 'opacity-100 !duration-150' : 'opacity-0'}
                        min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:duration-150`}></div>
                      <img src="https://image.tmdb.org/t/p/w500/1g0zzvWwsFp7pBuLZpbF5funnRL.jpg" className="w-full h-full object-cover" alt={item.title} />
                      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform
                        ${isSelected ? 'opacity-100 scale-100 !duration-150' : 'opacity-0 scale-75'}
                        min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:scale-100 min-[801px]:group-hover:duration-150`}>
                        <div className="bg-[#3b82f6] p-2.5 min-[480px]:p-4 rounded-full shadow-lg shadow-[#3b82f6]/40">
                          <Play className="w-4 h-4 min-[480px]:w-6 min-[480px]:h-6 text-white fill-white" />
                        </div>
                      </div>
                      <div className="absolute top-1.5 left-1.5 min-[480px]:top-3 min-[480px]:left-3 bg-[#3b82f6] text-white text-[7px] min-[480px]:text-[9px] font-black px-1.5 py-0.5 min-[480px]:px-2 min-[480px]:py-1 rounded-md uppercase z-20">
                        1 Temp
                      </div>
                    </div>
                    <h4 className={`mt-2 text-[11px] min-[480px]:text-sm font-bold transition-colors duration-500 truncate
                      ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-gray-300'}
                      min-[801px]:group-hover:text-[#3b82f6] min-[801px]:group-hover:duration-150`}>
                      {item.title}
                    </h4>
                    <p className="text-[9px] min-[480px]:text-[10px] text-gray-500 font-medium tracking-wide">{item.info}</p>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>

    </div>
  );
};

export default TabReproductor;