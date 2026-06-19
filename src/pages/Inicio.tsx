import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getFeaturedProducts, type Product } from "../services/productService";
import { BANNER_HERO, BANNER_ABOUT } from "../utils/storage";

const categories = [
  { title: "Postres", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "bg-rose-50 text-rose-600" },
  { title: "Café", icon: "M2 21V19H20V21H2ZM20 8V5H22V11H20V10H18V13C18 14.1 17.55 15.04 16.83 15.71C16.11 16.38 15.14 16.71 14.25 16.71H9.75C8.86 16.71 7.89 16.38 7.17 15.71C6.45 15.04 6 14.1 6 13V3H18V8H20ZM8 5V13C8 13.55 8.22 14.02 8.59 14.36C8.95 14.69 9.39 14.85 9.75 14.85H14.25C14.61 14.85 15.05 14.69 15.41 14.36C15.78 14.02 16 13.55 16 13V5H8Z", color: "bg-amber-50 text-amber-600" },
  { title: "Bebidas", icon: "M17 5V3C17 2.45 16.55 2 16 2H8C7.45 2 7 2.45 7 3V5H3V15C3 16.1 3.9 17 5 17H19C20.1 17 21 16.1 21 15V5H17ZM7 5V3H17V5H7ZM5 15V7H19V15H5Z", color: "bg-sky-50 text-sky-600" },
  { title: "Desayunos", icon: "M20 3H4V5H20V3ZM4 8H20V10H4V8ZM18 13H20V18H18V13ZM4 13H16V18H4V13Z", color: "bg-orange-50 text-orange-600" },
];

function Inicio() {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    getFeaturedProducts().then(setFeaturedProducts);
  }, []);

  return (
    <div>
      <section className="relative h-[85vh] min-h-[500px]">
        <div className="absolute inset-0">
          <img
            src={BANNER_HERO}
            alt="Portada Cafetería Esencia"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-coffee-900/80 via-coffee-900/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl animate-fade-in-up">
            <p className="text-sm uppercase tracking-[0.3em] text-gold-400 font-semibold mb-5">
              Bienvenido a Cafetería Esencia
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1]">
              Sabores auténticos para cada momento del día
            </h1>
            <p className="mt-6 text-lg md:text-xl text-coffee-200 max-w-xl leading-relaxed">
              Disfruta postres, cafés especiales y bebidas frescas en un espacio acogedor pensado para ti.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/productos")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gold-500 text-coffee-900 rounded-xl font-bold hover:bg-gold-400 transition shadow-xl shadow-gold-500/25"
              >
                Ver nuestro menú
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-coffee-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold-100 text-gold-700 text-sm font-semibold uppercase tracking-wider mb-4">
              Categorías
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-coffee-900">Lo que hay hoy</h2>
            <p className="mt-4 text-coffee-500 max-w-2xl mx-auto text-lg">
              Descubre nuestras categorías de postres, café, bebidas y desayunos preparados con los mejores ingredientes.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat, i) => (
              <div
                key={cat.title}
                className={`group relative rounded-2xl bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up stagger-${i + 1}`}
              >
                <div className={`w-14 h-14 rounded-xl ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                    <path d={cat.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-coffee-900 mb-3">{cat.title}</h3>
                <p className="text-coffee-500 leading-relaxed text-sm">
                  {cat.title === "Postres" && "Brownies, tortas y dulces caseros para cada antojo."}
                  {cat.title === "Café" && "Cafés de origen, lattes y especialidades hechas al momento."}
                  {cat.title === "Bebidas" && "Jugos, frappés y bebidas frías para acompañar tu pedido."}
                  {cat.title === "Desayunos" && "Opciones frescas y energéticas para comenzar tu día."}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-400 to-gold-500 rounded-b-2xl scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <div className="relative animate-fade-in">
              <div className="rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src={BANNER_ABOUT}
                  alt="Por qué elegirnos"
                  className="h-full w-full object-cover aspect-[4/3]"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gold-500 -z-10 hidden lg:block" />
            </div>

            <div className="animate-fade-in-up stagger-2">
              <span className="inline-block rounded-full bg-gold-100 px-4 py-2 text-sm font-semibold text-gold-700 uppercase tracking-wider">
                Por qué elegirnos
              </span>
              <h2 className="mt-6 text-4xl font-bold text-coffee-900 leading-tight">
                Experiencia, sabor y atención con calidez
              </h2>
              <p className="mt-5 text-coffee-500 leading-relaxed text-lg">
                En Cafetería Esencia combinamos ingredientes frescos, recetas artesanales y un ambiente acogedor. Cada bebida y postre se prepara con cuidado para que disfrutes un momento único.
              </p>
              <ul className="mt-8 space-y-5">
                {[
                  "Café de origen y tostado equilibrado.",
                  "Postres caseros hechos a diario.",
                  "Atención amable y servicio rápido.",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-coffee-600">
                    <span className="w-2 h-2 rounded-full bg-gold-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="py-24 bg-coffee-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-gold-100 text-gold-700 text-sm font-semibold uppercase tracking-wider mb-4">
                Destacados
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-coffee-900">Sabor que conquista</h2>
              <p className="mt-4 text-coffee-500 max-w-2xl mx-auto text-lg">
                Descubre nuestros favoritos del momento con el toque especial de la casa.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {featuredProducts.slice(0, 3).map((product, i) => (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  className={`group rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden animate-fade-in-up stagger-${i + 1}`}
                >
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-coffee-900">{product.name}</h3>
                    <p className="text-coffee-500 text-sm mt-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-gold-600 font-bold text-lg">S/ {product.price}</p>
                      <span className="text-sm text-coffee-400 group-hover:text-gold-500 transition-colors font-medium">
                        Ver más →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/productos")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-coffee-700 text-white rounded-xl font-semibold hover:bg-coffee-800 transition shadow-lg"
              >
                Ver todos los productos
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Inicio;
