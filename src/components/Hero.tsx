import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-amber-50 min-h-screen flex items-center justify-center">

      <div className="text-center max-w-3xl px-6">

        <h1 className="text-6xl font-bold text-amber-900">
          El mejor café para cada momento ☕
        </h1>

        <p className="mt-6 text-xl text-gray-700">
          Disfruta una experiencia inclusiva,
          accesible y llena de sabor.
        </p>

        <Link
          to="/menu"
          className="inline-block mt-8 bg-amber-700 text-white px-8 py-4 rounded-xl hover:bg-amber-800 transition"
        >
          Ver Menú
        </Link>

      </div>

    </section>
  );
}

export default Hero;