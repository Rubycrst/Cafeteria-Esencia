import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type AccessibilityContextType = {
  fontSize: number;
  highContrast: boolean;
  setFontSize: (value: number | ((prev: number) => number)) => void;
  setHighContrast: (value: boolean) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  return (
    <AccessibilityContext.Provider value={{ fontSize, highContrast, setFontSize, setHighContrast }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within AccessibilityProvider");
  }
  return context;
}
