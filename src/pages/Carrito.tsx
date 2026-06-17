import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

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

  // 👉 Ir al checkout
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-amber-900 mb-10">
          🛒 Mi Carrito
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-xl text-gray-500">
              No hay productos en el carrito.
            </p>
          </div>
        ) : (
          <>
            {/* LISTA DE PRODUCTOS */}
            <div className="space-y-5">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow p-6 flex justify-between items-center"
                >
                  {/* INFO PRODUCTO */}
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />

                    <div>
                      <h3 className="text-xl font-bold">
                        {item.name}
                      </h3>

                      <p className="text-gray-600">
                        S/ {item.price} c/u
                      </p>

                      <p className="font-semibold text-amber-800 mt-2">
                        Subtotal: S/ {item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* CONTROLES */}
                  <div className="flex items-center gap-4">

                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg font-bold"
                    >
                      -
                    </button>

                    <span className="text-lg font-bold min-w-[30px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg font-bold"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL + ACCIONES */}
            <div className="bg-white rounded-xl shadow mt-8 p-6">

              <h2 className="text-3xl font-bold text-amber-900">
                Total: S/ {total}
              </h2>

              <div className="flex flex-wrap gap-4 mt-6">

                {/* CANCELAR COMPRA */}
                <button
                  onClick={clearCart}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition"
                >
                  Cancelar compra
                </button>

                {/* PAGAR / IR A CHECKOUT */}
                <button
                  onClick={handleCheckout}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition"
                >
                  Pagar
                </button>

              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

export default Carrito;