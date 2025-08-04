"use client";

import { useStore } from "@/src/store";
import ProductDetails from "./ProductDetails";
import { useMemo } from "react";
import { formatCurrency } from "@/src/utils";
import { OrderSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { createOrderAction } from "@/actions/create-order-action";

export default function OrderSummary() {
  const order = useStore((state) => state.order);

  const total = useMemo(
    () => order.reduce((total, item) => total + item.quantity * item.price, 0),
    [order],
  );

  const clearCart = useStore((state) => state.clearCart);

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name")?.toString().toLowerCase(),
      total,
      orderProducts: order,
    };

    const res = OrderSchema.safeParse(data);
    if (!res.success) {
      res.error.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    const response = await createOrderAction(data);
    if (response?.errors) {
      response.errors.forEach((issue) => {
        toast.error(issue.message);
      });
    }

    toast.success("Pedido realizado correctamente");
    clearCart();
  };

  return (
    <aside className="md:w-64 lg:w-96 lg:h-screen lg:overflow-y-scroll p-5">
      <h1 className="text-4xl text-center font-black">Mi pedido</h1>
      {order.length === 0 ? (
        <p className="text-center my-10">El carrito esta vacío</p>
      ) : (
        <>
          <div className="mt-5">
            {order.map((item) => (
              <ProductDetails key={item.id} item={item} />
            ))}
          </div>

          <p className="text-1xl mt-20 text-center">
            total a pagar: {``}
            <span className="font-black">{formatCurrency(total)}</span>
          </p>
          <form className="w-full mt-10 space-y-5" action={handleCreateOrder}>
            <input
              type="text"
              placeholder="Tu nombre"
              className="bg-white border border-gray-200 p-2 w-full rounded"
              name="name"
            />
            <input
              type="submit"
              className="py-2 rounded uppercase bg-black w-full text-center cursor-pointer text-white font-bold"
              value="confirmar pedido"
            />
          </form>
        </>
      )}
    </aside>
  );
}
