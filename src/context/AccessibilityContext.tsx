/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type AccessibilityContextType = {
  fontSize: number;
  highContrast: boolean;
  readingMode: boolean;
  setFontSize: (value: number | ((prev: number) => number)) => void;
  setHighContrast: (value: boolean) => void;
  setReadingMode: (value: boolean) => void;
};

const AccessibilityContext = createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [readingMode, setReadingMode] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [highContrast]);

  const handleReadClick = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const text = target.textContent?.trim();
    if (!text) return;

    e.preventDefault();
    e.stopPropagation();

    window.speechSynthesis.cancel();
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "es-ES";
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  }, []);

  useEffect(() => {
    if (readingMode) {
      document.addEventListener("click", handleReadClick, true);
      document.body.style.cursor = "pointer";
    } else {
      document.removeEventListener("click", handleReadClick, true);
      document.body.style.cursor = "";
      window.speechSynthesis.cancel();
    }
    return () => {
      document.removeEventListener("click", handleReadClick, true);
      document.body.style.cursor = "";
    };
  }, [readingMode, handleReadClick]);

  return (
    <AccessibilityContext.Provider value={{ fontSize, highContrast, readingMode, setFontSize, setHighContrast, setReadingMode }}>
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
