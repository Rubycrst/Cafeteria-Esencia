import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories, filterProductsByQuery, type Product, type Category } from "../services/productService";

function Productos() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getProducts(),
      getCategories(),
    ]).then(([productsData, categoriesData]) => {
      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    });
  }, []);

  const byCategory = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category_id === selectedCategory);
  }, [products, selectedCategory]);

  const filtered = useMemo(
    () => filterProductsByQuery(byCategory, query),
    [byCategory, query]
  );

  const handleCategoryChange = useCallback((catId: string) => {
    setSelectedCategory((prev) => (prev === catId ? "" : catId));
    setQuery("");
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory("");
    setQuery("");
  }, []);

  const hasActiveFilters = selectedCategory || query;

  return (
    <div>
      <section className="relative py-20 bg-gradient-to-br from-coffee-800 via-coffee-700 to-coffee-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-sm uppercase tracking-[0.35em] text-gold-400 font-semibold mb-4">
              Catálogo Esencia
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Productos con estilo y sabor
            </h1>
            <p className="mt-4 text-lg text-coffee-200 max-w-2xl mx-auto">
              Explora nuestra carta con un diseño moderno que resalta cada producto.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg shadow-coffee-900/5 border border-coffee-100 p-6 space-y-5">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-coffee-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar por nombre, descripción o región..."
              className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-coffee-200 bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition text-base"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-coffee-100 transition text-coffee-400 hover:text-coffee-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                      active
                        ? "bg-coffee-700 text-white shadow-sm"
                        : "bg-coffee-50 text-coffee-600 hover:bg-coffee-100 border border-coffee-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-coffee-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-coffee-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-xl text-coffee-500 font-medium">No se encontraron productos</p>
            <p className="text-coffee-400 mt-2">Intenta con otro término de búsqueda o cambia de categoría.</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-3 bg-coffee-700 text-white rounded-xl font-semibold hover:bg-coffee-800 transition"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <div
                key={product.id}
                className={`group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-coffee-100 hover:-translate-y-1 animate-fade-in-up stagger-${(i % 3) + 1}`}
              >
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
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-gold-100 px-3 py-1 text-sm font-semibold text-gold-700">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69L9.049 2.927z" />
                      </svg>
                      {product.rating}
                    </span>
                    <span className="text-sm font-semibold text-coffee-500">S/ {product.price}</span>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-coffee-900">{product.name}</h2>
                  <p className="mt-2 text-coffee-500 text-sm line-clamp-2 leading-relaxed">{product.description}</p>

                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/producto/${product.id}`}
                      className="flex-1 rounded-xl bg-coffee-700 px-4 py-3 text-sm font-semibold text-white text-center hover:bg-coffee-800 transition"
                    >
                      Ver más
                    </Link>
                    <Link
                      to={`/producto/${product.id}`}
                      className="flex-1 rounded-xl border border-coffee-200 bg-coffee-50 px-4 py-3 text-sm font-semibold text-coffee-700 text-center hover:bg-coffee-100 transition"
                    >
                      Añadir
                    </Link>
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

export default Productos;
