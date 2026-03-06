import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, Tag, Heart, Plus, Eye, ThumbsUp, Film, Star, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import TabOnline from './tabs/TabOnline';
import TabImagenes from './tabs/TabImagenes';
import TabDescargar from './tabs/TabDescargar';

// DATOS DE PELÍCULAS RELACIONADAS (15 items)
const peliculasRelacionadas = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  titulo: [
    'Spider-Man: Homecoming', 'Spider-Man: Far From Home', 'Doctor Strange',
    'Avengers: Endgame', 'Iron Man', 'Captain America: Civil War',
    'Thor: Ragnarok', 'Black Panther', 'Ant-Man', 'Guardians of the Galaxy',
    'Doctor Strange 2', 'Shang-Chi', 'Eternals', 'The Marvels', 'Wakanda Forever'
  ][i],
  año: [2017, 2019, 2016, 2019, 2008, 2016, 2017, 2018, 2015, 2014, 2022, 2021, 2021, 2023, 2022][i],
  rating: ['7.4', '7.5', '7.5', '8.4', '7.9', '7.8', '7.9', '7.3', '7.3', '8.0', '6.9', '7.4', '6.8', '6.0', '6.7'][i],
  calidad: ['WEB-DL 4K', 'BLURAY 1080p', 'WEB-DL 1080p', 'BLURAY 4K', 'WEB-DL 1080p', 'BLURAY 1080p', 'WEB-DL 4K', 'BLURAY 4K', 'WEB-DL 1080p', 'BLURAY 1080p', 'WEB-DL 4K', 'BLURAY 1080p', 'WEB-DL 1080p', 'BLURAY 1080p', 'WEB-DL 4K'][i],
  duracion: 125,
}));

