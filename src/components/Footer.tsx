function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
              <span>☕</span> Cafetería Esencia
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Café para todos, accesibilidad para todos. Disfruta de una experiencia inclusiva y llena de sabor.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-amber-400 transition">Inicio</a></li>
              <li><a href="/productos" className="hover:text-amber-400 transition">Productos</a></li>
              <li><a href="/carrito" className="hover:text-amber-400 transition">Carrito</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                912345678
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@cafeteriaesencia.pe
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          © 2026 Cafetería Esencia. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
