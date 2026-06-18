import { useState, useEffect, useCallback } from "react";
import { supabase } from "../utils/supabase";

type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image_url: string;
  is_available: boolean;
};

function DashboardAdmin() {
  const [section, setSection] = useState("productos");
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (section === "productos") {
      supabase
        .from("products")
        .select("id, name, price, description, image_url, is_available")
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setProducts(data as Product[]);
        });
    }
  }, [section]);

  const resetForm = useCallback(() => {
    setName("");
    setPrice("");
    setDescription("");
    setImageUrl("");
    setEditId(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    if (editId) {
      await supabase
        .from("products")
        .update({ name, price: Number(price), description, image_url: imageUrl })
        .eq("id", editId);
    } else {
      await supabase.from("products").insert({
        name,
        price: Number(price),
        description,
        image_url: imageUrl,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      });
    }

    resetForm();
    const { data } = await supabase
      .from("products")
      .select("id, name, price, description, image_url, is_available")
      .order("created_at", { ascending: false });
    if (data) setProducts(data as Product[]);
  };

  const handleEdit = (product: Product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImageUrl(product.image_url);
    setEditId(product.id);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-2 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span>☕</span> Admin
        </h1>

        {["productos", "pedidos", "usuarios"].map((s) => (
          <button
            key={s}
            onClick={() => setSection(s)}
            className={`w-full text-left px-4 py-3 rounded-xl transition font-medium ${
              section === s
                ? "bg-amber-700 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-10">
        {section === "productos" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Gestión de Productos</h2>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 space-y-4 max-w-xl">
              <input
                type="text"
                placeholder="Nombre del producto"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="number"
                placeholder="Precio"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <input
                type="text"
                placeholder="URL de imagen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <div className="flex gap-3">
                <button className="bg-amber-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-800 transition">
                  {editId ? "Actualizar" : "Agregar"}
                </button>
                {editId && (
                  <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl border border-gray-200 font-medium hover:bg-gray-50 transition">
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Producto</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Precio</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                        <td className="px-6 py-4 font-medium text-gray-900">{p.name}</td>
                        <td className="px-6 py-4 text-gray-600">S/ {p.price}</td>
                        <td className="px-6 py-4 space-x-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium hover:bg-red-100 transition text-sm"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                          No hay productos aún. Agrega el primero.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {section === "pedidos" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedidos</h2>
            <p className="text-gray-500">Gestión de pedidos próximamente.</p>
          </div>
        )}

        {section === "usuarios" && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Usuarios</h2>
            <p className="text-gray-500">Gestión de usuarios próximamente.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardAdmin;
