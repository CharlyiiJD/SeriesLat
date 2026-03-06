import React, { useState } from 'react';
import { Mail, Lock, X, User, ShieldPlus, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';

const RegisterModal = ({ onClose, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    
    // Aquí irá la lógica de Supabase
    console.log("Registrando...", { fullName, email, password });
  };

  return (
    <div 
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }} // Negro profundo de la web
    >
      {/* Overlay para cerrar al hacer clic fuera */}
      <div className="absolute inset-0 w-full h-full" onClick={onClose}></div>

      {/* CONTENEDOR DEL MODAL */}
      <div className="relative bg-[#0a0908] border border-white/10 w-full max-w-[450px] rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* DETALLE SUPERIOR AZUL */}
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-60"></div>

        {/* BOTÓN CERRAR */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer z-10 p-1 hover:bg-white/5 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10">
          {/* CABECERA */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#3b82f6]/10 border border-[#3b82f6]/20 mb-4 shadow-lg shadow-[#3b82f6]/10">
              <ShieldPlus size={28} className="text-[#3b82f6]" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic leading-none">
              Crear <span className="text-[#3b82f6]">Cuenta</span>
            </h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* NOMBRE */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Nombre Completo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-600 group-focus-within:text-[#3b82f6] transition-colors" />
                </div>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
                  placeholder="Tu nombre"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-600 group-focus-within:text-[#3b82f6] transition-colors" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            {/* PASSWORD GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Contraseña</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-600 group-focus-within:text-[#3b82f6] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Confirmar</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-600 group-focus-within:text-[#3b82f6] transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
                    placeholder="••••••••"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-xl animate-shake">
                <AlertCircle size={16} className="text-red-500" />
                <p className="text-red-500 text-[10px] font-bold uppercase">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#3b82f6]/20 transition-all hover:scale-[1.01] active:scale-[0.98] group cursor-pointer mt-4"
            >
              Registrarse
              <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center pt-4">
              <p className="text-[11px] text-gray-500 font-medium">
                ¿Ya tienes una cuenta?{" "}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLoginClick();
                  }}
                  className="text-[#3b82f6] font-black hover:text-white transition-colors cursor-pointer ml-1"
                >
                  Inicia Sesión
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;