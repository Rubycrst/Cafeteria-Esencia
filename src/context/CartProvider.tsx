import { useEffect, useState } from "react";
import { CartContext, type Product } from "./CartContext";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Product[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total }}>
      {children}
    </CartContext.Provider>
  );
}