import portada2 from "../img/portada2.jpg";
import { products } from "../data/products";
import { useState } from "react";

function Productos() {
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-amber-50 to-fuchsia-100 text-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden rounded-3xl bg-[#f3e7c0] p-10 text-black shadow-[0_30px_100px_rgba(156,136,100,0.18)] border border-[#e2d3ad]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),_transparent_35%)]" />
          <div className="relative">
            <p className="text-sm uppercase tracking-[0.35em] text-black/70">Catálogo Esencia</p>
            <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Productos con estilo y sabor</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-black/80">
              Explora nuestra carta con un diseño vibrante, botones definidos y tarjetas cuadradas que resaltan cada producto.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm border border-white/20">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-100/80">Fresco</p>
                <p className="mt-3 text-xl font-semibold">Cafés y postres</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm border border-white/20">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-100/80">Rápido</p>
                <p className="mt-3 text-xl font-semibold">Búsqueda instantánea</p>
              </div>
              <div className="rounded-2xl bg-white/15 p-5 backdrop-blur-sm border border-white/20">
                <p className="text-xs uppercase tracking-[0.35em] text-amber-100/80">Aesthetic</p>
                <p className="mt-3 text-xl font-semibold">Cards cuadradas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="overflow-hidden rounded-[2rem] border border-rose-100 shadow-[0_24px_80px_rgba(249,115,22,0.12)]">
          <img src={portada2} alt="Portada productos" className="w-full h-[460px] object-cover object-center" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        <div className="mb-10 rounded-[2rem] bg-white/95 border border-[#e2d3ad] p-6 shadow-[0_20px_50px_rgba(245,158,11,0.1)] backdrop-blur-sm">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-black font-semibold">Buscador de productos</p>
              <p className="mt-2 text-black/70">Filtra por nombre y encuentra tu favorito al instante.</p>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full sm:w-96 rounded-full border border-[#e2d3ad] bg-white/90 px-5 py-3 text-black shadow-sm transition focus:border-[#d5c49e] focus:outline-none focus:ring-4 focus:ring-[#f3e7c0]"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]"
            >
              <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
                <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-lg bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">{product.rating}★</span>
                  <span className="text-sm font-semibold text-slate-500">S/ {product.price}</span>
                </div>
                <h2 className="mt-5 text-2xl font-bold text-slate-900">{product.name}</h2>
                <p className="mt-3 text-slate-600 line-clamp-3">{product.description}</p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <button
                    onClick={(e) => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.classList.add("scale-95", "transition", "duration-150");
                      setTimeout(() => {
                        window.location.href = `/producto/${product.id}`;
                      }, 160);
                    }}
                    className="rounded-lg bg-[#f3e7c0] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e7d8b7]"
                  >
                    Ver más
                  </button>
                  <button className="rounded-lg border border-[#e2d3ad] bg-[#f3e7c0] px-4 py-3 text-sm font-semibold text-black transition hover:bg-[#e7d8b7]">
                    Añadir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productos;
