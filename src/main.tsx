import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "./context/CartProvider";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AccessibilityProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
