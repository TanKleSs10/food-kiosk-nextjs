"use client";

import { createProductAction } from "@/actions/create-product-action";
import { ProductSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "react-toastify";

export default function AddProductForm({ children }: { children: ReactNode }) {
  const route = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
    };

    const res = ProductSchema.safeParse(data);
    console.log(res);
    if (!res.success) {
      res.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }
    const response = await createProductAction(res.data);
    if (response?.errors) {
      response.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
    toast.success("Producto registrado correctamente");
    route.push("/admin/products");
  };

  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form action={handleSubmit} className="space-y-5">
        {children}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          value="registrar producto"
        />
      </form>
    </div>
  );
}
