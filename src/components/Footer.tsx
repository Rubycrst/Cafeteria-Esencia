function Footer() {
  return (
    <footer className="bg-coffee-900 text-coffee-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-lg bg-coffee-700 flex items-center justify-center text-lg">
                <svg className="w-5 h-5 text-coffee-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2 21V19H20V21H2ZM20 8V5H22V11H20V10H18V13C18 14.1 17.55 15.04 16.83 15.71C16.11 16.38 15.14 16.71 14.25 16.71H9.75C8.86 16.71 7.89 16.38 7.17 15.71C6.45 15.04 6 14.1 6 13V3H18V8H20ZM8 5V13C8 13.55 8.22 14.02 8.59 14.36C8.95 14.69 9.39 14.85 9.75 14.85H14.25C14.61 14.85 15.05 14.69 15.41 14.36C15.78 14.02 16 13.55 16 13V5H8Z"/>
                </svg>
              </span>
              <span className="text-lg font-bold text-white">Cafetería Esencia</span>
            </div>
            <p className="text-coffee-400 leading-relaxed max-w-md">
              Café para todos, accesibilidad para todos. Disfruta de una experiencia inclusiva y llena de sabor en cada visita.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-3 text-sm">
              {["Inicio", "Productos", "Menú", "Carrito"].map((link) => (
                <li key={link}>
                  <a
                    href={`/${link === "Inicio" ? "" : link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}
                    className="text-coffee-400 hover:text-gold-400 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-coffee-400">912 345 678</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-coffee-400">info@cafeteriaesencia.pe</span>
              </li>
              <li className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-gold-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-coffee-400">Lima, Perú</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-coffee-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-coffee-500">
            &copy; 2026 Cafetería Esencia. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4 text-coffee-500 text-sm">
            <a href="#" className="hover:text-gold-400 transition-colors">Términos</a>
            <span>·</span>
            <a href="#" className="hover:text-gold-400 transition-colors">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
