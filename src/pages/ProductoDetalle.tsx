import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/useCart";
import { useState } from "react";

function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (p) => p.id === Number(id)
  );

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

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
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
              className="
                w-full
                rounded-xl
                shadow-lg
                object-cover
              "
            />

          </div>

          {/* INFORMACIÓN */}

          <div>

            <h1 className="text-5xl font-bold text-amber-900">
              {product.name}
            </h1>

            <p className="text-3xl font-semibold mt-4">
              S/ {product.price}.00
            </p>

            <div className="mt-8 space-y-4 text-lg">

              <p>
                <span className="font-bold">
                  Región:
                </span>{" "}
                {product.region}
              </p>

              <p>
                <span className="font-bold">
                  Tostado:
                </span>{" "}
                {product.roast}
              </p>

              <p>
                <span className="font-bold">
                  Peso:
                </span>{" "}
                {product.weight}
              </p>

              <p>
                <span className="font-bold">
                  Notas:
                </span>{" "}
                {product.notes}
              </p>

            </div>

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

              <p className="font-bold mb-3">
                Cantidad
              </p>

              <div className="flex items-center gap-4">

                <button
                  onClick={() =>
                    setQuantity(
                      Math.max(quantity - 1, 1)
                    )
                  }
                  className="
                    bg-gray-200
                    px-4
                    py-2
                    rounded
                    text-xl
                  "
                >
                  -
                </button>

                <span className="font-bold text-xl">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity(quantity + 1)
                  }
                  className="
                    bg-gray-200
                    px-4
                    py-2
                    rounded
                    text-xl
                  "
                >
                  +
                </button>

              </div>

            </div>

            {/* BOTÓN */}

            <button
              onClick={handleAdd}
              className="
                mt-8
                bg-amber-700
                hover:bg-amber-800
                text-white
                px-8
                py-4
                rounded-lg
                font-semibold
                transition
              "
            >
              Agregar al carrito
            </button>

          </div>

        </div>

      </div>

      {/* PRODUCTOS RELACIONADOS */}

      <div className="max-w-7xl mx-auto px-6 pb-20">

        <h2 className="text-3xl font-bold text-amber-900 mb-10">
          También te puede interesar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {relatedProducts.map((item) => (

            <Link
              key={item.id}
              to={`/producto/${item.id}`}
              className="group"
            >

              <div
                className="
                  bg-white
                  rounded-xl
                  overflow-hidden
                  shadow
                  hover:shadow-xl
                  transition
                "
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="
                    w-full
                    h-56
                    object-cover
                    group-hover:scale-105
                    transition
                    duration-300
                  "
                />

                <div className="p-4">

                  <h3 className="font-bold text-lg">
                    {item.name}
                  </h3>

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