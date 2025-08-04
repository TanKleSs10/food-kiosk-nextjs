"use server";

import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function completeOrderAction(formData: FormData) {
  const data = {
    orderId: formData.get("order_id"),
  };

  const res = OrderIdSchema.safeParse(data);

  if (!res.success) {
    console.error("Validation error:", res.error);
    return;
  }

  try {
    await prisma.order.update({
      where: {
        id: res.data.orderId,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });
    revalidatePath("/admin/orders");
  } catch (error) {
    console.error("Error completing order:", error);
  }
}
