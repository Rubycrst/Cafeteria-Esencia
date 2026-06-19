import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

const sampleProducts = [
  {
    id: 1,
    name: "Café Americano",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Capuccino",
    price: 7,
    image:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Brownie",
    price: 6,
    image:
      "https://images.unsplash.com/photo-1548365328-3baf15a8c379?auto=format&fit=crop&w=400&q=80",
  },
];

function Dashboard() {
  const { cart, addToCart, removeFromCart, total } = useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-coffee-50/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-coffee-900">Mi Dashboard</h1>
            <p className="text-coffee-400 mt-1">Bienvenido a tu panel de control</p>
          </div>
          <button
            onClick={() => navigate("/productos")}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-coffee-700 text-white font-medium hover:bg-coffee-800 transition shadow-sm text-sm"
          >
            Ver productos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-coffee-900">Productos</h2>
            </div>
            <div className="space-y-4">
              {sampleProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-coffee-100 flex items-center gap-4 hover:shadow-md transition"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-coffee-900">{p.name}</h3>
                    <p className="text-coffee-500 text-sm mt-0.5">S/ {p.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-coffee-700 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-coffee-800 transition text-sm flex-shrink-0"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-coffee-900">Mi Carrito</h2>
              {cart.length > 0 && (
                <button
                  onClick={() => navigate("/carrito")}
                  className="text-sm text-gold-600 hover:text-gold-700 font-medium transition"
                >
                  Ver todo
                </button>
              )}
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-6">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-coffee-50 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-coffee-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
                    </svg>
                  </div>
                  <p className="text-coffee-500">Carrito vacío</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={String(item.id)}
                      className="flex justify-between items-center border-b border-coffee-50 pb-3 last:border-0"
                    >
                      <div>
                        <p className="font-semibold text-coffee-900">{item.name}</p>
                        <p className="text-sm text-coffee-400">S/ {item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-gold-600">S/ {item.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-coffee-300 hover:text-red-500 transition font-bold text-lg"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-coffee-900">Total</span>
                    <span className="text-xl font-bold text-gold-600">S/ {total}</span>
                  </div>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full py-3 rounded-xl bg-coffee-700 text-white font-semibold hover:bg-coffee-800 transition mt-4"
                  >
                    Ir a pagar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
