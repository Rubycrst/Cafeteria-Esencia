import { useState } from "react";
import { useCart } from "../context/useCart";

function Checkout() {
  const { cart, total } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("transferencia");
  const [shipping, setShipping] = useState("Ate Vitarte");

  // 💳 tarjeta
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");

  // 🚚 distritos
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

  const shippingPrice =
    shippingOptions.find((s) => s.name === shipping)?.price || 0;

  const totalFinal = total + shippingPrice;

  const handleOrder = () => {
    if (paymentMethod === "tarjeta") {
      if (
        !cardNumber ||
        !cardName ||
        expiry.length !== 4 ||
        cvv.length !== 3
      ) {
        setError("Completa este campo");
        return;
      }
    }

    setError("");
    alert("Pedido realizado con éxito 🎉");
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-6">

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ================= FORMULARIO ================= */}
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

        {/* ================= RESUMEN ================= */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-4 text-amber-900">
            Tu pedido
          </h2>

          <div className="border-b pb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>S/ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>S/ {total}</span>
            </div>

            {/* ENVÍO SELECT */}
            <div className="mt-4">
              <h3 className="font-bold text-lg mb-2">Envío</h3>

              <select
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="w-full border p-3 rounded"
              >
                {shippingOptions.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} - S/ {s.price}
                  </option>
                ))}
              </select>
            </div>



            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>S/ {totalFinal}</span>
            </div>

          </div>

          {/* ================= MÉTODOS DE PAGO ================= */}
          <div className="mt-6 space-y-3">

            <h3 className="font-bold text-lg">Método de pago</h3>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="pago"
                checked={paymentMethod === "transferencia"}
                onChange={() => setPaymentMethod("transferencia")}
              />
              Transferencia bancaria
            </label>

            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="pago"
                checked={paymentMethod === "tarjeta"}
                onChange={() => setPaymentMethod("tarjeta")}
              />
              Débito e crédito
            </label>

          </div>

          {/* ================= TRANSFERENCIA ================= */}
          {paymentMethod === "transferencia" && (
            <div className="mt-4 p-4 border rounded bg-gray-50 text-sm text-gray-700">
              <p>Realiza tu pago directamente en nuestra cuenta bancaria. Usa el número de pedido como referencia.</p>
              <p className="mt-2">
                Tu pedido no se procesará hasta recibir el pago.
              </p>
              <p className="mt-2 font-semibold">
                Envía comprobante al WhatsApp 912345678.
              </p>
            </div>
          )}

          {/* ================= TARJETA ================= */}
          {paymentMethod === "tarjeta" && (
            <div className="mt-4 space-y-3">

              <input
                placeholder="Número de tarjeta"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="w-full border p-3 rounded"
              />

              <input
                placeholder="Nombre del titular"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className="w-full border p-3 rounded"
              />

              <div className="flex gap-3">

                <input
                  placeholder="MM/AA"
                  value={expiry}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d{0,4}$/.test(val)) setExpiry(val);
                  }}
                  maxLength={4}
                  className="w-1/2 border p-3 rounded"
                />

                <input
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (/^\d{0,3}$/.test(val)) setCvv(val);
                  }}
                  maxLength={3}
                  className="w-1/2 border p-3 rounded"
                />

              </div>

              {error && (
                <p className="text-red-500 text-sm font-semibold">
                  {error}
                </p>
              )}

            </div>
          )}

          {/* ================= BOTÓN ================= */}
          <button
            onClick={handleOrder}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
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