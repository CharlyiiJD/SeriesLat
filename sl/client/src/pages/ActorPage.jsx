import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, User } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const actorData = {
  nombre: 'Tom Holland',
  conocidoComo: 'Thomas Stanley Holland',
  sexo: 'Masculino',
  fechaNacimiento: '1 de junio de 1996',
  lugarNacimiento: 'Kingston upon Thames, Londres, Reino Unido',
  biografia: 'Thomas Stanley Holland es un actor y bailarín británico. Es conocido principalmente por su papel como Spider-Man / Peter Parker en el Universo Cinematográfico de Marvel (MCU). Holland comenzó su carrera en el teatro musical, actuando en el West End de Londres en Billy Elliot el Musical desde 2008 hasta 2010. Su debut cinematográfico llegó con la película de desastres The Impossible (2012), donde interpretó al hijo mayor de una familia que sobrevive al tsunami del Océano Índico de 2004, junto a Naomi Watts y Ewan McGregor. Por este papel, recibió numerosas nominaciones a premios y ganó el premio Saturn al Mejor Actor Joven. En 2015, fue elegido para interpretar a Peter Parker / Spider-Man en el MCU, debutando en Captain America: Civil War (2016) y protagonizando su propia trilogía con Spider-Man: Homecoming (2017), Spider-Man: Far From Home (2019) y Spider-Man: No Way Home (2021).',
  fotoPerfil: 'https://es.web.img2.acsta.net/pictures/23/05/30/13/16/0004762.jpg',
  fotoPortada: 'https://i0.wp.com/tomatazos.buscafs.com/2025/01/tom-holland-portada2.jpg',
};

// 12 items = 2 filas de 6
const peliculas = Array.from({ length: 36 }).map((_, i) => ({
  id: i + 1,
  titulo: `Spider-Man ${i + 1}`,
  año: 2020 + (i % 6),
  tipo: i % 3 === 0 ? 'Serie' : 'Película',
}));

const ITEMS_POR_PAGINA = 12; // 2 filas x 6 columnas

const ActorPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(peliculas.length / ITEMS_POR_PAGINA);
  const peliculasPagina = peliculas.slice(
    (currentPage - 1) * ITEMS_POR_PAGINA,
    currentPage * ITEMS_POR_PAGINA
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Siempre muestra exactamente 3 números centrados alrededor del actual
  const getPaginationGroup = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages) return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="relative w-full bg-[#080705] min-h-screen font-sans text-white">
      <Header />

      {/* PORTADA detrás del header */}
      <div className="absolute top-0 left-0 w-full h-[450px] min-[801px]:h-[550px] z-0">
        <img
          src={actorData.fotoPortada}
          className="w-full h-full object-cover"
          style={{ opacity: 0.35, filter: 'brightness(0.6)' }}
          alt="portada"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080705] via-[#080705]/40 to-transparent pointer-events-none"></div>
      </div>

      {/* CONTENIDO */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 min-[801px]:px-12 pt-32 min-[801px]:pt-44">

        {/* CARD DEL ACTOR */}
        <div className="flex flex-col min-[801px]:flex-row gap-6 min-[801px]:gap-10 items-start mb-16">

          {/* FOTO PERFIL */}
          <div className="flex-shrink-0 w-32 min-[801px]:w-52 mx-auto min-[801px]:mx-0">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-black/60">
              {actorData.fotoPerfil ? (
                <img
                  src={actorData.fotoPerfil}
                  alt={actorData.nombre}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/5 flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-600" />
                </div>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="flex-1 flex flex-col gap-5">
            <h1 className="text-2xl min-[801px]:text-4xl font-black uppercase tracking-tighter leading-none text-white">
              {actorData.nombre}
            </h1>

            <div className="w-full h-[1px] bg-white/5"></div>

            <div className="grid grid-cols-1 min-[601px]:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3b82f6]">Sexo</span>
                <span className="text-sm font-medium text-gray-200">{actorData.sexo}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3b82f6]">Fecha de nacimiento</span>
                <span className="text-sm font-medium text-gray-200">{actorData.fechaNacimiento}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3b82f6]">Lugar de nacimiento</span>
                <span className="text-sm font-medium text-gray-200">{actorData.lugarNacimiento}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3b82f6]">También conocido como</span>
                <span className="text-sm font-medium text-gray-200">{actorData.conocidoComo}</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/5"></div>

            {/* BIOGRAFÍA */}
            <div>
              <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3b82f6] mb-3">Biografía</h3>
              <div
                className="h-36 overflow-y-auto text-sm text-gray-300 leading-relaxed font-light pr-2"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {actorData.biografia}
              </div>
            </div>
          </div>
        </div>

        {/* TÍTULO FILMOGRAFÍA */}
        <div className="mb-8 flex items-center gap-4">
          <div className="h-8 w-[4px] bg-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex-shrink-0"></div>
          <h2 className="text-sm min-[801px]:text-base font-black uppercase tracking-tighter text-white">
            Aparece en
          </h2>
        </div>

        {/* GRID 6 columnas x 2 filas */}
        <div className="grid grid-cols-3 min-[600px]:grid-cols-4 min-[900px]:grid-cols-5 min-[1100px]:grid-cols-6 gap-3 min-[480px]:gap-5">
          {peliculasPagina.map((item, idx) => (
            <div
              key={idx}
              className="group cursor-pointer relative outline-none"
              onClick={() =>
                item.tipo === 'Serie'
                  ? navigate('/serie/descripcion')
                  : navigate('/pelicula/descripcion')
              }
            >
              <div className="aspect-[2/3] w-full bg-white/5 rounded-xl border border-white/10 overflow-hidden relative
                transition-all duration-500 ease-out
                min-[801px]:group-hover:border-[#3b82f6]/50 min-[801px]:group-hover:scale-[1.02] min-[801px]:group-hover:duration-150"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute inset-0 bg-[#3b82f6]/10 backdrop-blur-[3px] opacity-0 min-[801px]:group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center text-[8px] text-gray-700 font-bold uppercase tracking-widest">
                  Póster
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 min-[801px]:group-hover:opacity-100 transition-all duration-500 transform scale-75 min-[801px]:group-hover:scale-100">
                  <div className="bg-[#3b82f6] p-2.5 min-[480px]:p-4 rounded-full shadow-lg shadow-[#3b82f6]/40">
                    <Play className="w-4 h-4 min-[480px]:w-5 min-[480px]:h-5 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute top-1.5 left-1.5 min-[480px]:top-2 min-[480px]:left-2 bg-[#3b82f6] text-white text-[7px] min-[480px]:text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase z-20">
                  {item.tipo === 'Serie' ? '1 Temp' : '1080p'}
                </div>
              </div>
              <h4 className="mt-2 text-[11px] min-[480px]:text-xs font-bold truncate text-gray-300 min-[801px]:group-hover:text-[#3b82f6] transition-colors duration-300">
                {item.titulo}
              </h4>
              <p className="text-[9px] text-gray-500 font-medium">{item.año}</p>
            </div>
          ))}
        </div>

        {/* PAGINACIÓN — centrada, sin fondo, 3 números + 2 flechas */}
        {totalPages > 1 && (
          <div className="mt-16 mb-8 flex items-center justify-center gap-2">
            {/* FLECHA IZQUIERDA */}
            <button
              onClick={() => handlePageClick(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all
                ${currentPage === 1
                  ? 'border-white/5 text-gray-600 cursor-not-allowed opacity-40'
                  : 'border-white/10 text-gray-400 hover:text-[#3b82f6] hover:border-[#3b82f6]/40 active:scale-90 cursor-pointer'
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* 3 NÚMEROS */}
            {getPaginationGroup().map((page) => (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border cursor-pointer active:scale-90 ${
                  currentPage === page
                    ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20'
                    : 'border-white/10 text-gray-400 hover:text-[#3b82f6] hover:border-[#3b82f6]/40'
                }`}
              >
                {page}
              </button>
            ))}

            {/* FLECHA DERECHA */}
            <button
              onClick={() => handlePageClick(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all
                ${currentPage === totalPages
                  ? 'border-white/5 text-gray-600 cursor-not-allowed opacity-40'
                  : 'border-white/10 text-gray-400 hover:text-[#3b82f6] hover:border-[#3b82f6]/40 active:scale-90 cursor-pointer'
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default ActorPage;