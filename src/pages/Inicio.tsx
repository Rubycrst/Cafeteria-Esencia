import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Inicio() {
  const navigate = useNavigate();

  const featured = [
    {
      id: 1,
      name: "Café Especial",
      price: 6,
      img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
    },
    {
      id: 2,
      name: "Torta de Chocolate",
      price: 9,
      img: "https://images.unsplash.com/photo-1601979031925-424e53b6caaa",
    },
    {
      id: 3,
      name: "Latte Cremoso",
      price: 7,
      img: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
    },
  ];

  const goToMenu = () => {
    navigate("/menu");
  };

  return (
    <>
      <Navbar />

      <main className="pt-20 bg-amber-50 min-h-screen">

        {/* HERO */}
        <section className="text-center py-16 px-6">
          <h1 className="text-5xl font-bold text-amber-900">
            Cafetería Esencia ☕
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Disfruta café de calidad, postres artesanales y un ambiente único
          </p>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="px-10">

          <h2 className="text-3xl font-bold mb-8 text-amber-900">
            Productos destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {featured.map((p) => (
              <div
                key={p.id}
                onClick={goToMenu}
                className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >

                {/* IMAGEN */}
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-48 w-full object-cover"
                />

                {/* INFO */}
                <div className="p-4">

                  <h3 className="text-xl font-bold">{p.name}</h3>

                  <p className="text-gray-600">S/ {p.price}</p>

                  <p className="text-amber-700 mt-2 font-semibold">
                    Click para ver menú →
                  </p>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* SOBRE NOSOTROS */}
        <section className="mt-16 bg-white py-12 px-6 text-center">

          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Sobre nosotros
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            En Cafetería Esencia nos dedicamos a ofrecer experiencias únicas
            con café artesanal, postres caseros y un ambiente acogedor para
            todos nuestros clientes.
          </p>

        </section>

      </main>
    </>
  );
}

export default Inicio;