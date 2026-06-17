import { products } from "../data/products";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

function Menu() {
  const { addToCart } = useCart();

  return (
    <div className="min-h-screen bg-white">

      <div className="bg-amber-900 py-12 mb-10">
        <h1 className="text-center text-4xl font-bold text-white">
          Cafés por Región
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

          {products.map((product) => (

            <div
              key={product.id}
              className="group"
            >

              <Link to={`/producto/${product.id}`}>

                <div className="overflow-hidden rounded-lg">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      h-[340px]
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-300
                    "
                  />

                </div>

              </Link>

              <div className="text-center mt-4">

                <h3 className="text-xl font-medium">
                  {product.name}
                </h3>

                <p className="text-gray-500">
                  Regiones, {product.region}
                </p>

                <p className="font-bold text-amber-800 mt-2">
                  S/ {product.price}.00
                </p>

                <button
                  onClick={() => addToCart(product)}
                  className="
                    mt-4
                    bg-amber-700
                    text-white
                    px-5
                    py-2
                    rounded-lg
                    hover:bg-amber-800
                    transition
                  "
                >
                  Agregar al carrito
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Menu;