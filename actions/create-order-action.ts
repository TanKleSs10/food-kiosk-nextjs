"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";

export async function createOrderAction(data: unknown) {
  const res = OrderSchema.safeParse(data);
  if (!res.success) {
    return {
      errors: res.error.issues,
    };
  }
  try {
    await prisma.order.create({
      data: {
        name: res.data.name,
        total: res.data.total,
        orderProducts: {
          create: res.data.orderProducts.map((product) => ({
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    });
  } catch (error) {
    console.error("Error al crear la orden:", error);
  }
}
