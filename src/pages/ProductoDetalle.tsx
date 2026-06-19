import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, getRelatedProducts, type Product } from "../services/productService";
import { useCart } from "../context/useCart";
import { BANNER_MENU } from "../utils/storage";

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  const stars: any[] = [];

  for (let i = 0; i < full; i++) {
    stars.push(
      <svg key={`f-${i}`} className="w-5 h-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.176c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.176a1 1 0 00.95-.69L9.049 2.927z" />
      </svg>
    );
  }

  if (half) {
    stars.push(
      <svg key="h" className="w-5 h-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
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
      <svg key={`e-${i}`} className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
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
    setLoading(true);
    getProductById(id).then((data) => {
      setProduct(data);
      if (data) {
        getRelatedProducts(data.id).then(setRelatedProducts);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-600">Producto no encontrado</h1>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || BANNER_MENU,
    }, quantity);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <img
              src={product.image_url || BANNER_MENU}
              alt={product.name}
              className="w-full rounded-xl shadow-lg object-cover aspect-square"
            />
          </div>

          <div>
            <h1 className="text-5xl font-bold text-amber-900">{product.name}</h1>
            <p className="text-3xl font-semibold mt-4 text-gray-900">S/ {product.price}.00</p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center text-amber-500">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-500">{product.rating} / 5</span>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {product.region && (
              <div className="mt-6">
                <h2 className="text-2xl font-bold mb-3 text-gray-900">Región</h2>
                <p className="text-gray-600">{product.region}</p>
              </div>
            )}

            <div className="mt-10">
              <p className="font-bold mb-3 text-gray-900">Cantidad</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl text-xl font-bold text-gray-700 transition"
                >
                  -
                </button>
                <span className="font-bold text-xl w-8 text-center text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl text-xl font-bold text-gray-700 transition"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="mt-8 w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-xl font-semibold transition shadow-lg shadow-amber-900/20"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-amber-900 mb-10">También te puede interesar</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {relatedProducts.map((item) => (
              <Link key={item.id} to={`/producto/${item.id}`}>
                <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition">
                  <img
                    src={item.image_url || BANNER_MENU}
                    alt={item.name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-amber-800 font-bold mt-2">S/ {item.price}.00</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductoDetalle;
