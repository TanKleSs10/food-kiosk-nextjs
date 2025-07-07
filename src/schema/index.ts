import z from "zod";

const OrderProductsSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  subtotal: z.number(),
});

export const OrderSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  total: z.number().min(1, "Hubo un error en la order, valida tus productos"),
  orderProducts: z.array(OrderProductsSchema).min(1, "El carrito esta vacío"),
});
