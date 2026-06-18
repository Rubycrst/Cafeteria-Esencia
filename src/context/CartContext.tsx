import { createContext } from "react";

export type Product = {
  id: string | number;
  name: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  clearCart: () => void;
  total: number;
};

export const CartContext = createContext<CartContextType | null>(null);
