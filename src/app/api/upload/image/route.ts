import axios from "axios";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const formData = await req.formData();

  formData.append("api_key", process.env.CLOUDINARY_API_KEY as string);
  formData.append("upload_preset", process.env.CLOUDINARY_PRESET as string);
  formData.append("folder", "menu-kreatif");

  try {
    const { data } = await axios.post(
      process.env.CLOUDINARY_URL as string,
      formData
    );

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json("Gagal mengunggah file gambar!", { status: 500 });
  }
};
