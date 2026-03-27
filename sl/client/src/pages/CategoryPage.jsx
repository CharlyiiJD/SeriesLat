import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Tag } from 'lucide-react';
import Header from '../components/layout/Header';
import Sidebar from '../components/home/Sidebar';

const CategoryPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get('c') || '';

  const [currentPage, setCurrentPage] = useState(1);
  const [activeGlobalId, setActiveGlobalId] = useState(null);
  const touchTimer = useRef(null);

  const totalPages = 10;
  const resultsPerPage = 30;
  const results = Array.from({ length: resultsPerPage });

  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentPage(1);
  }, [categoria]);

  const handleResultClick = () => {
    navigate('/pelicula/descripcion');
  };

  const handleTouchStart = (id) => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
    touchTimer.current = setTimeout(() => setActiveGlobalId(id), 80);
  };

  const handleTouchEnd = () => {
    if (touchTimer.current) clearTimeout(touchTimer.current);
  };

  const handlePageClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationGroup = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);
    const group = [];
    for (let i = start; i <= end; i++) group.push(i);
    return group;
  };

  return (
    <div className="min-h-screen bg-[#080705]">
      <Header />
      <main className="pt-20" onClick={() => setActiveGlobalId(null)}>
        <section className="text-white py-12 px-4 min-[801px]:px-12">
          <div className="max-w-[1400px] mx-auto">

            <div className="grid grid-cols-1 min-[1500px]:grid-cols-[1fr_320px] gap-12 items-start">
              <div className="flex flex-col overflow-hidden">

                {/* HEADER DE CATEGORÍA */}
                <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 mb-10">
                  <div className="flex items-center gap-2 px-1">
                    <Tag className="w-3 h-3 text-[#3b82f6]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                      Categoría:
                    </span>
                  </div>
                  <div className="flex items-center gap-3 px-1">
                    <span className="text-[#3b82f6] text-lg font-black truncate">{categoria}</span>
                    <span className="text-gray-500 text-[11px] font-bold flex-shrink-0">
                      ~{resultsPerPage * totalPages} resultados
                    </span>
                  </div>
                </div>

                {/* GRID DE RESULTADOS */}
                {categoria ? (
                  <div className="grid grid-cols-3 min-[900px]:grid-cols-4 min-[1200px]:grid-cols-5 gap-3 min-[480px]:gap-6">
                    {results.map((_, idx) => {
                      const myId = `cat-result-${idx}`;
                      const isSelected = activeGlobalId === myId;
                      const isSerie = idx % 3 === 0;

                      return (
                        <div
                          key={idx}
                          className="group cursor-pointer relative outline-none"
                          onClick={() => handleResultClick()}
                          onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(myId); }}
                          onTouchMove={handleTouchEnd}
                          onTouchEnd={handleTouchEnd}
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

                            <div className="absolute inset-0 flex items-center justify-center text-[8px] min-[480px]:text-[10px] text-gray-700 font-bold uppercase tracking-widest text-center px-1">Póster</div>

                            {/* Botón Play */}
                            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out transform
                              ${isSelected ? 'opacity-100 scale-100 !duration-150' : 'opacity-0 scale-75'}
                              min-[801px]:group-hover:opacity-100 min-[801px]:group-hover:scale-100 min-[801px]:group-hover:duration-150`}>
                              <div className="bg-[#3b82f6] p-2.5 min-[480px]:p-4 rounded-full shadow-lg shadow-[#3b82f6]/40">
                                <Play className="w-4 h-4 min-[480px]:w-6 min-[480px]:h-6 text-white fill-white" />
                              </div>
                            </div>

                            {/* Badge */}
                            <div className="absolute top-1.5 left-1.5 min-[480px]:top-3 min-[480px]:left-3 bg-[#3b82f6] text-white text-[7px] min-[480px]:text-[9px] font-black px-1.5 py-0.5 min-[480px]:px-2 min-[480px]:py-1 rounded-md uppercase z-20">
                              {isSerie ? 'SERIE' : '1080p'}
                            </div>
                          </div>

                          <h4 className={`mt-2 text-[11px] min-[480px]:text-sm font-bold transition-colors duration-500 truncate
                            ${isSelected ? 'text-[#3b82f6] !duration-150' : 'text-gray-300'}
                            min-[801px]:group-hover:text-[#3b82f6] min-[801px]:group-hover:duration-150`}>
                            {categoria} {idx + 1 + (currentPage - 1) * resultsPerPage}
                          </h4>
                          <p className="text-[9px] min-[480px]:text-[10px] text-gray-500 font-medium tracking-wide">
                            2026 • {categoria}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-32 gap-4">
                    <Tag className="w-16 h-16 text-white/10" />
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">
                      Selecciona una categoría para explorar
                    </p>
                  </div>
                )}

                {/* PAGINACIÓN */}
                {categoria && (
                  <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col min-[600px]:flex-row items-center justify-between gap-6 shadow-xl">
                    <div className="flex items-center gap-2 pl-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Estás viendo</span>
                        <p className="text-sm font-bold text-white">
                          Página <span className="text-[#3b82f6]">{currentPage}</span> de {totalPages}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageClick(currentPage - 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-[#3b82f6] active:scale-90 transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex gap-2">
                        {getPaginationGroup().map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border cursor-pointer active:scale-90 ${
                              currentPage === page
                                ? 'bg-[#3b82f6] border-[#3b82f6] text-white shadow-lg shadow-[#3b82f6]/20'
                                : 'bg-black/40 border-white/10 text-gray-400'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => handlePageClick(currentPage + 1)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 border border-white/10 text-gray-400 hover:text-[#3b82f6] active:scale-90 transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* BARRA LATERAL */}
              <aside className="w-full mt-12 min-[1500px]:mt-0">
                <div className="sticky top-24">
                  <Sidebar activeGlobalId={activeGlobalId} setActiveGlobalId={setActiveGlobalId} />
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CategoryPage;