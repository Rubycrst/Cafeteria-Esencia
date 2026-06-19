import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartProvider";
import { AccessibilityProvider } from "./context/AccessibilityContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AccessibilityProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AccessibilityProvider>
    </BrowserRouter>
  </StrictMode>
);
