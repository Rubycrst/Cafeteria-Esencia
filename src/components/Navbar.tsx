import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import CartSidebar from "./CartSidebar";
import AccessibilityMenu from "./AccessibilityMenu";

function Navbar() {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleCart = useCallback(() => {
    setCartOpen((prev) => !prev);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">☕</span>
            <span className="text-xl font-bold text-amber-900">
              Cafetería Esencia
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-3">
            <Link
              to="/"
              className="hidden sm:inline-block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-amber-800 hover:bg-amber-50 transition"
            >
              Inicio
            </Link>

            <Link
              to="/productos"
              className="hidden sm:inline-block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-amber-800 hover:bg-amber-50 transition"
            >
              Productos
            </Link>

            <AccessibilityMenu />

            <Link
              to="/login"
              className="hidden sm:inline-block px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-amber-800 hover:bg-amber-50 transition"
            >
              Iniciar sesión
            </Link>

            <button
              onClick={toggleCart}
              className="relative p-2.5 rounded-lg hover:bg-amber-50 transition text-gray-700"
              aria-label="Abrir carrito"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>

              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <CartSidebar isOpen={cartOpen} onClose={closeCart} />
    </>
  );
}

export default Navbar;
