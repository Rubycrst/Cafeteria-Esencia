import destacado1 from "../img/destacado1.jpg";
import destacado2 from "../img/destacado2.jpg";
import destacado3 from "../img/destacado3.jpg";

function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Cappuccino",
      price: "S/ 12.90",
      image: destacado1,
    },
    {
      id: 2,
      name: "Latte",
      price: "S/ 13.90",
      image: destacado2,
    },
    {
      id: 3,
      name: "Americano",
      price: "S/ 10.90",
      image: destacado3,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-amber-900 mb-12">
          Productos Destacados
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold">{product.name}</h3>
                <p className="text-amber-700 font-bold mt-2">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
