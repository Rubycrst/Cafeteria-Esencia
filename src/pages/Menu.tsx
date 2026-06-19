import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { getProducts, filterProductsByQuery, type Product } from "../services/productService";
import { BANNER_MENU } from "../utils/storage";

function Menu() {
  const { addToCart } = useCart();
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filteredProducts = useMemo(
    () => filterProductsByQuery(products, query),
    [products, query]
  );

  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={BANNER_MENU} alt="Portada menú" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/80 to-coffee-900/40" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-gold-400 font-semibold mb-4">
              Nuestro Menú
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Cafés por Región
            </h1>
            <p className="mt-4 text-lg text-coffee-200 max-w-xl">
              Explora nuestro catálogo de productos y encuentra tu favorito.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-10 bg-white rounded-2xl shadow-sm border border-coffee-100 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-coffee-900 font-semibold">Buscar productos</p>
              <p className="text-sm text-coffee-400 mt-1">{filteredProducts.length} productos encontrados</p>
            </div>
            <div className="relative w-full sm:w-80">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-coffee-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-coffee-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-coffee-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-xl text-coffee-500 font-medium">No se encontraron productos.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-coffee-100 hover:-translate-y-1">
                <Link to={`/producto/${product.id}`}>
                  <div className="aspect-[4/3] overflow-hidden bg-coffee-50">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </Link>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-coffee-900">{product.name}</h3>
                  <p className="mt-2 text-coffee-500 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
                  <p className="mt-4 text-xl font-bold text-gold-600">S/ {product.price}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      to={`/producto/${product.id}`}
                      className="flex-1 rounded-xl bg-coffee-700 px-4 py-3 text-sm font-semibold text-white text-center hover:bg-coffee-800 transition"
                    >
                      Ver más
                    </Link>
                    <button
                      onClick={() => addToCart({ id: product.id, name: product.name, price: product.price, image: product.image_url })}
                      className="flex-1 rounded-xl border border-coffee-200 bg-coffee-50 px-4 py-3 text-sm font-semibold text-coffee-700 hover:bg-coffee-100 transition"
                    >
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Menu;
