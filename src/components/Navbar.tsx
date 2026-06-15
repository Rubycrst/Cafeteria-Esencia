import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-amber-900">
          ☕ Cafetería Esencia
        </h1>

        <ul className="flex gap-8 font-medium">

          <li>
            <Link
              to="/"
              className="hover:text-amber-700 transition"
            >
              Inicio
            </Link>
          </li>

          <li>
            <Link
              to="/menu"
              className="hover:text-amber-700 transition"
            >
              Menú
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="hover:text-amber-700 transition"
            >
              Iniciar sesión

            </Link>
          </li>

          <li>
            <Link
              to="/registro"
              className="hover:text-amber-700 transition"
            >
              Registro
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;