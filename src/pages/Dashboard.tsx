import { useCart } from "../context/useCart";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mi Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
            </div>
            <div className="space-y-4">
              {sampleProducts.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition"
                >
                  <div>
                    <h3 className="font-bold text-gray-900">{p.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">S/ {p.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(p)}
                    className="bg-amber-700 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-800 transition text-sm"
                  >
                    Agregar
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mi Carrito</h2>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Carrito vacío</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={String(item.id)}
                      className="flex justify-between items-center border-b border-gray-50 pb-3"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">S/ {item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-amber-700">S/ {item.price * item.quantity}</span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-600 transition font-bold text-lg"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-amber-700">S/ {total}</span>
                  </div>
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
