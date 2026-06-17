import { useNavigate } from "react-router-dom";
import portada from "../img/portada.jpg";
import foto1 from "../img/foto1.jpg";
import destacado1 from "../img/destacado1.jpg";
import destacado2 from "../img/destacado2.jpg";
import destacado3 from "../img/destacado3.jpg";
import "./Inicio.css";

function Inicio() {
  const navigate = useNavigate();

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

  const featured = [
    {
      id: 1,
      name: "Cappuccino Premium",
      price: "S/ 12.90",
      img: destacado1,
    },
    {
      id: 2,
      name: "Torta de Vainilla",
      price: "S/ 15.90",
      img: destacado2,
    },
    {
      id: 3,
      name: "Mocaccino",
      price: "S/ 14.50",
      img: destacado3,
    },
  ];

  const goToMenu = () => {
    navigate("/menu");
  };

  const goToProductos = () => {
    navigate("/productos");
  };

  return (
    <div className="bg-amber-50">
      <section className="relative">
        <img
          src={portada}
          alt="Portada Cafetería Esencia"
          className="h-[75vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200 font-semibold mb-4">
              Bienvenido a Cafetería Esencia
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Sabores auténticos para cada momento del día
            </h1>
            <p className="mt-5 text-lg md:text-xl text-amber-100 max-w-2xl mx-auto">
              Disfruta postres, cafés especiales y bebidas frescas en un espacio acogedor.
            </p>
            <button
              onClick={goToMenu}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-amber-600 px-8 py-3 text-white font-semibold shadow-lg shadow-amber-900/30 hover:bg-amber-700 transition"
            >
              Ver Menú
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900">
            Lo que hay hoy
          </h2>
          <p className="mt-3 text-gray-600">
            Descubre nuestras categorías de postres, café, bebidas y desayunos.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-3xl border border-amber-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-amber-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-amber-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="rounded-[2rem] overflow-hidden shadow-2xl">
            <img
              src={foto1}
              alt="Por qué elegirnos"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="rounded-[2rem] bg-white p-10 shadow-2xl">
            <span className="inline-block rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 uppercase tracking-[0.15em]">
              Por qué elegirnos
            </span>
            <h2 className="mt-6 text-3xl font-bold text-amber-900">
              Experiencia, sabor y atención con calidez
            </h2>
            <p className="mt-5 text-gray-600 leading-8">
              En Cafetería Esencia combinamos ingredientes frescos, recetas artesanales y un ambiente acogedor. Cada bebida y postre se prepara con cuidado para que disfrutes un momento único.
            </p>
            <ul className="mt-8 space-y-4 text-gray-700">
              <li>• Café de origen y tostado equilibrado.</li>
              <li>• Postres caseros hechos a diario.</li>
              <li>• Atención amable y servicio rápido.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold">
                  Productos destacados
                </p>
                <h2 className="mt-3 text-4xl font-bold text-amber-900">
                  Sabor que conquista
                </h2>
              </div>
              <p className="max-w-xl text-gray-600">
                Descubre nuestros favoritos del momento con el toque especial de la casa.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {featured.map((product) => (
                <button
                  key={product.id}
                  onClick={goToMenu}
                  className="group overflow-hidden rounded-3xl bg-white shadow-xl transition hover:-translate-y-1"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="p-6 text-left">
                    <h3 className="text-2xl font-semibold text-amber-900">
                      {product.name}
                    </h3>
                    <p className="mt-3 text-gray-600">{product.price}</p>
                    <p className="mt-4 text-amber-700 font-semibold">
                      Haz clic para ver menú →
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <aside className="rounded-[2rem] border border-amber-200 bg-white p-10 shadow-2xl flex flex-col justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold">
                Más productos
              </p>
              <h3 className="mt-5 text-3xl font-bold text-amber-900">
                Explora todo nuestro catálogo
              </h3>
              <p className="mt-5 text-gray-600 leading-7">
                Visita la página de productos para ver toda la carta completa. Encontrarás cafés, dulces y bebidas para cada momento.
              </p>
            </div>
            <button
              onClick={goToProductos}
              className="mt-8 rounded-full bg-amber-700 px-8 py-4 text-white font-semibold shadow-lg shadow-amber-900/20 hover:bg-amber-800 transition"
            >
              Ver más productos
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
