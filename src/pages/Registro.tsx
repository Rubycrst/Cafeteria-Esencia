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

    // simulación registro
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 px-6">

      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

        <h1 className="text-3xl font-bold text-center text-amber-900 mb-6">
          Crear cuenta ☕
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-600"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-600"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-600"
          />

          <button className="w-full bg-amber-700 text-white py-3 rounded-lg hover:bg-amber-800">
            Crear cuenta
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-amber-700 font-semibold">
            Inicia sesión
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Registro;