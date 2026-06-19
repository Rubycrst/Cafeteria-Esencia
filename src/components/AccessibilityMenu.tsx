import { useState, useCallback, useRef, useEffect } from "react";
import { useAccessibility } from "../context/AccessibilityContext";

function AccessibilityMenu() {
  const { fontSize, setFontSize, highContrast, setHighContrast, readingMode, setReadingMode } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const increaseFont = useCallback(() => {
    setFontSize((prev) => prev + 2);
  }, [setFontSize]);

  const decreaseFont = useCallback(() => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  }, [setFontSize]);

  const toggleContrast = useCallback(() => {
    setHighContrast(!highContrast);
  }, [highContrast, setHighContrast]);

  const toggleReadingMode = useCallback(() => {
    setReadingMode(!readingMode);
  }, [readingMode, setReadingMode]);

  const readPage = useCallback(() => {
    window.speechSynthesis.cancel();
    const text = document.body.innerText;
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "es-ES";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
    setIsOpen(false);
  }, []);

  const stopReading = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsOpen(false);
  }, []);

  return (
    <>
      {readingMode && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-coffee-700 text-white px-5 py-2 rounded-full shadow-lg text-sm font-medium animate-fade-in pointer-events-none">
          Modo lectura — haz clic en cualquier texto para escucharlo
        </div>
      )}

      <div ref={menuRef} className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition text-sm font-medium ${
            readingMode
              ? "bg-gold-500 text-white"
              : "hover:bg-coffee-100 text-coffee-600"
          }`}
          aria-label="Accesibilidad"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">Accesibilidad</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-coffee-100 p-3 z-50 animate-scale-in">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-coffee-400 uppercase tracking-wider px-2">Tamaño de texto</p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={decreaseFont}
                  className="flex-1 py-2 rounded-lg bg-coffee-50 hover:bg-coffee-100 transition text-sm font-medium text-coffee-600"
                >
                  A-
                </button>
                <span className="w-12 text-center text-sm font-bold text-coffee-700">{fontSize}px</span>
                <button
                  onClick={increaseFont}
                  className="flex-1 py-2 rounded-lg bg-coffee-50 hover:bg-coffee-100 transition text-sm font-medium text-coffee-600"
                >
                  A+
                </button>
              </div>

              <hr className="my-2 border-coffee-100" />

              <p className="text-xs font-semibold text-coffee-400 uppercase tracking-wider px-2">Contraste</p>
              <button
                onClick={toggleContrast}
                className={`w-full py-2 rounded-lg transition text-sm font-medium ${
                  highContrast
                    ? "bg-coffee-900 text-white"
                    : "bg-coffee-50 hover:bg-coffee-100 text-coffee-600"
                }`}
              >
                {highContrast ? "Alto contraste ON" : "Alto contraste OFF"}
              </button>

              <hr className="my-2 border-coffee-100" />

              <p className="text-xs font-semibold text-coffee-400 uppercase tracking-wider px-2">Lectura de pantalla</p>
              <button
                onClick={toggleReadingMode}
                className={`w-full py-2 rounded-lg transition text-sm font-medium ${
                  readingMode
                    ? "bg-gold-500 text-white"
                    : "bg-coffee-50 hover:bg-coffee-100 text-coffee-600"
                }`}
              >
                {readingMode ? "Modo lectura ON" : "Modo lectura (clic para leer)"}
              </button>
              <button
                onClick={readPage}
                className="w-full py-2 rounded-lg bg-coffee-50 hover:bg-coffee-100 transition text-sm font-medium text-coffee-600"
              >
                Leer toda la página
              </button>
              <button
                onClick={stopReading}
                className="w-full py-2 rounded-lg bg-red-50 hover:bg-red-100 transition text-sm font-medium text-red-600"
              >
                Detener
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AccessibilityMenu;
