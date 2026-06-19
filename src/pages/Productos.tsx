import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, searchProducts, type Product } from "../services/productService";
import { BANNER_MENU } from "../utils/storage";

function Productos() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.trim()) {
      searchProducts(value).then(setProducts);
    } else {
      getProducts().then(setProducts);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-amber-50 to-fuchsia-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-amber-800 p-10 text-white shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900 opacity-90" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200 font-semibold">Catálogo Esencia</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Productos con estilo y sabor</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-amber-100">
              Explora nuestra carta con un diseño moderno que resalta cada producto.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="overflow-hidden rounded-[2rem] border border-rose-100 shadow-lg">
          <img src={BANNER_MENU} alt="Portada productos" className="w-full h-[460px] object-cover object-center" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-10 rounded-[2rem] bg-white/95 border border-gray-200 p-6 shadow-md backdrop-blur-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-gray-900 font-semibold">Buscador de productos</p>
              <p className="mt-2 text-gray-500">Filtra por nombre y encuentra tu favorito al instante.</p>
            </div>
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full sm:w-96 rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-900 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-xl text-gray-500">No se encontraron productos.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
                  <img src={product.image_url || BANNER_MENU} alt={product.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-lg bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">{product.rating}★</span>
                    <span className="text-sm font-semibold text-slate-500">S/ {product.price}</span>
                  </div>
                  <h2 className="mt-5 text-2xl font-bold text-slate-900">{product.name}</h2>
                  <p className="mt-3 text-slate-600 line-clamp-3">{product.description}</p>

                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    <Link
                      to={`/producto/${product.id}`}
                      className="rounded-lg bg-amber-700 px-4 py-3 text-sm font-semibold text-white text-center transition hover:bg-amber-800"
                    >
                      Ver más
                    </Link>
                    <Link
                      to={`/producto/${product.id}`}
                      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800 text-center transition hover:bg-amber-100"
                    >
                      Añadir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Productos;
