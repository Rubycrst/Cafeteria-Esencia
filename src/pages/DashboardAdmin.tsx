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

const sections = [
  { key: "productos", label: "Productos", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" },
  { key: "pedidos", label: "Pedidos", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { key: "usuarios", label: "Usuarios", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" },
] as const;

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
    <div className="min-h-screen flex bg-coffee-50/50">
      <aside className="w-64 bg-coffee-900 text-white p-6 space-y-2 flex flex-col flex-shrink-0">
        <div className="flex items-center gap-2.5 mb-10">
          <span className="w-9 h-9 rounded-lg bg-coffee-700 flex items-center justify-center">
            <svg className="w-5 h-5 text-coffee-200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 21V19H20V21H2ZM20 8V5H22V11H20V10H18V13C18 14.1 17.55 15.04 16.83 15.71C16.11 16.38 15.14 16.71 14.25 16.71H9.75C8.86 16.71 7.89 16.38 7.17 15.71C6.45 15.04 6 14.1 6 13V3H18V8H20Z" />
            </svg>
          </span>
          <span className="text-lg font-bold">Admin</span>
        </div>

        {sections.map((s) => (
          <button
            key={s.key}
            onClick={() => setSection(s.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm ${
              section === s.key
                ? "bg-gold-500 text-coffee-900"
                : "text-coffee-400 hover:text-white hover:bg-coffee-800"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={s.icon} />
            </svg>
            {s.label}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {section === "productos" && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-coffee-900">Gestión de Productos</h2>
              <span className="text-sm text-coffee-400">{products.length} productos</span>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-coffee-100 mb-8 space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-coffee-200 p-3 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition"
                />
                <input
                  type="number"
                  placeholder="Precio"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full border border-coffee-200 p-3 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition"
                />
              </div>
              <input
                type="text"
                placeholder="URL de imagen"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full border border-coffee-200 p-3 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition"
              />
              <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-coffee-200 p-3 rounded-xl bg-coffee-50/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-transparent text-coffee-900 placeholder-coffee-400 transition"
              />
              <div className="flex gap-3">
                <button className="bg-coffee-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-coffee-800 transition">
                  {editId ? "Actualizar" : "Agregar"}
                </button>
                {editId && (
                  <button type="button" onClick={resetForm} className="px-6 py-3 rounded-xl border border-coffee-200 font-medium text-coffee-600 hover:bg-coffee-50 transition">
                    Cancelar
                  </button>
                )}
              </div>
            </form>

            <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-coffee-50 border-b border-coffee-100">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-coffee-500">Producto</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-coffee-500">Precio</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-coffee-500">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id} className="border-b border-coffee-50 hover:bg-coffee-50/50 transition">
                        <td className="px-6 py-4 font-medium text-coffee-900">{p.name}</td>
                        <td className="px-6 py-4 text-coffee-500">S/ {p.price}</td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="px-4 py-2 rounded-lg bg-gold-50 text-gold-700 font-medium hover:bg-gold-100 transition text-sm"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-4 py-2 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition text-sm"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-12 text-center text-coffee-400">
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
          <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-coffee-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-coffee-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-coffee-900 mb-2">Pedidos</h2>
            <p className="text-coffee-400">Gestión de pedidos próximamente.</p>
          </div>
        )}

        {section === "usuarios" && (
          <div className="bg-white rounded-2xl shadow-sm border border-coffee-100 p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-coffee-50 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-coffee-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-coffee-900 mb-2">Usuarios</h2>
            <p className="text-coffee-400">Gestión de usuarios próximamente.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardAdmin;
