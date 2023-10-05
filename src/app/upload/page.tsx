"use client";

import { Loader } from "@/components";
import { difficulties, estimatedTimes, servings } from "@/constant";
import uploadImage from "@/libs/cloudinary-upload";
import generateSlug from "@/libs/generate-slug";
import axios, { AxiosError } from "axios";
import { ChefHat, Plus, Soup, Timer, UploadCloud, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, SyntheticEvent, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";

const Upload = () => {
  const { data: session } = useSession();
  const [imgUrl, setImgUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileSelected, setFileSelected] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [estimatedTime, setEstimatedTime] = useState(15);
  const [difficulty, setDifficulty] = useState("mudah");
  const [serving, setServing] = useState("1 porsi");

  const handleImgPreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    const fr = new FileReader();
    if (file) {
      fr.readAsDataURL(file[0]);
      setFileSelected(file[0]);
      fr.onload = (frEvent) => {
        setImgUrl(frEvent.target?.result as string);
      };
    }
  };

  const uploadRecipe = async () => {
    if (!fileSelected) return null;
    const slug = generateSlug(title);
    const image = await uploadImage(fileSelected);
    const { data } = await axios.post("/api/upload", {
      title,
      image,
      slug,
      ingredients,
      instructions,
      estimatedTime,
      difficulty,
      serving,
      tags,
      userId: session?.user.id,
    });

    return data;
  };

  const { isLoading, mutateAsync } = useMutation(uploadRecipe, {
    onSuccess: (data) => {
      toast.success(data);
    },
    onError: (error) => {
      const err = error as AxiosError;
      toast.error(err.response?.data as string);
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (
      title &&
      ingredients &&
      instructions &&
      estimatedTime &&
      difficulty &&
      serving &&
      tags
    ) {
      await mutateAsync();

      setTitle("");
      setImgUrl("");
      setEstimatedTime(15);
      setDifficulty("mudah");
      setServing("1 porsi");
      setTags([]);
      setIngredients([]);
      setInstructions([]);
    } else {
      toast.error("Pastikan untuk mengisi semua bidang formulir!");
    }
  };

  return (
    <main className='p-10'>
      <form
        onSubmit={handleSubmit}
        className='w-full lg:w-[60%] mx-auto flex flex-col gap-8'
      >
        <input
          type='text'
          placeholder='Judul'
          className='font-bold text-2xl upload-input'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          onChange={handleImgPreview}
          hidden
          type='file'
          accept='image/*'
          ref={fileInputRef}
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className='h-[340px] w-full bg-gray-50 rounded-md p-6'
        >
          <div className='relative cursor-pointer h-full w-full border-2 border-gray-200 border-dashed rounded-md flex-center'>
            {imgUrl ? (
              <Image
                src={imgUrl}
                alt='recipe-img'
                fill
                className='object-contain'
              />
            ) : (
              <div>
                <p className='text-gray-500'>
                  Klik disini untuk mengunggah gambar!
                </p>
              </div>
            )}
            {imgUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImgUrl("");
                }}
                className='rounded-full p-2 bg-gray-200 absolute top-0 right-0'
              >
                <X />
              </button>
            )}
          </div>
        </div>
        <div className='w-full'>
          <div className='flex flex-col bg-lime-300 '>
            {ingredients.map((item) => (
              <div
                key={item}
                className='flex justify-between items-center pl-2 border-b border-lime-500'
              >
                {item}
                <button
                  onClick={() =>
                    setIngredients(() =>
                      ingredients.filter((ingrdt) => ingrdt !== item)
                    )
                  }
                  className='text-lime-700 bg-lime-200 p-2'
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
          {/* ingredients */}
          <div className='flex mt-3'>
            <input
              type='text'
              placeholder='Bahan, contoh: 2.5 sdm garam'
              className='upload-input flex-1'
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <button
              type='button'
              className='p-2 bg-lime-600 hover:bg-lime-500 text-white rounded-md'
              onClick={() => {
                setIngredients((prevState) => [...prevState, ingredient]);
                setIngredient("");
              }}
            >
              <Plus />
            </button>
          </div>

          {/* instructions */}
          <div className='flex flex-col bg-lime-300 mt-6'>
            {instructions.map((item) => (
              <div
                key={item}
                className='flex justify-between items-center pl-2 border-b border-lime-500'
              >
                {item}
                <button
                  onClick={() =>
                    setInstructions(() =>
                      instructions.filter((step) => step !== item)
                    )
                  }
                  className='text-lime-700 bg-lime-200 p-2'
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
          <div className='flex mt-3'>
            <input
              type='text'
              placeholder='Cara membuat, contoh: Tuang air, masak hingga mendidih.'
              className='upload-input flex-1'
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
            />
            <button
              type='button'
              className='p-2 bg-lime-600 hover:bg-lime-500 text-white rounded-md'
              onClick={() => {
                setInstructions((prevState) => [...prevState, instruction]);
                setInstruction("");
              }}
            >
              <Plus />
            </button>
          </div>
        </div>

        <div className='flex justify-between flex-wrap gap-3'>
          {/* est time */}
          <div className='flex items-center gap-2'>
            <label className='text-lime-600'>
              <Timer />
            </label>
            <select
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(Number(e.target.value))}
              className='select-input'
            >
              {estimatedTimes.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>
          {/* diff */}
          <div className='flex items-center gap-2'>
            <label htmlFor='difficulty' className='text-lime-600'>
              <ChefHat />
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className='capitalize select-input'
            >
              {difficulties.map((difficulty) => (
                <option
                  key={difficulty}
                  value={difficulty}
                  className='capitalize'
                >
                  {difficulty}
                </option>
              ))}
            </select>
          </div>
          {/* servings */}
          <div className='flex items-center gap-2'>
            <label className='text-lime-600'>
              <Soup />
            </label>
            <select
              value={serving}
              onChange={(e) => setServing(e.target.value)}
              className='select-input'
            >
              {servings.map((serving) => (
                <option key={serving} value={serving}>
                  {serving}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='mt-10'>
          <div className='flex items-center flex-wrap gap-3'>
            {tags.map((item) => (
              <div className='flex-center gap-3 p-2 rounded-full bg-gray-100 capitalize'>
                {item}
                <button
                  type='button'
                  onClick={() =>
                    setTags((prevTags) =>
                      prevTags.filter((tag) => tag !== item)
                    )
                  }
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
          <div className='flex mt-3'>
            <input
              type='text'
              placeholder='Tambahkan tag, contoh: indonesian dish, ayam goreng'
              className='upload-input flex-1'
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <button
              type='button'
              className='p-2 bg-lime-600 hover:bg-lime-500 text-white rounded-md'
              onClick={() => {
                setTags((prevState) => [...prevState, tag.toLowerCase()]);
                setTag("");
              }}
            >
              <Plus />
            </button>
          </div>
        </div>

        <button
          type='submit'
          disabled={isLoading}
          className='py-2 px-5 flex-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-red-400 text-white rounded-full font-bold'
        >
          {isLoading && <Loader />}
          <UploadCloud />
          Unggah Resep
        </button>
      </form>
    </main>
  );
};

export default Upload;
