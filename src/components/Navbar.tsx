import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold text-amber-900">
          ☕ Cafetería Esencia
        </h1>

        <ul className="flex gap-8 font-medium items-center">

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
              Productos
            </Link>
          </li>

          <li>
            <Link
              to="/productos"
              className="hover:text-amber-700 transition"
            >
              Productos
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

          <li>
            <Link
  to="/carrito"
  className="relative text-2xl"
>
              🛒

              {cart.length > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-3
                    bg-red-500
                    text-white
                    text-xs
                    w-5
                    h-5
                    rounded-full
                    flex
                    items-center
                    justify-center
                  "
                >
                  {cart.length}
                </span>
              )}
            </Link>
          </li>

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;