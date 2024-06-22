"use server";

import prisma from "@/lib/prisma";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  DeleteCategorySchema,
  DeleteCategorySchemaType,
} from "@/schema/category";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    return new Error(parsedBody.error.message);
  }

  const user = await currentUser();
  if (!user) {
    return redirect("/sign-in");
  }

  const { name, icon, type } = parsedBody.data;
  const category = await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });

  return category;
}

export async function DeleteCategory(form: DeleteCategorySchemaType) {
  const parsedBody = DeleteCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    return new Error(parsedBody.error.message);
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name: parsedBody.data.name,
        type: parsedBody.data.type,
      },
    },
  });
}
