import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts, type Product } from "../services/productService";
import { useCart } from "../context/useCart";

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  const stars: React.ReactNode[] = [];

  for (let i = 0; i < full; i++) {
    stars.push(
      <svg key={`f-${i}`} className="w-5 h-5 text-gold-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    );
  }

  if (half) {
    stars.push(
      <svg key="h" className="w-5 h-5 text-gold-500" viewBox="0 0 20 20" fill="currentColor">
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    );
  }

  for (let i = 0; i < empty; i++) {
    stars.push(
      <svg key={`e-${i}`} className="w-5 h-5 text-coffee-200" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    );
  }

  return stars;
}

function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      getProductById(id),
      getRelatedProducts(id),
    ]).then(([productData, relatedData]) => {
      setProduct(productData);
      if (productData) {
        setRelatedProducts(relatedData);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-coffee-600">Producto no encontrado</h1>
          <Link to="/productos" className="mt-4 inline-block text-gold-600 hover:text-gold-700 font-medium">
            Volver a productos
          </Link>
        </div>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
    }, quantity);
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-2 text-sm text-coffee-400 mb-10">
          <Link to="/" className="hover:text-gold-600 transition">Inicio</Link>
          <span>/</span>
          <Link to="/productos" className="hover:text-gold-600 transition">Productos</Link>
          <span>/</span>
          <span className="text-coffee-600 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <div className="animate-fade-in">
            <div className="rounded-2xl overflow-hidden bg-coffee-50 shadow-lg">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          <div className="animate-fade-in-up">
            <h1 className="text-4xl lg:text-5xl font-bold text-coffee-900 leading-tight">{product.name}</h1>
            <p className="text-3xl font-bold mt-4 text-gold-600">S/ {product.price}</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center">{renderStars(product.rating)}</div>
              <span className="text-sm text-coffee-400">{product.rating} / 5</span>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold text-coffee-900 mb-3">Descripción</h2>
              <p className="text-coffee-500 leading-relaxed">{product.description}</p>
            </div>

            {product.region && (
              <div className="mt-6">
                <h2 className="text-lg font-bold text-coffee-900 mb-3">Región</h2>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-coffee-50 text-coffee-700 text-sm font-medium">
                  <svg className="w-4 h-4 text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {product.region}
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className="font-bold text-coffee-900 mb-3">Cantidad</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="w-12 h-12 flex items-center justify-center bg-coffee-50 hover:bg-coffee-100 rounded-xl text-xl font-bold text-coffee-600 transition"
                >
                  -
                </button>
                <span className="font-bold text-xl w-8 text-center text-coffee-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center bg-coffee-50 hover:bg-coffee-100 rounded-xl text-xl font-bold text-coffee-600 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-coffee-700 hover:bg-coffee-800 text-white px-10 py-4 rounded-xl font-semibold transition shadow-lg shadow-coffee-900/20"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="bg-coffee-50 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-coffee-900 mb-10">También te puede interesar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link key={item.id} to={`/producto/${item.id}`} className="group">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-coffee-100">
                    <div className="aspect-[4/3] overflow-hidden bg-coffee-50">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-coffee-900">{item.name}</h3>
                      <p className="text-gold-600 font-bold mt-2">S/ {item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductoDetalle;
