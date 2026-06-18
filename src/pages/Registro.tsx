import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-amber-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <span className="text-4xl">☕</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Crear cuenta</h1>
          <p className="text-gray-500 mt-2">Regístrate para empezar a ordenar</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <button className="w-full bg-amber-700 text-white py-3.5 rounded-xl font-semibold hover:bg-amber-800 transition shadow-lg shadow-amber-900/20">
            Crear cuenta
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-amber-700 font-semibold hover:text-amber-800">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registro;
