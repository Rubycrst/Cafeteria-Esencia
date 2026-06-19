import { useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/AuthContext";
import CartSidebar from "./CartSidebar";
import AccessibilityMenu from "./AccessibilityMenu";

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/productos", label: "Productos" },
  { to: "/quienes-somos", label: "Quiénes Somos" },
] as const;

function Navbar() {
  const { cart } = useCart();
  const { user, profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const toggleCart = useCallback(() => setCartOpen((p) => !p), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((p) => !p), []);
  const toggleUserMenu = useCallback(() => setUserMenuOpen((p) => !p), []);

  const handleLogout = async () => {
    await signOut();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-lg shadow-sm border-b border-coffee-100/50 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <span className="w-9 h-9 rounded-lg bg-coffee-700 flex items-center justify-center text-lg shadow-sm">
                <svg className="w-5 h-5 text-coffee-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 21V19H20V21H2ZM20 8V5H22V11H20V10H18V13C18 14.1 17.55 15.04 16.83 15.71C16.11 16.38 15.14 16.71 14.25 16.71H9.75C8.86 16.71 7.89 16.38 7.17 15.71C6.45 15.04 6 14.1 6 13V3H18V8H20ZM8 5V13C8 13.55 8.22 14.02 8.59 14.36C8.95 14.69 9.39 14.85 9.75 14.85H14.25C14.61 14.85 15.05 14.69 15.41 14.36C15.78 14.02 16 13.55 16 13V5H8Z" />
                </svg>
              </span>
              <span className="text-lg font-bold text-coffee-800 hidden sm:block">
                Cafetería Esencia
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-coffee-100 text-coffee-800"
                        : "text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <AccessibilityMenu />

              {user ? (
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-coffee-700 text-white text-xs flex items-center justify-center font-bold">
                      {profile?.full_name?.charAt(0)?.toUpperCase() || user.email?.charAt(0).toUpperCase() || "U"}
                    </span>
                    <span className="max-w-[120px] truncate">
                      {profile?.full_name || user.email?.split("@")[0] || "Usuario"}
                    </span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {userMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-coffee-100 py-2 z-20 animate-scale-in">
                        <div className="px-4 py-3 border-b border-coffee-100">
                          <p className="text-sm font-medium text-coffee-900 truncate">
                            {profile?.full_name || "Usuario"}
                          </p>
                          <p className="text-xs text-coffee-400 truncate">{user.email}</p>
                        </div>
                        <Link
                          to="/perfil"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-coffee-600 hover:bg-coffee-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Mi Perfil
                        </Link>
                        {profile?.role === "admin" && (
                          <Link
                            to="/admin"
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-coffee-600 hover:bg-coffee-50 transition"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Panel Admin
                          </Link>
                        )}
                        <hr className="border-coffee-100 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Cerrar sesión
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Ingresar</span>
                </Link>
              )}

              <button
                onClick={toggleCart}
                className="relative p-2.5 rounded-lg hover:bg-coffee-50 transition-colors text-coffee-600"
                aria-label="Abrir carrito"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold-500 text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center shadow-sm">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={toggleMobile}
                className="md:hidden p-2.5 rounded-lg hover:bg-coffee-50 transition-colors text-coffee-600"
                aria-label="Menú"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-coffee-100 bg-white/95 backdrop-blur-lg">
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-coffee-100 text-coffee-800"
                        : "text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {user ? (
                <>
                  <Link
                    to="/perfil"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 rounded-lg text-sm font-medium text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                  >
                    Mi Perfil
                  </Link>
                  {profile?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block px-4 py-2.5 rounded-lg text-sm font-medium text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-coffee-600 hover:text-coffee-800 hover:bg-coffee-50 transition-colors"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      <CartSidebar isOpen={cartOpen} onClose={closeCart} />
    </>
  );
}

export default Navbar;
