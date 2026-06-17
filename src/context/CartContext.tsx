import { createContext } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  total: number;
  clearCart: () => void;
  checkout: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);