import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/useCart";
import { useState } from "react";

function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  // ✅ FIX IMPORTANTE: comparación segura de ID
  const product = products.find((p) => String(p.id) === String(id));

  // ✅ PROTECCIÓN SI NO EXISTE
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Producto no encontrado
        </h1>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // ✅ FIX IMPORTANTE: agregar cantidad correcta al carrito
  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* DETALLE PRODUCTO */}
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-16">

          {/* IMAGEN */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-xl shadow-lg object-cover"
            />
          </div>

          {/* INFO */}
          <div>

            <h1 className="text-5xl font-bold text-amber-900">
              {product.name}
            </h1>

            <p className="text-3xl font-semibold mt-4">
              S/ {product.price}.00
            </p>

            {/* DESCRIPCIÓN (YA FUNCIONA SI PRODUCT EXISTE) */}
            <div className="mt-8 space-y-4 text-lg">

              <p>
                <span className="font-bold">Región:</span>{" "}
                {product.region}
              </p>

              <p>
                <span className="font-bold">Tostado:</span>{" "}
                {product.roast}
              </p>

              <p>
                <span className="font-bold">Peso:</span>{" "}
                {product.weight}
              </p>

              <p>
                <span className="font-bold">Notas:</span>{" "}
                {product.notes}
              </p>

            </div>

            {/* DESCRIPCIÓN PRINCIPAL */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-3">
                Descripción
              </h2>

              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* CANTIDAD */}
            <div className="mt-10">

              <p className="font-bold mb-3">Cantidad</p>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    setQuantity((q) => Math.max(q - 1, 1))
                  }
                  className="bg-gray-200 px-4 py-2 rounded text-xl"
                >
                  -
                </button>

                <span className="font-bold text-xl">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((q) => q + 1)
                  }
                  className="bg-gray-200 px-4 py-2 rounded text-xl"
                >
                  +
                </button>

              </div>
            </div>

            {/* BOTÓN */}
            <button
              onClick={handleAdd}
              className="mt-8 bg-amber-700 hover:bg-amber-800 text-white px-8 py-4 rounded-lg font-semibold transition"
            >
              Agregar al carrito
            </button>

          </div>

        </div>
      </div>

      {/* RELACIONADOS */}
      <div className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-amber-900 mb-10">
          También te puede interesar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {relatedProducts.map((item) => (
            <Link key={item.id} to={`/producto/${item.id}`}>
              <div className="bg-white shadow rounded-xl overflow-hidden">

                <img
                  src={item.image}
                  className="h-56 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {item.region}
                  </p>
                  <p className="text-amber-800 font-bold mt-2">
                    S/ {item.price}.00
                  </p>
                </div>

              </div>
            </Link>
          ))}

        </div>

      </div>

    </div>
  );
}

export default ProductoDetalle;