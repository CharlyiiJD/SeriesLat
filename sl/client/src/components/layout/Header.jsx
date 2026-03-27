import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosSearch, IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { LogOut, UserCircle2 } from 'lucide-react';
import LoginModal from '../ui/LoginModal';
import RegisterModal from '../ui/RegisterModal';
import { supabase } from '../../lib/supabase'; // Ajusta esta ruta según donde tengas tu archivo

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isCatExpanded, setIsCatExpanded] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const userMenuRef = useRef(null);

  const categorias = [
    "Acción", "Aventura", "Ciencia Ficción", "Comedia", "Drama",
    "Documentales", "Terror", "Suspenso", "Romance", "Fantasía",
    "Musical", "Misterio", "Crimen", "Bélico"
  ];

  // Detectar sesión activa
  useEffect(() => {
    // Sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });

    // Escuchar cambios de sesión (login / logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, username')
      .eq('id', userId)
      .single();
    if (data) setProfile(data);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsUserMenuOpen(false);
    setIsBurgerOpen(false);
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/buscar?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleCategoryClick = (cat) => {
    setIsOpen(false);
    setIsBurgerOpen(false);
    navigate(`/categoria?c=${encodeURIComponent(cat)}`);
  };

  const handleInicio = () => {
    setIsBurgerOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePeliculas = () => {
    setIsBurgerOpen(false);
    navigate('/catalogo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSeries = () => {
    setIsBurgerOpen(false);
    navigate('/series');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnime = () => {
    setIsBurgerOpen(false);
    navigate('/buscar?q=anime');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      if (width > 700) setIsSearchOpen(false);
      if (width > 1100) setIsBurgerOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      if (currentScrollY !== lastScrollY) {
        setIsBurgerOpen(false);
        setIsSearchOpen(false);
        setIsOpen(false);
        setIsUserMenuOpen(false);
        if (currentScrollY > lastScrollY && currentScrollY > 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isDesktop = windowWidth > 1100;
  const isTablet = windowWidth <= 1100 && windowWidth > 700;
  const isMobile = windowWidth <= 700;

  // Componente del botón de usuario (desktop)
  const UserButton = () => (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
        className="flex items-center gap-2 border-2 border-[#3b82f6] text-white px-4 py-2 rounded-md text-sm font-bold transition-all hover:bg-[#3b82f6] cursor-pointer"
      >
        <UserCircle2 size={18} />
        <span className="max-w-[120px] truncate">
          {profile?.full_name?.split(' ')[0] || profile?.username || 'Usuario'}
        </span>
      </button>

      {isUserMenuOpen && (
        <div className="absolute right-0 mt-3 w-52 bg-zinc-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-white/10">
            <p className="text-white text-sm font-bold truncate">{profile?.full_name}</p>
            <p className="text-gray-500 text-[11px] truncate">@{profile?.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}>

        {/* BUSCADOR MÓVIL OVERLAY */}
        <div className={`absolute top-0 left-0 w-full h-[92px] bg-black z-[100] transition-all duration-500 ease-in-out flex items-center px-6 gap-3 ${isSearchOpen && isMobile ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm text-white outline-none transition-all focus:ring-1 focus:ring-[#3b82f6] focus:bg-black/40"
            />
            <IoIosSearch
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400 cursor-pointer"
              onClick={handleSearchClick}
            />
          </div>
          <button onClick={() => setIsSearchOpen(false)} className="text-4xl text-white hover:text-[#3b82f6] transition-colors cursor-pointer">
            <IoIosClose />
          </button>
        </div>

        {/* NAVBAR PRINCIPAL */}
        <div className={`px-6 py-6 relative z-[60] transition-all duration-500 ${isScrolled ? 'bg-[#0c1821] backdrop-blur-md shadow-lg py-4' : 'bg-gradient-to-b from-black/95 to-transparent'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between text-white relative">

            {/* LOGO */}
            <div className="flex-shrink-0 z-50">
              <a href="/" className="transition-transform active:scale-95 block">
                <img
                  src={isDesktop ? "/assets/logos/logo-full.png" : "/assets/logos/just-logo.png"}
                  alt="Logo"
                  className="h-11 w-auto object-contain"
                />
              </a>
            </div>

            {/* CENTRO */}
            <div className="flex-1 flex justify-center items-center px-4">
              {isDesktop && (
                <nav className="flex items-center gap-8 text-[15px] font-medium tracking-wide">
                  <a onClick={handleInicio} className="hover:text-[#3b82f6] transition cursor-pointer">Inicio</a>
                  <a onClick={handlePeliculas} className="hover:text-[#3b82f6] transition cursor-pointer">Películas</a>
                  <a onClick={handleSeries} className="hover:text-[#3b82f6] transition cursor-pointer">Series</a>

                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className={`flex items-center gap-2 transition-colors cursor-pointer ${isOpen ? 'text-[#3b82f6]' : 'hover:text-[#3b82f6]'}`}
                    >
                      Categorías {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </button>
                    {isOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-[320px] bg-zinc-900 border border-white/10 p-4 rounded-xl shadow-2xl z-50">
                        <div className="grid grid-cols-2">
                          {categorias.map((cat, index) => (
                            <a
                              key={index}
                              onClick={() => handleCategoryClick(cat)}
                              className="text-gray-300 hover:text-[#3b82f6] hover:bg-white/5 transition-colors text-[13px] py-2.5 px-4 border-r border-b border-white/[0.05] cursor-pointer"
                            >
                              {cat}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <a onClick={handleAnime} className="hover:text-[#3b82f6] transition cursor-pointer">Anime</a>
                </nav>
              )}

              {isTablet && (
                <div className="flex items-center w-full max-w-[95%] relative">
                  <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm outline-none focus:ring-1 focus:ring-[#3b82f6] transition-all"
                  />
                  <IoIosSearch
                    className="absolute right-4 text-xl text-gray-400 cursor-pointer"
                    onClick={handleSearchClick}
                  />
                </div>
              )}
            </div>

            {/* DERECHA */}
            <div className="flex items-center gap-4 lg:gap-6 z-50">
              {isDesktop && (
                <>
                  <div className="flex items-center group relative">
                    <input
                      type="text"
                      placeholder="Buscar..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      className="bg-white/10 border border-white/20 rounded-full py-2 pl-4 pr-10 text-sm outline-none focus:ring-1 focus:ring-[#3b82f6] focus:bg-black/40 transition-all w-48 lg:w-60"
                    />
                    <IoIosSearch
                      className="absolute right-3 text-xl text-gray-400 group-focus-within:text-[#3b82f6] transition-colors cursor-pointer"
                      onClick={handleSearchClick}
                    />
                  </div>

                  {/* BOTÓN: logueado o no */}
                  {user ? (
                    <UserButton />
                  ) : (
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="border-2 border-[#3b82f6] text-white px-6 py-2 rounded-md text-sm font-bold transition-all hover:bg-[#3b82f6] hover:text-white cursor-pointer"
                    >
                      Ingresar
                    </button>
                  )}
                </>
              )}

              {isMobile && (
                <button onClick={() => setIsSearchOpen(true)} className="text-2xl text-white cursor-pointer hover:text-[#3b82f6] transition-colors">
                  <IoIosSearch />
                </button>
              )}

              {!isDesktop && (
                <button onClick={() => setIsBurgerOpen(!isBurgerOpen)} className="flex flex-col justify-center items-center w-8 h-8 relative z-[70] cursor-pointer">
                  <span className={`bg-white h-0.5 w-7 rounded-full transition-all duration-300 ${isBurgerOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`bg-white h-0.5 w-7 rounded-full my-1.5 transition-all duration-200 ${isBurgerOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                  <span className={`bg-white h-0.5 w-7 rounded-full transition-all duration-300 ${isBurgerOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* MENÚ BURGER */}
        <div className={`fixed top-[92px] right-0 h-[calc(100vh-92px)] w-[60%] sm:w-[40%] bg-zinc-900/98 backdrop-blur-2xl transition-transform duration-500 ease-in-out z-[55] border-l border-white/5 ${isBurgerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <nav className="flex flex-col p-8 text-white text-lg gap-6 font-light overflow-y-auto h-full overscroll-contain">
            <a onClick={handleInicio} className="hover:text-[#3b82f6] border-b border-white/5 pb-2 cursor-pointer">Inicio</a>
            <a onClick={handlePeliculas} className="hover:text-[#3b82f6] border-b border-white/5 pb-2 cursor-pointer">Películas</a>
            <a onClick={handleSeries} className="hover:text-[#3b82f6] border-b border-white/5 pb-2 cursor-pointer">Series</a>

            <div>
              <button
                onClick={() => setIsCatExpanded(!isCatExpanded)}
                className="flex items-center justify-between w-full hover:text-[#3b82f6] pb-2 cursor-pointer"
              >
                Categorías <IoIosArrowDown className={`transition-transform ${isCatExpanded ? 'rotate-180' : ''}`} />
              </button>
              <div className={`grid grid-cols-1 gap-3 overflow-hidden transition-all duration-500 ${isCatExpanded ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                {categorias.map((cat, i) => (
                  <a
                    key={i}
                    onClick={() => handleCategoryClick(cat)}
                    className="text-sm text-gray-400 hover:text-[#3b82f6] pl-2 cursor-pointer"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            <a onClick={handleAnime} className="hover:text-[#3b82f6] cursor-pointer">Anime</a>

            {/* BOTÓN BURGER: logueado o no */}
            {user ? (
              <div className="mt-4 mb-20 space-y-3">
                <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3">
                  <p className="text-white text-sm font-bold truncate">{profile?.full_name}</p>
                  <p className="text-gray-500 text-xs truncate">@{profile?.username}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-base cursor-pointer bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut size={18} />
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsBurgerOpen(false); setIsLoginOpen(true); }}
                className="bg-[#3b82f6] text-white py-3 rounded-lg font-bold text-base cursor-pointer hover:bg-white hover:text-black transition-colors mt-4 mb-20"
              >
                Ingresar
              </button>
            )}
          </nav>
        </div>
      </header>

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

export default Header;
