import { createContext } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
};

export type CartContextType = {
  cart: Product[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: number) => void;
  total: number;
};

export const CartContext = createContext<CartContextType | null>(null);