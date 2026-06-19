import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getFeaturedProducts, type Product } from "../services/productService";
import { BANNER_HERO, BANNER_ABOUT } from "../utils/storage";

function Inicio() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then(setFeaturedProducts);
  }, []);

  const categories = [
    {
      title: "Postres",
      description: "Brownies, tortas y dulces caseros para cada antojo.",
    },
    {
      title: "Café",
      description: "Cafés de origen, lattes y especialidades hechas al momento.",
    },
    {
      title: "Bebidas",
      description: "Jugos, frappés y bebidas frías para acompañar tu pedido.",
    },
    {
      title: "Desayunos",
      description: "Opciones frescas y energéticas para comenzar tu día.",
    },
  ];

  return (
    <div className="bg-white">
      <section className="relative">
        <img
          src={BANNER_HERO}
          alt="Portada Cafetería Esencia"
          className="h-[75vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-300 font-semibold mb-4">
              Bienvenido a Cafetería Esencia
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Sabores auténticos para cada momento del día
            </h1>
            <p className="mt-5 text-lg md:text-xl text-amber-100/90 max-w-2xl mx-auto">
              Disfruta postres, cafés especiales y bebidas frescas en un espacio acogedor.
            </p>
            <button
              onClick={() => navigate("/productos")}
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition shadow-xl shadow-amber-900/30"
            >
              Ver nuestro menú
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold uppercase tracking-wider mb-4">
            Categorías
          </span>
          <h2 className="text-4xl font-bold text-gray-900">Lo que hay hoy</h2>
          <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
            Descubre nuestras categorías de postres, café, bebidas y desayunos.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center mb-5 group-hover:bg-amber-200 transition">
                <span className="text-2xl">
                  {category.title === "Postres" && "🍰"}
                  {category.title === "Café" && "☕"}
                  {category.title === "Bebidas" && "🥤"}
                  {category.title === "Desayunos" && "🥐"}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-500 leading-relaxed">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              src={BANNER_ABOUT}
              alt="Por qué elegirnos"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-2xl">
            <span className="inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800 uppercase tracking-wider">
              Por qué elegirnos
            </span>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Experiencia, sabor y atención con calidez
            </h2>
            <p className="mt-5 text-gray-600 leading-8">
              En Cafetería Esencia combinamos ingredientes frescos, recetas artesanales y un ambiente acogedor. Cada bebida y postre se prepara con cuidado para que disfrutes un momento único.
            </p>
            <ul className="mt-8 space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                Café de origen y tostado equilibrado.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                Postres caseros hechos a diario.
              </li>
              <li className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                Atención amable y servicio rápido.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-800 text-sm font-semibold uppercase tracking-wider mb-4">
              Destacados
            </span>
            <h2 className="text-4xl font-bold text-gray-900">Sabor que conquista</h2>
            <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
              Descubre nuestros favoritos del momento con el toque especial de la casa.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredProducts.slice(0, 3).map((product) => (
              <Link
                key={product.id}
                to={`/producto/${product.id}`}
                className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                  <p className="text-amber-700 font-bold mt-2">S/ {product.price}.00</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate("/productos")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-amber-700 text-white rounded-full font-semibold hover:bg-amber-800 transition shadow-lg shadow-amber-900/20"
            >
              Ver todos los productos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default Inicio;
