import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@cafe.com" && password === "1234") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-amber-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <span className="text-4xl">☕</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Iniciar sesión</h1>
          <p className="text-gray-500 mt-2">Accede a tu cuenta para continuar</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
            Entrar
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <Link to="/registro" className="text-amber-700 font-semibold hover:text-amber-800">
            Regístrate
          </Link>
        </div>

        <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100">
          <p className="text-xs text-gray-500 font-medium mb-2">Credenciales de prueba:</p>
          <p className="text-xs text-gray-400">Admin: admin@cafe.com / 1234</p>
          <p className="text-xs text-gray-400">User: cualquier correo / cualquier contraseña</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
