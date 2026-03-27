import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film, Tv, Eye, EyeOff, Upload, X, Check, Server, Globe, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Estudio = () => {
  const navigate = useNavigate();
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;


  // AUTH
  const [autenticado, setAutenticado] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorAuth, setErrorAuth] = useState('');

  // PANEL
  const [tipo, setTipo] = useState('pelicula'); // 'pelicula' | 'serie'
  const [tmdbId, setTmdbId] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [preview, setPreview] = useState(null);
  const [errorBusqueda, setErrorBusqueda] = useState('');
  const [publicando, setPublicando] = useState(false);
  const [publicado, setPublicado] = useState(false);

  // DATOS MANUALES
  const [servidores, setServidores] = useState(['', '', '']);
  const [idiomas, setIdiomas] = useState({ es: true, lat: false, sub: false });
  const [calidad, setCalidad] = useState({ '1080p': true, '4K': false });
  const [visible, setVisible] = useState(true);

  // 1. EL CANDADO DE SESION
  useEffect(() => {
    const checkAdminSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        // Si hay sesion, pero el correo NO es el del admin
        if (session.user.email !== ADMIN_EMAIL) {
          console.warn("Acceso restringido: Redirigiendo a 404");
          // QUITAMOS: supabase.auth.signOut() para que no te expulse de la plataforma
          navigate('/404'); // Te manda a la pagina graciosa
          return;
        }
        // Si el correo es el correcto
        setAutenticado(true);
      }
    };
    checkAdminSession();
  }, [navigate, ADMIN_EMAIL]);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorAuth('');

    if (email !== ADMIN_EMAIL) {
      setErrorAuth('Acceso restringido: Solo el administrador puede entrar.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setErrorAuth('Credenciales incorrectas');
    } else {
      if (data.user.email === ADMIN_EMAIL) {
        setAutenticado(true);
        console.log("?Bienvenido, Administrador!");
      } else {
        // En lugar de cerrar sesion, simplemente mostramos el error y redirigimos
        setErrorAuth('Acceso denegado');
        navigate('/404');
      }
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error al salir:", error.message);
    setAutenticado(false);
    navigate('/'); // Te manda a la Home
  };

  // BUSCAR EN TMDB / SUPABASE
  const handleBusquedaInteligente = async (idTMDB) => {
    if (!idTMDB) return;

    setBuscando(true);
    setErrorBusqueda('');
    setPreview(null);

    try {
      const { data: peliLocal, error: errorDB } = await supabase
        .from('contenido')
        .select('*')
        .eq('tmdb_id', String(idTMDB))
        .maybeSingle();

      if (peliLocal) {
        console.log('CACHE HIT - Cargado desde Supabase');
        setPreview(peliLocal);
        return;
      }

      if (errorDB) {
        throw errorDB;
      }

      console.log('CACHE MISS - Consultando a la API de TMDB...');

      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      const endpoint = tipo === 'pelicula'
        ? `https://api.themoviedb.org/3/movie/${idTMDB}?api_key=${API_KEY}&language=es-MX&append_to_response=credits`
        : `https://api.themoviedb.org/3/tv/${idTMDB}?api_key=${API_KEY}&language=es-MX&append_to_response=credits`;

      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.id) {
        const directorInfo = data.credits?.crew?.find(person => person.job === 'Director')?.name
          || data.created_by?.[0]?.name
          || 'No disponible';

        setPreview({
          titulo: data.title || data.name,
          sinopsis: data.overview,
          poster: data.poster_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : null,
          backdrop: data.backdrop_path ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}` : null,
          anio: (data.release_date || data.first_air_date || '').slice(0, 4),
          rating: data.vote_average?.toFixed(1),
          generos: data.genres?.map(g => g.name).join(', '),
          duracion: data.runtime ? `${data.runtime} min` : data.number_of_seasons ? `${data.number_of_seasons} temporadas` : '',
          reparto: data.credits?.cast?.slice(0, 5).map(a => a.name).join(', '),
          temporadas: data.number_of_seasons || null,
          director: directorInfo,
        });
      } else {
        alert('No se encontro esa pelicula en el servidor global.');
      }
    } catch (error) {
      console.error('Error en el flujo de datos:', error);
    } finally {
      setBuscando(false);
    }
  };

  const handleBuscar = async () => {
    await handleBusquedaInteligente(tmdbId.trim());
  };

  // PUBLICAR
  const handlePublicar = async () => {
    if (!preview) return;
    setPublicando(true);

    try {
      const { error } = await supabase
        .from('contenido')
        .insert([
          {
            tmdb_id: String(tmdbId),
            tipo: tipo,
            titulo: preview.titulo,
            poster_url: preview.poster,
            sinopsis: preview.sinopsis,
            anio: preview.anio,
            rating_tmdb: preview.rating,
            generos: preview.generos,
            reparto: preview.reparto,
            duracion: preview.duracion,
            backdrop_url: preview.backdrop,
            director: preview.director,
            servidores: servidores,
            idiomas: idiomas,
            visible: visible,
          }
        ]);

      if (error) throw error;

      setPublicado(true);
      setTimeout(() => {
        setPublicado(false);
        setPreview(null);
        setTmdbId('');
        setServidores(['', '', '']);
      }, 2000);
    } catch (error) {
      console.error('Error al guardar en Supabase:', error);
      alert('Error al publicar: ' + error.message);
    } finally {
      setPublicando(false);
    }
  };

  // PANTALLA DE LOGIN
  if (!autenticado) {
    return (
      <div className="min-h-screen bg-[#080705] flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="/assets/logos/logo-full.png" alt="Logo" className="h-10 mx-auto mb-6 opacity-90" />
            <h1 className="text-white text-xl font-black uppercase tracking-widest">Acceso Restringido</h1>
            <p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">Panel de gestion</p>
          </div>

          <form onSubmit={handleLogin} className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Correo</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contrasena</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {errorAuth && (
              <p className="text-red-400 text-[11px] font-bold text-center uppercase tracking-widest">{errorAuth}</p>
            )}

            <button
              type="submit"
              className="bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all cursor-pointer mt-2"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  // PANEL PRINCIPAL
  return (
    <div className="min-h-screen bg-[#080705] text-white">

      {/* HEADER DEL PANEL */}
      <div className="border-b border-white/5 bg-[#0a0908] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/assets/logos/logo-full.png" alt="Logo" className="h-8 opacity-90" />
          <div className="w-[1px] h-6 bg-white/10"></div>
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Panel de Gestion</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          <X size={14} /> Cerrar Sesión
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* TITULO */}
        <div className="mb-8">
          <h1 className="text-2xl font-black uppercase tracking-tighter text-white">Publicar Contenido</h1>
          <p className="text-gray-500 text-xs mt-1">Busca por ID de TMDB y completa los datos de reproduccion</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col gap-6">

          {/* SWITCH PELICULA / SERIE */}
          <div className="flex gap-2">
            <button
              onClick={() => { setTipo('pelicula'); setPreview(null); setTmdbId(''); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer
                ${tipo === 'pelicula' ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20' : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'}`}
            >
              <Film size={14} /> Pelicula
            </button>
            <button
              onClick={() => { setTipo('serie'); setPreview(null); setTmdbId(''); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all cursor-pointer
                ${tipo === 'serie' ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20' : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'}`}
            >
              <Tv size={14} /> Serie
            </button>
          </div>

          {/* BUSCADOR TMDB */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              ID de TMDB &mdash; <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="text-[#3b82f6] hover:underline">buscar en themoviedb.org</a>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={tmdbId}
                onChange={e => setTmdbId(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleBuscar()}
                placeholder={tipo === 'pelicula' ? 'ej: 634649' : 'ej: 1396'}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
              />
              <button
                onClick={handleBuscar}
                disabled={buscando}
                className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-50 text-white px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
              >
                <Search size={14} /> {buscando ? 'Buscando...' : 'Buscar'}
              </button>
            </div>
            {errorBusqueda && <p className="text-red-400 text-[11px] font-bold">{errorBusqueda}</p>}
          </div>

          {/* PREVIEW */}
          {preview && (
            <div className="border border-white/10 rounded-xl overflow-hidden">

              {preview.backdrop && (
                <div className="relative h-32 overflow-hidden">
                  <img src={preview.backdrop} className="w-full h-full object-cover opacity-40" alt="backdrop" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908] to-transparent"></div>
                </div>
              )}

              <div className="p-4 flex gap-4">
                {preview.poster && (
                  <img src={preview.poster} alt="poster" className="w-16 rounded-lg border border-white/10 flex-shrink-0 object-cover aspect-[2/3]" />
                )}
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <h2 className="text-white font-black text-base truncate">{preview.titulo}</h2>
                  <div className="flex flex-wrap gap-2 text-[10px] text-gray-400 font-bold">
                    {preview.anio && <span>{preview.anio}</span>}
                    {preview.duracion && <span>&bull; {preview.duracion}</span>}
                    {preview.rating && (
                      <span className="flex items-center gap-1 text-[#3b82f6]">
                        <Star size={10} className="fill-[#3b82f6]" /> {preview.rating}
                      </span>
                    )}
                  </div>
                  {preview.generos && <p className="text-[10px] text-gray-500">{preview.generos}</p>}
                  {preview.sinopsis && (
                    <p className="text-[11px] text-gray-400 leading-relaxed mt-1 line-clamp-2">{preview.sinopsis}</p>
                  )}
                  {preview.reparto && (
                    <p className="text-[10px] text-gray-500 mt-1"><span className="text-gray-400 font-bold">Reparto:</span> {preview.reparto}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* SERVIDORES */}
          {preview && (
            <>
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                  <Server size={12} /> Links de Servidores
                </label>
                {servidores.map((srv, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-gray-500 w-20 uppercase">Servidor {i + 1}</span>
                    <input
                      type="text"
                      value={srv}
                      onChange={e => {
                        const nuevo = [...servidores];
                        nuevo[i] = e.target.value;
                        setServidores(nuevo);
                      }}
                      placeholder="https://..."
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#3b82f6]/50 transition-colors"
                    />
                  </div>
                ))}
              </div>

              {/* IDIOMAS Y CALIDAD */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                    <Globe size={12} /> Idiomas disponibles
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {Object.keys(idiomas).map(lang => (
                      <button
                        key={lang}
                        onClick={() => setIdiomas(prev => ({ ...prev, [lang]: !prev[lang] }))}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase border transition-all cursor-pointer
                          ${idiomas[lang] ? 'bg-[#3b82f6] border-[#3b82f6] text-white' : 'bg-white/[0.03] border-white/10 text-gray-400'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Calidad</label>
                  <div className="flex gap-2 flex-wrap">
                    {Object.keys(calidad).map(c => (
                      <button
                        key={c}
                        onClick={() => setCalidad(prev => ({ ...prev, [c]: !prev[c] }))}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase border transition-all cursor-pointer
                          ${calidad[c] ? 'bg-[#3b82f6] border-[#3b82f6] text-white' : 'bg-white/[0.03] border-white/10 text-gray-400'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* VISIBILIDAD */}
              <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Visible en la plataforma</span>
                <button
                  onClick={() => setVisible(!visible)}
                  className={`w-10 h-5 rounded-full transition-all cursor-pointer relative ${visible ? 'bg-[#3b82f6]' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${visible ? 'left-5' : 'left-0.5'}`}></span>
                </button>
              </div>

              {/* BOTON PUBLICAR */}
              <button
                onClick={handlePublicar}
                disabled={publicando || publicado}
                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2
                  ${publicado
                    ? 'bg-green-500 text-white'
                    : 'bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-70 text-white shadow-lg shadow-[#3b82f6]/20'
                  }`}
              >
                {publicado ? (
                  <><Check size={18} /> Publicado correctamente</>
                ) : publicando ? (
                  'Publicando...'
                ) : (
                  <><Upload size={16} /> Publicar {tipo === 'pelicula' ? 'Pelicula' : 'Serie'}</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Estudio;



