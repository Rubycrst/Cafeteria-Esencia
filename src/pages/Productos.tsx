import "./Productos.css";

function Productos() {
  const products = [
    {
      id: 1,
      name: "Café Americano",
      price: 5,
      description: "Clásico y reconfortante, ideal para cualquier momento.",
    },
    {
      id: 2,
      name: "Capuccino",
      price: 7,
      description: "Espumoso y cremoso, con un toque de canela.",
    },
    {
      id: 3,
      name: "Brownie de Chocolate",
      price: 6,
      description: "Dulce y húmedo, preparado con chocolate artesanal.",
    },
    {
      id: 4,
      name: "Cheesecake",
      price: 8,
      description: "Suave y cremoso, con una base de galleta crocante.",
    },
    {
      id: 5,
      name: "Latte Vainilla",
      price: 8,
      description: "Un latte dulce y aromático con crema de vainilla.",
    },
    {
      id: 6,
      name: "Sandwich de Pollo",
      price: 9,
      description: "Fresco y sabroso, perfecto para un almuerzo ligero.",
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-amber-900">Productos</h1>
          <p className="mt-3 text-gray-600">
            Aquí encontrarás todos nuestros productos disponibles. Elige tu favorito y haz tu pedido.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl bg-white p-6 shadow-lg transition hover:-translate-y-1"
            >
              <h2 className="text-2xl font-semibold text-amber-900">{product.name}</h2>
              <p className="mt-3 text-gray-600">{product.description}</p>
              <p className="mt-6 text-xl font-bold text-amber-700">S/ {product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;
