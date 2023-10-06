import axios from "axios";
import Image from "next/image";
import Link from "next/link";

import getHost from "@/libs/get-host";
import { Recipe } from "@prisma/client";

const getRecipes = async () => {
  const endpoint = getHost("/api/recipes");
  const { data } = await axios.get(endpoint);
  return data;
};

const Home = async () => {
  const recipes: Recipe[] = await getRecipes();

  return (
    <main className='grid grid-cols-1 lg:grid-cols-2 items-start gap-5 p-5'>
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className='rounded-md flex-center flex-col overflow-clip shadow-md pb-3'
        >
          <div className='relative w-full h-[300px]'>
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className='rounded-md hover:object-cover duration-200 ease-in'
            />
          </div>
          <Link
            href={`/recipe/${recipe.slug}`}
            className='text-xl text-gray-900 font-semibold mt-3 px-3'
          >
            {recipe.title}
          </Link>
          <div></div>
        </div>
      ))}
    </main>
  );
};

export default Home;
