import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Calendar, Star, LayoutGrid, Tag, Filter } from 'lucide-react';

const FilterButton = ({ label, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Lógica para cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-all group cursor-pointer"
      >
        <Icon className="w-4 h-4 text-[#3b82f6]" />
        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">{label}</span>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-[100] p-2 animate-in fade-in zoom-in duration-200">
          <div className="text-[10px] text-gray-500 px-3 py-1 uppercase font-bold border-b border-white/5 mb-1">
            Seleccionar {label}
          </div>
          <div className="hover:bg-[#3b82f6] hover:text-white p-2 rounded-lg text-sm cursor-pointer transition-colors text-white">
            Opción 1
          </div>
          <div className="hover:bg-[#3b82f6] hover:text-white p-2 rounded-lg text-sm cursor-pointer transition-colors text-white">
            Opción 2
          </div>
        </div>
      )}
    </div>
  );
};

const CatalogHeader = () => {
  return (
    <div className="flex flex-col min-[850px]:flex-row w-full gap-0 mb-10 items-start min-[850px]:items-center">
      
      {/* SECCIÓN IZQUIERDA (Título con barra a la izquierda) */}
      <div className="w-full min-[850px]:basis-1/5 flex items-center justify-start gap-4 min-[850px]:pr-6 mb-6 min-[850px]:mb-0">
        
        {/* Barra Vertical Azul (Ahora a la izquierda) */}
        <div className="h-10 min-[850px]:h-12 w-[4px] bg-[#3b82f6] shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full flex-shrink-0"></div>

        <h2 className="text-sm min-[1100px]:text-base font-black uppercase leading-tight tracking-tighter text-white">
          PELÍCULAS
        </h2>
      </div>

      {/* SECCIÓN DERECHA (FILTROS) */}
      <div className="w-full min-[850px]:basis-4/5 flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-4">
        
        {/* Texto superior explicativo */}
        <div className="flex items-center justify-start min-[850px]:justify-center gap-2 px-1">
          <Filter className="w-3 h-3 text-[#3b82f6]" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
            Filtrar contenido por:
          </span>
        </div>

        {/* Botones de Filtro */}
        <div className="flex flex-wrap gap-3 justify-start min-[850px]:justify-center">
          <FilterButton label="Año" icon={Calendar} />
          <FilterButton label="Calificación" icon={Star} />
          <FilterButton label="Género" icon={Tag} />
          <FilterButton label="Calidad" icon={LayoutGrid} />
        </div>
      </div>
    </div>
  );
};

export default CatalogHeader;