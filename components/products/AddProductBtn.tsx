"use client";

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductsBtnProps = {
  product: Product;
};
export default function AddProductsBtn({ product }: AddProductsBtnProps) {
  const addProduct = useStore((state) => state.addToCart);
  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      onClick={() => addProduct(product)}
    >
      Agregar
    </button>
  );
}
