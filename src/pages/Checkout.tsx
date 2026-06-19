import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "../context/useCart";

const checkoutSchema = z.object({
  invoiceType: z.string(),
  firstName: z.string().min(2, "El nombre es requerido"),
  lastName: z.string().min(2, "El apellido es requerido"),
  address: z.string().min(5, "La dirección es requerida"),
  reference: z.string().optional(),
  phone: z.string().min(9, "El teléfono debe tener al menos 9 dígitos").regex(/^\d+$/, "Solo números"),
  email: z.string().email("Correo inválido"),
  paymentMethod: z.string(),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiry: z.string().optional(),
  cvv: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "tarjeta") {
    if (!data.cardNumber || data.cardNumber.length < 13) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Número de tarjeta inválido", path: ["cardNumber"] });
    }
    if (!data.cardName || data.cardName.trim().length < 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nombre del titular requerido", path: ["cardName"] });
    }
    if (!data.expiry || data.expiry.length !== 4) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Fecha inválida (MMAA)", path: ["expiry"] });
    }
    if (!data.cvv || data.cvv.length !== 3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CVV inválido (3 dígitos)", path: ["cvv"] });
    }
  }
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

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
  const { cart, total, clearCart } = useCart();
  const [shipping, setShipping] = useState("Ate Vitarte");
  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      invoiceType: "boleta",
      paymentMethod: "transferencia",
    },
  });

  const paymentMethod = watch("paymentMethod");

  const shippingPrice = useMemo(
    () => shippingOptions.find((s) => s.name === shipping)?.price || 0,
    [shipping]
  );
  const totalFinal = total + shippingPrice;

  const onSubmit = () => {
    clearCart();
    setOrderSuccess(true);
  };

  if (cart.length === 0 && !orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-coffee-50/50">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-coffee-50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-coffee-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-coffee-900 mb-2">Tu carrito está vacío</h1>
          <p className="text-coffee-400">Agrega productos antes de pagar.</p>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-coffee-50/50 px-6">
        <div className="text-center animate-scale-in max-w-md">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-coffee-900 mb-3">¡Pedido realizado!</h1>
          <p className="text-coffee-400 mb-8">Recibirás un correo con los detalles de tu pedido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-coffee-50/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-coffee-900 mb-10">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-8">
                <h2 className="text-xl font-bold text-coffee-900 mb-6">Detalles de facturación</h2>
                <div className="space-y-4">
                  <div>
                    <select
                      {...register("invoiceType")}
                      className={`w-full border p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white text-coffee-900 transition ${
                        errors.invoiceType ? "border-red-400" : "border-coffee-200"
                      }`}
                    >
                      <option value="boleta">Boleta</option>
                      <option value="factura">Factura</option>
                    </select>
                    {errors.invoiceType && (
                      <p className="text-red-500 text-sm mt-1">{errors.invoiceType.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        placeholder="Nombre *"
                        {...register("firstName")}
                        className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                          errors.firstName ? "border-red-400" : "border-coffee-200"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="Apellidos *"
                        {...register("lastName")}
                        className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                          errors.lastName ? "border-red-400" : "border-coffee-200"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input value="Perú" disabled className="w-full border border-coffee-200 p-3.5 rounded-xl bg-coffee-50 text-coffee-400 cursor-not-allowed" />
                    <input value="Lima" disabled className="w-full border border-coffee-200 p-3.5 rounded-xl bg-coffee-50 text-coffee-400 cursor-not-allowed" />
                  </div>

                  <div>
                    <input
                      placeholder="Dirección de la calle *"
                      {...register("address")}
                      className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                        errors.address ? "border-red-400" : "border-coffee-200"
                      }`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <input
                      placeholder="Referencia"
                      {...register("reference")}
                      className="w-full border border-coffee-200 p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        placeholder="Teléfono *"
                        {...register("phone")}
                        className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                          errors.phone ? "border-red-400" : "border-coffee-200"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="Correo electrónico *"
                        {...register("email")}
                        className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                          errors.email ? "border-red-400" : "border-coffee-200"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-8">
                <h2 className="text-xl font-bold text-coffee-900 mb-6">Método de pago</h2>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-coffee-200 hover:border-gold-400 cursor-pointer transition has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50">
                    <input
                      type="radio"
                      value="transferencia"
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-gold-600"
                    />
                    <div>
                      <p className="font-medium text-coffee-900">Transferencia bancaria</p>
                      <p className="text-sm text-coffee-400">Paga directamente desde tu banco</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-coffee-200 hover:border-gold-400 cursor-pointer transition has-[:checked]:border-gold-500 has-[:checked]:bg-gold-50">
                    <input
                      type="radio"
                      value="tarjeta"
                      {...register("paymentMethod")}
                      className="w-4 h-4 text-gold-600"
                    />
                    <div>
                      <p className="font-medium text-coffee-900">Débito o crédito</p>
                      <p className="text-sm text-coffee-400">Paga con Visa, Mastercard o American Express</p>
                    </div>
                  </label>
                </div>

                {paymentMethod === "transferencia" && (
                  <div className="mt-6 p-5 rounded-xl bg-gold-50 border border-gold-200 text-sm text-coffee-600 space-y-2">
                    <p>Realiza tu pago directamente en nuestra cuenta bancaria. Usa el número de pedido como referencia.</p>
                    <p className="font-medium">Tu pedido no se procesará hasta recibir el pago.</p>
                    <p className="font-semibold text-gold-700">Envía comprobante al WhatsApp 912 345 678.</p>
                  </div>
                )}

                {paymentMethod === "tarjeta" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <input
                        placeholder="Número de tarjeta"
                        {...register("cardNumber")}
                        className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                          errors.cardNumber ? "border-red-400" : "border-coffee-200"
                        }`}
                      />
                      {errors.cardNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <input
                        placeholder="Nombre del titular"
                        {...register("cardName")}
                        className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                          errors.cardName ? "border-red-400" : "border-coffee-200"
                        }`}
                      />
                      {errors.cardName && (
                        <p className="text-red-500 text-sm mt-1">{errors.cardName.message}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input
                          placeholder="MM/AA"
                          maxLength={4}
                          {...register("expiry")}
                          className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                            errors.expiry ? "border-red-400" : "border-coffee-200"
                          }`}
                        />
                        {errors.expiry && (
                          <p className="text-red-500 text-sm mt-1">{errors.expiry.message}</p>
                        )}
                      </div>
                      <div>
                        <input
                          placeholder="CVV"
                          maxLength={3}
                          {...register("cvv")}
                          className={`w-full border p-3.5 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition ${
                            errors.cvv ? "border-red-400" : "border-coffee-200"
                          }`}
                        />
                        {errors.cvv && (
                          <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-8 sticky top-28">
                <h2 className="text-xl font-bold text-coffee-900 mb-6">Tu pedido</h2>

                <div className="divide-y divide-coffee-100">
                  {cart.map((item) => (
                    <div key={String(item.id)} className="flex justify-between py-3 text-sm">
                      <span className="text-coffee-600">
                        {item.name} <span className="text-coffee-400">× {item.quantity}</span>
                      </span>
                      <span className="font-medium text-coffee-900">S/ {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <hr className="my-4 border-coffee-100" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-500">Subtotal</span>
                    <span className="font-medium text-coffee-900">S/ {total}</span>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-coffee-700 block mb-2">Envío</label>
                    <select
                      value={shipping}
                      onChange={(e) => setShipping(e.target.value)}
                      className="w-full border border-coffee-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-400 bg-white text-sm text-coffee-900 transition"
                    >
                      {shippingOptions.map((s) => (
                        <option key={s.name} value={s.name}>{s.name} - S/ {s.price}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-coffee-500">Costo de envío</span>
                    <span className="font-medium text-coffee-900">S/ {shippingPrice}</span>
                  </div>
                </div>

                <hr className="my-4 border-coffee-100" />

                <div className="flex justify-between items-center mb-8">
                  <span className="text-lg font-bold text-coffee-900">Total</span>
                  <span className="text-2xl font-bold text-gold-600">S/ {totalFinal}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-coffee-700 text-white font-semibold hover:bg-coffee-800 transition shadow-lg shadow-coffee-900/20 text-lg"
                >
                  Realizar el pedido
                </button>

                <p className="text-xs text-coffee-400 mt-4 text-center">
                  Tus datos personales se usarán para procesar tu pedido.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
