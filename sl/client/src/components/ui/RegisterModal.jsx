import React, { useState, useEffect } from 'react';
import { Mail, Lock, X, User, UserPlus, Eye, EyeOff, AlertCircle, AtSign, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const RegisterModal = ({ onClose, onLoginClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (username.includes(" ")) {
      setError("El usuario no puede contener espacios");
      return;
    }

    setLoading(true);

    try {
      // 1. Verificar username disponible (sin .single())
      const { data: existingUsers } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username.toLowerCase());

      if (existingUsers && existingUsers.length > 0) {
        setError("Ese nombre de usuario ya está en uso");
        setLoading(false);
        return;
      }

      // 2. Crear cuenta en Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            username: username.toLowerCase(),
          }
        }
      });

      if (signUpError) throw signUpError;

      // 3. Insertar en profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          username: username.toLowerCase(),
          updated_at: new Date().toISOString(),
        });

      if (profileError) throw profileError;

      setSuccess(true);

    } catch (err) {
      console.error("Error:", err);
      if (err.message.includes("already registered")) {
        setError("Este email ya está registrado");
      } else if (err.message.includes("Password")) {
        setError("La contraseña debe tener al menos 6 caracteres");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 overflow-y-auto py-10">
      <div className="fixed inset-0 bg-black" onClick={onClose}></div>

      <div className="relative bg-[#0a0908] border border-white/10 w-full max-w-[450px] rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors cursor-pointer z-10 p-1 hover:bg-white/5 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="p-8 sm:p-10">

          {/* PANTALLA DE ÉXITO */}
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                <UserPlus size={28} className="text-green-400" />
              </div>
              <h2 className="text-xl font-black uppercase tracking-tighter text-white italic">
                ¡Cuenta <span className="text-green-400">Creada!</span>
              </h2>
              <p className="text-gray-400 text-sm">
                Tu cuenta ha sido creada exitosamente.
              </p>
              <button
                onClick={() => { onClose(); onLoginClick(); }}
                className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-3 rounded-md text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer mt-2"
              >
                Iniciar Sesión
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-white italic leading-none">
                  Crear <span className="text-[#3b82f6]">Cuenta</span>
                </h2>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>

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
                      className="w-full bg-white/[0.03] border border-white/10 rounded-md py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Usuario</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <AtSign size={18} className="text-gray-600 group-focus-within:text-[#3b82f6] transition-colors" />
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-md py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
                      placeholder="ej: juan_perez"
                      required
                    />
                  </div>
                </div>

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
                      className="w-full bg-white/[0.03] border border-white/10 rounded-md py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                </div>

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
                        className="w-full bg-white/[0.03] border border-white/10 rounded-md py-3.5 pl-10 pr-4 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
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
                        className="w-full bg-white/[0.03] border border-white/10 rounded-md py-3.5 pl-10 pr-10 text-sm focus:outline-none focus:border-[#3b82f6]/50 transition-all text-white placeholder:text-gray-700"
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
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-md">
                    <AlertCircle size={16} className="text-red-500 shrink-0" />
                    <p className="text-red-500 text-[10px] font-bold uppercase">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#3b82f6] hover:bg-[#2563eb] disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-md flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-[#3b82f6]/20 transition-all hover:scale-[1.01] active:scale-[0.98] group cursor-pointer mt-4"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      Registrarse
                      <UserPlus size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="text-center pt-4">
                  <p className="text-[11px] text-gray-500 font-medium">
                    ¿Ya tienes una cuenta?{" "}
                    <button
                      type="button"
                      onClick={() => { onClose(); onLoginClick(); }}
                      className="text-[#3b82f6] font-black hover:text-white transition-colors cursor-pointer uppercase ml-1"
                    >
                      Inicia Sesión
                    </button>
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;