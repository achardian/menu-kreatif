import { NextResponse } from "next/server";

import prismaClient from "@/libs/prisma-client";

export const GET = async () => {
  try {
    const recipes = await prismaClient.recipe.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {}
};
