import { useState } from "react";
import { useCart } from "../context/useCart";

const shippingOptions = [
  { name: "Ate Vitarte", price: 17 },
  { name: "Barranco", price: 12 },
  { name: "Bellavista", price: 20 },
  { name: "Breña", price: 12 },
  { name: "Callao", price: 17 },
  { name: "Carabayllo (compra >100)", price: 30 },
  { name: "Carmen de la Legua", price: 17 },
  { name: "Cercado de Lima", price: 12 },
  { name: "Chorrillos", price: 17 },
  { name: "Cieneguilla (compra >100)", price: 30 },
  { name: "Comas", price: 15 },
  { name: "El agustino", price: 15 },
  { name: "Huachipa", price: 20 },
  { name: "Independencia", price: 12 },
  { name: "Jesús María", price: 12 },
  { name: "La Molina", price: 17 },
  { name: "La Perla", price: 17 },
  { name: "La Punta", price: 17 },
  { name: "La Victoria", price: 12 },
  { name: "Lince", price: 12 },
  { name: "Los Olivos", price: 15 },
  { name: "Lurín (compra >100)", price: 30 },
  { name: "Magdalena", price: 12 },
  { name: "Miraflores", price: 12 },
  { name: "Pachacamac (compra >100)", price: 30 },
  { name: "Pueblo Libre", price: 12 },
  { name: "Puente Piedra (compra >100)", price: 25 },
  { name: "Rimac", price: 14 },
  { name: "Salamanca", price: 12 },
  { name: "San Borja", price: 12 },
  { name: "San Isidro", price: 12 },
  { name: "San Juan de Lurigancho (hasta 5 Mariscal)", price: 15 },
  { name: "San Juan de Lurigancho (del 5 Mariscal al Porton)", price: 17 },
  { name: "San Juan de Miraflores", price: 17 },
  { name: "San Luis", price: 12 },
  { name: "San Martin de Porres", price: 12 },
  { name: "San Miguel", price: 12 },
  { name: "Santa Anita", price: 15 },
  { name: "Santa Clara", price: 17 },
  { name: "Surco", price: 12 },
  { name: "Surquillo", price: 12 },
  { name: "Villa el Salvador", price: 17 },
  { name: "Villa Maria del Triunfo", price: 17 },
  { name: "Ate Vitarte - Salamanca", price: 15 },
  { name: "Ate Vitarte - Santa Clara", price: 17 },
  { name: "SJL - Jicamarca", price: 17 },
];

function Checkout() {
  const { cart, total } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [shipping, setShipping] = useState("Ate Vitarte");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  const shippingPrice = shippingOptions.find((s) => s.name === shipping)?.price || 0;
  const totalFinal = total + shippingPrice;

  const handleOrder = () => {
    if (paymentMethod === "tarjeta") {
      if (!cardNumber || !cardName || expiry.length !== 4 || cvv.length !== 3) {
        setError("Completa todos los campos de la tarjeta");
        return;
      }
    }
    setError("");
    alert("Pedido realizado con éxito");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h1>
          <p className="text-gray-500">Agrega productos antes de pagar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-10">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalles de facturación</h2>
              <div className="space-y-4">
                <select className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white">
                  <option>¿Desea boleta o factura?</option>
                  <option>Boleta</option>
                  <option>Factura</option>
                </select>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input placeholder="Nombre *" className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  <input placeholder="Apellidos *" className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input value="Perú" disabled className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 text-gray-500" />
                  <input value="Lima" disabled className="w-full border border-gray-200 p-3.5 rounded-xl bg-gray-50 text-gray-500" />
                </div>

                <input placeholder="Dirección de la calle *" className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                <input placeholder="Referencia" className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input placeholder="Teléfono *" className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                  <input placeholder="Correo electrónico *" className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Método de pago</h2>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-amber-300 cursor-pointer transition has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="pago"
                    checked={paymentMethod === "transferencia"}
                    onChange={() => setPaymentMethod("transferencia")}
                    className="w-4 h-4 text-amber-700"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Transferencia bancaria</p>
                    <p className="text-sm text-gray-500">Paga directamente desde tu banco</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-amber-300 cursor-pointer transition has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                  <input
                    type="radio"
                    name="pago"
                    checked={paymentMethod === "tarjeta"}
                    onChange={() => setPaymentMethod("tarjeta")}
                    className="w-4 h-4 text-amber-700"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Débito o crédito</p>
                    <p className="text-sm text-gray-500">Paga con Visa, Mastercard o American Express</p>
                  </div>
                </label>
              </div>

              {paymentMethod === "transferencia" && (
                <div className="mt-6 p-5 rounded-xl bg-amber-50 border border-amber-100 text-sm text-gray-700 space-y-2">
                  <p>Realiza tu pago directamente en nuestra cuenta bancaria. Usa el número de pedido como referencia.</p>
                  <p className="font-medium">Tu pedido no se procesará hasta recibir el pago.</p>
                  <p className="font-semibold text-amber-800">Envía comprobante al WhatsApp 912345678.</p>
                </div>
              )}

              {paymentMethod === "tarjeta" && (
                <div className="mt-6 space-y-4">
                  <input
                    placeholder="Número de tarjeta"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <input
                    placeholder="Nombre del titular"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="MM/AA"
                      value={expiry}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d{0,4}$/.test(val)) setExpiry(val);
                      }}
                      maxLength={4}
                      className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      placeholder="CVV"
                      value={cvv}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d{0,3}$/.test(val)) setCvv(val);
                      }}
                      maxLength={3}
                      className="w-full border border-gray-200 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sticky top-28">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tu pedido</h2>

              <div className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <div key={String(item.id)} className="flex justify-between py-3 text-sm">
                    <span className="text-gray-600">
                      {item.name} <span className="text-gray-400">× {item.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-900">S/ {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">S/ {total}</span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Envío</label>
                  <select
                    value={shipping}
                    onChange={(e) => setShipping(e.target.value)}
                    className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-sm"
                  >
                    {shippingOptions.map((s) => (
                      <option key={s.name} value={s.name}>{s.name} - S/ {s.price}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Costo de envío</span>
                  <span className="font-medium">S/ {shippingPrice}</span>
                </div>
              </div>

              <hr className="my-4 border-gray-100" />

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-amber-700">S/ {totalFinal}</span>
              </div>

              <button
                onClick={handleOrder}
                className="w-full py-4 rounded-xl bg-amber-700 text-white font-semibold hover:bg-amber-800 transition shadow-lg shadow-amber-900/20 text-lg"
              >
                Realizar el pedido
              </button>

              <p className="text-xs text-gray-400 mt-4 text-center">
                Tus datos personales se usarán para procesar tu pedido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
