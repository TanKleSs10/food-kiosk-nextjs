import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
  order: OrderItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (id: Product["id"]) => void;
  decreaseQuantity: (id: Product["id"]) => void;
  removeFromCart: (id: Product["id"]) => void;
  clearCart: () => void;
}

export const useStore = create<Store>((set, get) => ({
  order: [],

  addToCart: (product) => {
    const { categoryId, image, ...rest } = product;

    let order: OrderItem[] = [];

    if (get().order.find((i) => i.id == product.id)) {
      order = get().order.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          };
        }
        return item;
      });
    } else {
      order = [
        ...get().order,
        { ...rest, quantity: 1, subtotal: 1 * rest.price },
      ];
    }

    set(() => ({
      order,
    }));
  },

  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
            subtotal: (item.quantity + 1) * item.price,
          };
        }

        return item;
      }),
    }));
  },

  decreaseQuantity: (id) => {
    const order = get().order.map((i) =>
      i.id == id
        ? {
            ...i,
            quantity: i.quantity - 1,
            subtotal: (i.quantity - 1) * i.price,
          }
        : i,
    );

    set(() => ({ order }));
  },

  removeFromCart: (id) => {
    set((state) => ({
      order: state.order.filter((item) => item.id !== id),
    }));
  },

  clearCart: () => {
    set(() => ({
      order: [],
    }));
  },
}));
