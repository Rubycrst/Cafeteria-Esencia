import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";
import { useEffect, useCallback } from "react";

type CartSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, total } = useCart();
  const navigate = useNavigate();

  const handleViewMore = useCallback(() => {
    onClose();
    navigate("/carrito");
  }, [onClose, navigate]);

  const handleCheckout = useCallback(() => {
    onClose();
    navigate("/checkout");
  }, [onClose, navigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">
              Mi Carrito
              {cart.length > 0 && (
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({cart.length} {cart.length === 1 ? "producto" : "productos"})
                </span>
              )}
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
                <p className="text-gray-500 font-medium">Tu carrito está vacío</p>
                <p className="text-gray-400 text-sm mt-1">Agrega productos para comenzar</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={String(item.id)} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
                      <p className="text-amber-700 font-bold text-sm mt-1">S/ {item.price * item.quantity}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition text-sm"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold w-5 text-center text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-gray-400 hover:text-red-500 transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-lg font-bold text-gray-900">S/ {total}</span>
              </div>
              <button
                onClick={handleViewMore}
                className="w-full py-3 rounded-xl border-2 border-amber-600 text-amber-700 font-semibold hover:bg-amber-50 transition"
              >
                Ver más
              </button>
              <button
                onClick={handleCheckout}
                className="w-full py-3 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 transition"
              >
                Finalizar compra
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CartSidebar;
