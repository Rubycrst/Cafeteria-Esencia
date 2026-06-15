import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
};

function DashboardAdmin() {
  const [section, setSection] = useState("productos");

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Café Americano", price: 5 },
    { id: 2, name: "Capuccino", price: 7 },
  ]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);

  // CREATE / UPDATE
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price) return;

    if (editId) {
      // EDITAR
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editId ? { ...p, name, price: Number(price) } : p
        )
      );
      setEditId(null);
    } else {
      // CREAR
      const newProduct: Product = {
        id: Date.now(),
        name,
        price: Number(price),
      };

      setProducts([...products, newProduct]);
    }

    setName("");
    setPrice("");
  };

  // EDIT
  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(product.price);
    setEditId(product.id);
  };

  // DELETE
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-amber-900 text-white p-6 space-y-4">
        <h1 className="text-2xl font-bold mb-6">Admin ☕</h1>

        <button onClick={() => setSection("productos")} className="w-full text-left p-2 hover:bg-amber-800 rounded">
          Productos
        </button>

        <button onClick={() => setSection("pedidos")} className="w-full text-left p-2 hover:bg-amber-800 rounded">
          Pedidos
        </button>

        <button onClick={() => setSection("usuarios")} className="w-full text-left p-2 hover:bg-amber-800 rounded">
          Usuarios
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="flex-1 p-10">

        {/* PRODUCTOS CRUD */}
        {section === "productos" && (
          <div>

            <h2 className="text-3xl font-bold mb-6">Gestión de Productos</h2>

            {/* FORMULARIO */}
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 space-y-3">

              <input
                type="text"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border p-2 rounded"
              />

              <button className="bg-amber-700 text-white px-4 py-2 rounded">
                {editId ? "Actualizar" : "Agregar"}
              </button>

            </form>

            {/* TABLA */}
            <div className="bg-white p-4 rounded shadow">

              <table className="w-full">

                <thead>
                  <tr className="text-left border-b">
                    <th>Producto</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td>{p.name}</td>
                      <td>S/ {p.price}</td>

                      <td className="space-x-2">
                        <button
                          onClick={() => handleEdit(p)}
                          className="bg-blue-500 text-white px-2 py-1 rounded"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleDelete(p.id)}
                          className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* OTRAS SECCIONES */}
        {section === "pedidos" && <h2>Pedidos aquí</h2>}
        {section === "usuarios" && <h2>Usuarios aquí</h2>}

      </main>

    </div>
  );
}

export default DashboardAdmin;