const PeliculaDescripcion = () => {
  const [voto, setVoto] = useState(0);
  const [tabActivo, setTabActivo] = useState('online');
  const [activeGlobalId, setActiveGlobalId] = useState(null);
  const navigate = useNavigate();

  const backdropUrl = "https://d32qys9a6wm9no.cloudfront.net/images/movies/backdrop/3c/444435cf171225833e0d564c0eb6acdb_1280x720.jpeg";
  const posterUrl = "https://pics.filmaffinity.com/Spider_Man_No_Way_Home-254069220-large.jpg";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tabs = [
    { id: 'online', label: 'Ver Online', component: TabOnline },
    { id: 'descargar', label: 'Descargar', component: TabDescargar },
    { id: 'imagenes', label: 'Imágenes', component: TabImagenes }
  ];

  const TabActual = tabs.find(tab => tab.id === tabActivo)?.component;

  const formatDuration = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const PeliculaCard = ({ peli, globalIdx }) => {
    const isSelected = activeGlobalId === globalIdx;

    return (
      <div
        onClick={() => navigate('/pelicula/spiderman')}
        onTouchStart={(e) => {
          e.stopPropagation();
          setActiveGlobalId(globalIdx);
        }}
        onTouchEnd={() => setActiveGlobalId(null)}
        className={`group flex items-center gap-3 bg-white/[0.02] border p-2 rounded-xl cursor-pointer overflow-hidden outline-none
          transition-all duration-500 ease-out
          ${isSelected
            ? 'bg-white/[0.08] border-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.2)] !duration-150'
            : 'border-white/5 hover:bg-white/[0.06] hover:border-[#3b82f6]/30 hover:duration-150'
          }`}
      >
        {/* MINI POSTER */}
        <div className="h-14 aspect-[2/3] bg-white/10 rounded-lg overflow-hidden flex-shrink-0 relative border border-white/5">
          <div className={`absolute inset-0 bg-[#3b82f6]/10 transition-opacity duration-500 z-10 ${isSelected ? 'opacity-100 !duration-150' : 'opacity-0'}`}></div>
          <div className="absolute inset-0 flex items-center justify-center text-[7px] text-gray-600 font-bold uppercase z-0">Img</div>
        </div>

        {/* INFO */}
        <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
          <h4 className={`text-[13px] font-bold transition-colors duration-500 truncate
            ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-gray-200 group-hover:text-[#3b82f6]'}`}>
            {peli.titulo}
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-500 font-medium">{peli.año}</span>
              <span className="text-[10px] text-gray-500 font-medium">{formatDuration(peli.duracion)}</span>
            </div>
            <div className={`flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded-md transition-all duration-500 ${isSelected ? 'shadow-[0_0_8px_rgba(59,130,246,0.3)] !duration-150' : ''}`}>
              <Star className="w-2.5 h-2.5 text-[#3b82f6] fill-[#3b82f6]" />
              <span className="text-[10px] font-black text-[#3b82f6]">{peli.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full bg-[#080705] min-h-screen font-sans text-white">
      <Header />

      {/* ESTILOS */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* FONDO / BACKDROP */}
      <div className="absolute top-0 left-0 w-full h-[550px] min-[480px]:h-[600px] min-[801px]:h-[800px] z-0">
        <img src={backdropUrl} className="w-full h-full object-cover opacity-30 filter brightness(0.5)" alt="Backdrop" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080705] via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* HERO / DESCRIPCIÓN */}
      <div className="relative z-20 flex justify-center px-6 pt-24">
        <div className="w-full max-w-7xl min-h-[calc(550px-96px)] min-[480px]:min-h-[calc(600px-96px)] min-[801px]:min-h-[calc(800px-96px)] bg-gradient-to-t from-[#080705] via-black/40 to-black/40 rounded-t-2xl flex flex-col p-6 min-[801px]:p-10 gap-8">

          <div className="flex flex-col md:flex-row gap-8">
            {/* COLUMNA 1: PÓSTER */}
            <div className="w-full md:w-auto flex flex-col items-center md:items-start flex-shrink-0">
              <div className="relative group shadow-2xl shadow-black/50 w-[70%] md:w-[200px] min-[1100px]:w-[220px]">
                <img src={posterUrl} alt="Poster" className="w-full rounded-xl border border-white/10 object-cover aspect-[2/3]" />
                <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                  <div className="bg-[#3b82f6] p-3 rounded-full"><Play className="fill-white w-6 h-6" /></div>
                </button>
              </div>
              <button className="w-[70%] md:w-[200px] min-[1100px]:w-[220px] mt-4 bg-[#3b82f6] hover:bg-[#2563eb] border border-white/10 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3b82f6]/20 cursor-pointer">
                <Download size={14} /> Descargar
              </button>
            </div>

            {/* COLUMNA 2: INFO PRINCIPAL */}
            <div className="flex-1 flex flex-col min-[1100px]:pr-8">
              <h1 className="text-2xl min-[801px]:text-3xl font-black uppercase tracking-tighter leading-none">
                Spider-Man: No Way Home
              </h1>
              <div className="mt-3">
                <span className="text-[#3b82f6] font-bold text-[10px] bg-[#3b82f6]/10 px-2 py-0.5 rounded border border-[#3b82f6]/20 uppercase tracking-wider">WEB-DL 4K</span>
              </div>
              <div className="w-full h-[1px] bg-white/5 mt-5 mb-6"></div>

              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center gap-6 text-sm text-gray-300 font-medium">
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-[#3b82f6]" /> 2021</div>
                  <div className="flex items-center gap-2"><Clock size={16} className="text-[#3b82f6]" /> 2h 28m</div>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"><Tag size={16} className="text-[#3b82f6]" /> Acción, Aventura</div>
                </div>
                <div className="w-[1px] h-6 bg-white/10 hidden md:block"></div>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/40">
                    <span className="text-[10px] font-bold text-[#3b82f6]">{voto * 10}%</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex gap-0.5">
                      {[...Array(10)].map((_, i) => (
                        <Star key={i} size={13}
                          className={`cursor-pointer transition-colors ${i < voto ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-400'}`}
                          onClick={() => setVoto(i + 1)}
                        />
                      ))}
                    </div>
                    <span className="text-[9px] text-gray-500 uppercase font-bold mt-1">Tu voto: {voto}</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/5 mb-6"></div>

              <div className="mb-14">
                <h3 className="text-[#3b82f6] text-[10px] uppercase font-black tracking-[0.3em] mb-3">Sinopsis</h3>
                <div className="h-24 min-[801px]:h-28 overflow-y-auto no-scrollbar pr-4"
                  style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}>
                  <p className="text-gray-300 leading-relaxed text-sm min-[801px]:text-base max-w-2xl font-light">
                    Por primera vez en la historia cinematográfica de Spider-Man, nuestro amigable héroe vecino es desenmascarado y ya no puede separar su vida normal de los altos riesgos de ser un superhéroe. Cuando pide ayuda al Doctor Strange, los riesgos se vuelven aún más peligrosos, lo que lo obliga a descubrir lo que realmente significa ser Spider-Man. Peter Parker deberá enfrentarse a su mayor desafío hasta la fecha, uno que no solo alterará su propio futuro, sino el futuro del Multiverso mismo mientras lucha por recuperar su anonimato.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-3 pr-6 border-r border-white/10">
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Idioma:</span>
                    <div className="flex gap-2">
                      <div className="bg-white/5 p-1.5 rounded-md border border-white/10 text-[10px] font-bold text-orange-400 cursor-pointer hover:bg-white/10 transition-colors">ES</div>
                      <div className="bg-white/5 p-1.5 rounded-md border border-white/10 text-[10px] font-bold text-green-500 cursor-pointer hover:bg-white/10 transition-colors">LAT</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-[#f3ce13] text-black px-2 py-1 rounded font-black text-[10px]">IMDb 8.2</div>
                    <div className="bg-[#01b4e4] text-white px-2 py-1 rounded font-black text-[10px]">TMDB 85</div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/10 cursor-pointer hover:border-[#3b82f6]/50 transition-colors">
                    <Film size={12} className="text-[#3b82f6]"/>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Película</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all text-pink-500 cursor-pointer">
                    <Heart size={16} /> Añadir a favoritos
                  </button>
                  <button className="flex-1 max-w-[200px] flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-[#3b82f6] hover:text-white border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer">
                    <Plus size={16} /> Agregar a mi lista
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMNA 3: CRÉDITOS - Solo 1100px+ */}
            <div className="hidden min-[1100px]:flex w-[20%] flex-col gap-6 border-l border-white/5 pl-8">
              <div className="space-y-4 bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-2"><Eye size={14}/> Vistas</span>
                  <span className="text-xs font-bold text-[#3b82f6]">14,205</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-2"><ThumbsUp size={14}/> Likes</span>
                  <span className="text-xs font-bold text-pink-500">2,840</span>
                </div>
                <button className="w-full mt-2 flex items-center justify-center gap-2 bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 border border-[#3b82f6]/30 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-[#3b82f6] cursor-pointer">
                  <Film size={14} /> Trailer
                </button>
              </div>
              <div className="space-y-5">
                <div>
                  <h4 className="text-[#3b82f6] text-[10px] uppercase font-black tracking-widest mb-2">Géneros</h4>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-300">
                    <span className="hover:text-white cursor-pointer transition-colors">Ciencia Ficción</span> • <span className="hover:text-white cursor-pointer transition-colors">Fantasía</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-[#3b82f6] text-[10px] uppercase font-black tracking-widest mb-2">Director</h4>
                  <p className="text-xs font-bold text-gray-300 hover:text-white cursor-pointer transition-colors">Jon Watts</p>
                </div>
                <div>
                  <h4 className="text-[#3b82f6] text-[10px] uppercase font-black tracking-widest mb-2">Reparto</h4>
                  <ul className="text-xs text-gray-300 space-y-2 font-light">
                    <li className="hover:text-white transition cursor-pointer">Tom Holland</li>
                    <li className="hover:text-white transition cursor-pointer">Zendaya</li>
                    <li className="hover:text-white transition cursor-pointer">Benedict Cumberbatch</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN INFERIOR - menores a 1100px */}
          <div className="min-[1100px]:hidden grid grid-cols-1 min-[801px]:grid-cols-3 gap-6 pt-6 border-t border-white/5">
            <div className="space-y-4 bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-2"><Eye size={14}/> Vistas</span>
                <span className="text-xs font-bold text-[#3b82f6]">14,205</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500 uppercase font-bold flex items-center gap-2"><ThumbsUp size={14}/> Likes</span>
                <span className="text-xs font-bold text-pink-500">2,840</span>
              </div>
              <button className="w-full mt-2 flex items-center justify-center gap-2 bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 border border-[#3b82f6]/30 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-[#3b82f6] cursor-pointer">
                <Film size={14} /> Trailer
              </button>
            </div>
            <div className="space-y-5 bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
              <div>
                <h4 className="text-[#3b82f6] text-[10px] uppercase font-black tracking-widest mb-2">Géneros</h4>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-gray-300">
                  <span className="hover:text-white cursor-pointer transition-colors">Ciencia Ficción</span> • <span className="hover:text-white cursor-pointer transition-colors">Fantasía</span>
                </div>
              </div>
              <div>
                <h4 className="text-[#3b82f6] text-[10px] uppercase font-black tracking-widest mb-2">Director</h4>
                <p className="text-xs font-bold text-gray-300 hover:text-white cursor-pointer transition-colors">Jon Watts</p>
              </div>
            </div>
            <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl">
              <h4 className="text-[#3b82f6] text-[10px] uppercase font-black tracking-widest mb-2">Reparto</h4>
              <ul className="text-xs text-gray-300 space-y-2 font-light">
                <li className="hover:text-white transition cursor-pointer">Tom Holland</li>
                <li className="hover:text-white transition cursor-pointer">Zendaya</li>
                <li className="hover:text-white transition cursor-pointer">Benedict Cumberbatch</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* SECCIÓN DE TABS + SIDEBAR                                    */}
      {/* ============================================================ */}
      <div className="relative z-10 flex justify-center px-6">
        <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-start">

          {/* COLUMNA IZQUIERDA: TABS (80%) */}
          <div className="w-full lg:w-[80%] bg-[#0a0908] rounded-b-2xl lg:rounded-2xl">

            {/* NAVEGACIÓN DE TABS */}
            <div className="flex justify-center sm:justify-start border-b border-white/5">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTabActivo(tab.id)}
                  className={`px-4 sm:px-6 py-4 text-[9px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                    tabActivo === tab.id
                      ? 'text-[#3b82f6] border-b-2 border-[#3b82f6] bg-[#3b82f6]/5'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* CONTENIDO DEL TAB ACTIVO */}
            <div className="p-6 min-[801px]:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tabActivo}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {TabActual && <TabActual />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* COLUMNA DERECHA: PELÍCULAS RECIENTES (20%) - Solo en tab "online" */}
          <AnimatePresence>
            {tabActivo === 'online' && (
              <motion.div
                key="sidebar-recientes"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.25 }}
                className="w-full lg:w-[20%]"
              >
                <div className="bg-[#0a0908] rounded-b-2xl lg:rounded-2xl overflow-hidden">

                  {/* ENCABEZADO: letras separadas + línea azul a la izquierda */}
                  <div className="flex items-center gap-4 px-5 py-5 border-b border-white/5">
                    <div className="h-5 w-[3px] bg-[#3b82f6] shadow-[0_0_10px_rgba(59,130,246,0.3)] rounded-full flex-shrink-0"></div>
                    <h3 className="text-base font-black uppercase tracking-widest text-white">
                      Películas Recientes
                    </h3>
                  </div>

                  {/* LISTA DE PELÍCULAS */}
                  <div className="p-4 flex flex-col gap-3">
                    {peliculasRelacionadas.map((peli) => (
                      <PeliculaCard
                        key={peli.id}
                        peli={peli}
                        globalIdx={`rec-${peli.id}`}
                      />
                    ))}

                    {/* VER MÁS */}
                    <button className="w-full mt-2 py-2.5 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-[#3b82f6] border border-white/5 hover:border-[#3b82f6]/30 rounded-xl transition-all bg-white/[0.02] hover:bg-[#3b82f6]/5 cursor-pointer">
                      Ver más películas →
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PeliculaDescripcion;