import { products } from "../data/products";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useState } from "react";
import portada2 from "../img/portada2.jpg";

function Menu() {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="rounded-2xl bg-gradient-to-r from-amber-300 via-orange-200 to-rose-200 p-10 shadow-[0_24px_90px_rgba(249,115,22,0.12)]">
          <h1 className="text-4xl font-bold text-slate-900">Cafés por Región</h1>
          <p className="mt-3 text-slate-700">Explora nuestro catálogo de productos y encuentra tu favorito en un estilo más moderno y cuadrado.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="overflow-hidden rounded-2xl border border-amber-100 shadow-[0_24px_80px_rgba(245,158,11,0.12)]">
          <img src={portada2} alt="Portada menu" className="w-full h-[520px] object-cover" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10 rounded-2xl bg-white border border-amber-100 p-6 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-slate-700">Busca aquí para filtrar los productos por nombre.</p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full sm:w-80 rounded-full border border-amber-200 bg-white px-4 py-3 shadow-sm focus:border-amber-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group overflow-hidden rounded-lg border border-amber-100 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_45px_rgba(15,23,42,0.14)]">
              <Link to={`/producto/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="p-5">
                <h3 className="text-2xl font-semibold text-slate-900">{product.name}</h3>
                <p className="mt-3 text-slate-600 line-clamp-3">{product.description}</p>
                <p className="mt-5 text-xl font-bold text-amber-700">S/ {product.price}.00</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to={`/producto/${product.id}`}
                    className="rounded-lg bg-amber-600 px-4 py-2 text-white font-semibold transition hover:bg-amber-700"
                  >
                    Ver más
                  </Link>
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-lg border border-amber-600 px-4 py-2 text-amber-700 font-semibold transition hover:bg-amber-50"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Menu;