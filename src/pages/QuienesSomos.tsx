import { Link } from "react-router-dom";

function QuienesSomos() {
  return (
    <div className="min-h-screen bg-coffee-50/50">
      <div className="relative h-[50vh] bg-coffee-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/80 to-transparent" />
        <div className="relative h-full flex items-center justify-center text-center px-6">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Quiénes Somos</h1>
            <p className="text-coffee-200 text-lg max-w-xl mx-auto">
              Pasión por el café desde 2018
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-coffee-900 mb-6">Nuestra Historia</h2>
            <div className="space-y-4 text-coffee-600 leading-relaxed">
              <p>
                Cafetería Esencia nació en 2018 con una idea simple: ofrecer café de especialidad
                en un ambiente acogedor donde cada taza cuente una historia.
              </p>
              <p>
                Desde entonces, trabajamos directamente con pequeños productores de las regiones
                cafetaleras del Perú, seleccionando granos de la más alta calidad para llevarlos
                a tu mesa.
              </p>
              <p>
                Hoy somos un punto de encuentro para amantes del café, un espacio donde la
                tradición y la innovación se encuentran en cada preparación.
              </p>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80"
              alt="Nuestra cafetería"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          {[
            {
              title: "Misión",
              desc: "Ofrecer una experiencia única de café de especialidad, promoviendo el comercio justo y la sostenibilidad.",
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Visión",
              desc: "Ser la cafetería de referencia en Lima, reconocida por la calidad de nuestros productos y el calor de nuestro servicio.",
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
            },
            {
              title: "Valores",
              desc: "Calidad, sostenibilidad, cercanía con el productor y pasión por cada detalle en el servicio.",
              icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-8 shadow-sm border border-coffee-100 hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-xl bg-coffee-100 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-coffee-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-coffee-900 mb-3">{item.title}</h3>
              <p className="text-coffee-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <h2 className="text-3xl font-bold text-coffee-900 mb-6">¿Quieres probar nuestro café?</h2>
          <p className="text-coffee-500 mb-8 max-w-lg mx-auto">
            Te invitamos a visitarnos o hacer tu pedido en línea para disfrutar de la mejor experiencia de café desde casa.
          </p>
          <Link
            to="/productos"
            className="inline-flex items-center gap-2 px-8 py-4 bg-coffee-700 text-white rounded-xl font-semibold hover:bg-coffee-800 transition shadow-lg"
          >
            Ver nuestros productos
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuienesSomos;
