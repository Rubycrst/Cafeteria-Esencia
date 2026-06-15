import { useState, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import AccessibilityWidget from "./components/AccessibilityWidget";

function App() {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
      <AppRoutes />

      <AccessibilityWidget
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />
    </div>
  );
}

export default App;