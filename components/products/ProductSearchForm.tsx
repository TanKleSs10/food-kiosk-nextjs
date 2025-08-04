"use client";

import { SearchSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ProductSearchForm() {
  const router = useRouter();
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get("search"),
    };

    const res = SearchSchema.safeParse(data);

    if (!res.success) {
      res.error.issues.forEach((issue) => {
        toast.error(issue.message);
        return;
      });
    } else {
      router.push(`/admin/products/search?search=${res.data.search}`);
    }
  };

  return (
    <form action={handleSearchForm} className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Buscar Producto"
        className="p-2 placeholder-gray-400 bg-white w-full"
        name="search"
      />

      <input
        type="Submit"
        value="Buscar"
        className="bg-indigo-600 p-2 uppercase text-white cursor-pointer hover:bg-indigo-700 transition-colors ml-2"
      />
    </form>
  );
}
