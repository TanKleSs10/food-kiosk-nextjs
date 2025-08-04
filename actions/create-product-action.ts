"use server";

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function createProductAction(data: unknown) {
  const res = ProductSchema.safeParse(data);
  if (!res.success) {
    return {
      errors: res.error.issues,
    };
  }

  await prisma.product.create({
    data: res.data,
  });
}
