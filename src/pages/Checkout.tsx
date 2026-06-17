import { useCart } from "../context/useCart";

function Checkout() {
  const { cart, total } = useCart();

  const envio = 17;
  const totalFinal = total + envio;

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* FORMULARIO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h1 className="text-3xl font-bold mb-6 text-amber-900">
            Detalles de facturación
          </h1>

          <div className="space-y-4">

            <select className="w-full border p-3 rounded">
              <option>¿Desea boleta o factura?</option>
              <option>Boleta</option>
              <option>Factura</option>
            </select>

            <input placeholder="Nombre *" className="w-full border p-3 rounded" />
            <input placeholder="Apellidos *" className="w-full border p-3 rounded" />

            <input value="Perú" disabled className="w-full border p-3 rounded bg-gray-100" />

            <input value="Lima" disabled className="w-full border p-3 rounded bg-gray-100" />

            <input placeholder="Ciudad" className="w-full border p-3 rounded" />

            <input placeholder="Dirección de la calle *" className="w-full border p-3 rounded" />

            <input placeholder="Referencia" className="w-full border p-3 rounded" />

            <input placeholder="Teléfono *" className="w-full border p-3 rounded" />

            <input placeholder="Correo electrónico *" className="w-full border p-3 rounded" />

          </div>
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-4 text-amber-900">
            Tu pedido
          </h2>

          <div className="border-b pb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>S/ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>S/ {total}</span>
            </div>

            <div className="flex justify-between">
              <span>Envío</span>
              <span>Ate Vitarte: S/ {envio}</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>S/ {totalFinal}</span>
            </div>
          </div>

          {/* MÉTODOS DE PAGO */}
          <div className="mt-6 space-y-3">

            <label className="flex items-center gap-2">
              <input type="radio" name="pago" />
              Transferencia bancaria
            </label>

            <p className="text-xs text-gray-600">
              Realiza el pago a nuestra cuenta y envía el comprobante por WhatsApp.
            </p>

            <label className="flex items-center gap-2">
              <input type="radio" name="pago" />
              Débito o crédito
            </label>

          </div>

          {/* BOTÓN FINAL */}
          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
            Realizar el pedido
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Tus datos personales se usarán para procesar tu pedido.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Checkout;