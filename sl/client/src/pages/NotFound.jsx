import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ghost } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080705] flex items-center justify-center px-4">
      <div className="bg-[#161512] border border-white/5 rounded-2xl p-12 max-w-lg w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6 text-[#ef4444]">
          <Ghost size={80} strokeWidth={1} />
        </div>
        
        <h1 className="text-[#ef4444] text-7xl font-black mb-4 tracking-tighter">404</h1>
        
        <h2 className="text-white text-xl font-bold mb-3 uppercase tracking-tight">
          ¡Upss! Creo que no deberías estar por aquí, amiguito...
        </h2>
        
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">
          Parece que intentaste entrar a una zona restringida o la página decidió irse de vacaciones. 
          Mejor volvamos antes de que el administrador se de cuenta.
        </p>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-red-500/20 active:scale-95"
        >
          Sacame de aquí
        </button>
      </div>
    </div>
  );
};

export default NotFound;