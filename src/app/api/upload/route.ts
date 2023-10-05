import prismaClient from "@/libs/prisma-client";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const {
    title,
    image,
    slug,
    ingredients,
    instructions,
    estimatedTime,
    difficulty,
    serving,
    tags,
    userId,
  } = await req.json();

  try {
    await prismaClient.recipe.create({
      data: {
        userId,
        title,
        image,
        slug,
        ingredients,
        instructions,
        estimatedTime,
        difficulty,
        serving,
        tags,
      },
    });

    return NextResponse.json("Resep berhasil diunggah!", { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Gagal mengunggah resep!", { status: 500 });
  }
};
