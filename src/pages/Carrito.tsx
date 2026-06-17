import { useCart } from "../context/useCart";

function Carrito() {
  const { cart, removeFromCart, total } = useCart();

  return (
    <div className="min-h-screen bg-amber-50 p-10">

      <h1 className="text-4xl font-bold text-amber-900 mb-8">
        🛒 Mi Carrito
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-gray-500 text-lg">
            No hay productos en el carrito.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">

            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-5 flex justify-between items-center"
              >

                <div>
                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

                  <p className="text-gray-600">
                    S/ {item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Eliminar
                </button>

              </div>
            ))}

          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow">

            <h2 className="text-2xl font-bold text-amber-900">
              Total: S/ {total}
            </h2>

          </div>
        </>
      )}

    </div>
  );
}

export default Carrito;