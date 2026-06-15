interface AccessibilityWidgetProps {
  fontSize: number;
  setFontSize: (value: number | ((prev: number) => number)) => void;
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
}

function AccessibilityWidget({
  setFontSize,
  highContrast,
  setHighContrast,
}: AccessibilityWidgetProps) {
  const increaseFont = () => {
    setFontSize((prev) => prev + 2);
  };

  const decreaseFont = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  const toggleContrast = () => {
    setHighContrast(!highContrast);
  };

  const readPage = () => {
    window.speechSynthesis.cancel();

    const text = document.body.innerText;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "es-ES";
    speech.rate = 1;

    window.speechSynthesis.speak(speech);
  };

  const stopReading = () => {
    window.speechSynthesis.cancel();
  };

  return (
    <div className="fixed right-6 top-32 bg-white shadow-xl rounded-xl p-3 flex flex-col gap-2 z-50">
      <button
        onClick={readPage}
        className="bg-amber-700 text-white w-12 h-12 rounded-lg hover:bg-amber-800 transition"
      >
        🔊
      </button>

      <button
        onClick={stopReading}
        className="bg-amber-700 text-white w-12 h-12 rounded-lg hover:bg-amber-800 transition"
      >
        ⏸
      </button>

      <button
        onClick={increaseFont}
        className="bg-amber-700 text-white w-12 h-12 rounded-lg hover:bg-amber-800 transition"
      >
        A+
      </button>

      <button
        onClick={decreaseFont}
        className="bg-amber-700 text-white w-12 h-12 rounded-lg hover:bg-amber-800 transition"
      >
        A-
      </button>

      <button
        onClick={toggleContrast}
        className="bg-amber-700 text-white w-12 h-12 rounded-lg hover:bg-amber-800 transition"
      >
        ◐
      </button>
    </div>
  );
}

export default AccessibilityWidget;