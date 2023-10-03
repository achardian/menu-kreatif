import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const { username, email, password, image } = await req.json();

  try {
    const emailData = prisma?.user.findFirst({
      where: {
        email,
      },
    });

    const usernameData = prisma?.user.findFirst({
      where: {
        username,
      },
    });

    const [emailExist, usernameExist] = await Promise.all([
      emailData,
      usernameData,
    ]);

    if (emailExist) {
      throw Error("Email alredy in use!");
    }

    if (usernameExist) {
      throw Error("Username already in use!");
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma?.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        image,
      },
    });

    return NextResponse.json("Successfully created new account!", {
      status: 201,
    });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json(err.message, { status: 500 });
  }
};
