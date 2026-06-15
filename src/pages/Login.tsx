import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ADMIN
    if (email === "admin@cafe.com" && password === "1234") {
      navigate("/admin");
    } else {
      // USER
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-amber-900 mb-6">
          Iniciar sesión ☕
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <button className="w-full bg-amber-700 text-white py-3 rounded-lg">
            Entrar
          </button>

        </form>

        <p className="text-center mt-6 text-sm">
          ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
        </p>

      </div>

    </div>
  );
}

export default Login;