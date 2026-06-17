import { useCart } from "../context/useCart";

function Dashboard() {
  const { cart, addToCart, removeFromCart, total } = useCart();

  const products = [
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

  return (
    <div className="min-h-screen bg-amber-50 p-10">

      <h1 className="text-4xl font-bold text-amber-900 mb-6">
        Menú Cafetería ☕
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* PRODUCTOS */}
        <div>

          <h2 className="text-2xl font-bold mb-4">Productos</h2>

          <div className="space-y-4">

            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded shadow flex justify-between items-center"
              >

                <div>
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-gray-600">S/ {p.price}</p>
                </div>

                <button
                  onClick={() => addToCart(p)}
                  className="bg-amber-700 text-white px-3 py-1 rounded"
                >
                  Agregar
                </button>

              </div>
            ))}

          </div>
        </div>

        {/* CARRITO */}
        <div>

          <h2 className="text-2xl font-bold mb-4">Carrito 🛒</h2>

          <div className="bg-white p-4 rounded shadow">

            {cart.length === 0 ? (
              <p className="text-gray-500">Carrito vacío</p>
            ) : (
              <div className="space-y-3">

                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b pb-2"
                  >

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">
                        S/ {item.price}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 font-bold"
                    >
                      X
                    </button>

                  </div>
                ))}

                <div className="pt-4 font-bold text-lg">
                  Total: S/ {total}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;