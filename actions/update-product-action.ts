"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function updateProductAction(data: unknown, id: number) {
  const res = ProductSchema.safeParse(data);
  if (!res.success) {
    return {
      errors: res.error.issues,
    };
  }

  await prisma.product.update({
    data: res.data,
    where: { id },
  });
}
