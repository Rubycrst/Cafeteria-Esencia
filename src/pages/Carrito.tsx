import { useCart } from "../context/useCart";
import { useNavigate, Link } from "react-router-dom";

function Carrito() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    total,
    clearCart,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Mi Carrito</h1>
            <p className="text-gray-500 mt-1">
              {cart.length} {cart.length === 1 ? "producto" : "productos"} en tu carrito
            </p>
          </div>
          <Link
            to="/productos"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Seguir comprando
          </Link>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-16 text-center">
            <svg className="w-20 h-20 text-gray-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
            <p className="text-xl text-gray-500 font-medium">Tu carrito está vacío</p>
            <p className="text-gray-400 mt-2">Explora nuestros productos y agrega lo que más te guste.</p>
            <button
              onClick={() => navigate("/productos")}
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-amber-700 text-white rounded-xl font-semibold hover:bg-amber-800 transition shadow-lg shadow-amber-900/20"
            >
              Ver productos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={String(item.id)}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center gap-5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-28 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                    <p className="text-amber-700 font-bold mt-1">S/ {item.price}.00 c/u</p>
                    <p className="text-gray-500 text-sm mt-1">Subtotal: S/ {item.price * item.quantity}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50 transition font-bold text-gray-600"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-900 min-w-[28px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-gray-50 transition font-bold text-gray-600"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
                      title="Eliminar"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-28">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen</h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>S/ {total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>Calculado en el pago</span>
                  </div>
                </div>

                <hr className="my-4 border-gray-100" />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-amber-700">S/ {total}</span>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full py-3.5 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 transition shadow-lg shadow-amber-900/20 mb-3"
                >
                  Finalizar compra
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-3 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition"
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;
