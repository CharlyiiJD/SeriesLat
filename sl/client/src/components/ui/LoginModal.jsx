import React, { useState, useEffect } from 'react';
import { User, Lock, X, LogIn, Eye, EyeOff, Github, Chrome } from 'lucide-react';

const LoginModal = ({ onClose, onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // Desactivar scroll de fondo mientras el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Intentando login...", { usuario, password });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 overflow-y-auto py-8">

      {/* OVERLAY OSCURO SIN BLUR — sin onClick para no cerrar al clickear afuera */}
      <div className="fixed inset-0 bg-black/80" />

      {/* CONTENEDOR DEL MODAL */}
      <div className="relative bg-[#0a0908] border border-white/10 w-full max-w-[420px] rounded-xl shadow-2xl shadow-blue-500/5">

        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer z-10 p-1 hover:bg-white/5 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-8 pt-10">
          {/* LOGO CENTRADO */}
          <div className="flex justify-center mb-7">
            <img
              src="/assets/logos/logo-full.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* CAMPO: USUARIO */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                Usuario
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-600 group-focus-within:text-[#3b82f6] transition-colors" />
                </div>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/[0.06] transition-all text-white placeholder:text-gray-700"
                  placeholder="tu_usuario"
                  required
                />
              </div>
            </div>

            {/* CAMPO: PASSWORD */}
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Contraseña
                </label>
                <button type="button" className="text-[9px] font-bold text-[#3b82f6] hover:text-[#3b82f6]/80 uppercase tracking-wider cursor-pointer">
                  ¿Olvidaste la clave?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-600 group-focus-within:text-[#3b82f6] transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg py-3 pl-11 pr-12 text-sm focus:outline-none focus:border-[#3b82f6]/50 focus:bg-white/[0.06] transition-all text-white placeholder:text-gray-700"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-600 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* BOTÓN: ACCEDER */}
            <button
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-lg flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#3b82f6]/20 transition-all hover:scale-[1.02] active:scale-[0.98] group cursor-pointer mt-1"
            >
              Iniciar Sesión
              <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* SEPARADOR SOCIAL */}
            <div className="relative py-3 text-center">
              <div className="absolute inset-y-1/2 left-0 w-full h-[1px] bg-white/5"></div>
              <span className="relative bg-[#0a0908] px-4 text-[9px] font-black text-gray-600 uppercase tracking-widest">
                O continúa con
              </span>
            </div>

            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-lg text-[10px] font-bold uppercase transition-all text-gray-300 cursor-pointer">
                <Chrome size={16} /> Google
              </button>
              <button type="button" className="flex items-center justify-center gap-2 py-3 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 rounded-lg text-[10px] font-bold uppercase transition-all text-gray-300 cursor-pointer">
                <Github size={16} /> Github
              </button>
            </div>

            {/* ENLACE A REGISTRO */}
            <div className="text-center pt-2 pb-1">
              <p className="text-[11px] text-gray-500 font-medium">
                ¿No tienes una cuenta?{" "}
                <button
                  type="button"
                  onClick={onRegisterClick}
                  className="text-[#3b82f6] font-black hover:text-white transition-colors cursor-pointer uppercase ml-1"
                >
                  Regístrate
                </button>
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;