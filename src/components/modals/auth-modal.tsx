"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader, X } from "lucide-react";
import { signIn } from "next-auth/react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import ToasterProvider from "@/providers/toaster-provider";
import { useMutation } from "react-query";

import { Logo } from "..";
import generateRandomAvatar from "@/libs/random-avatar";

const AuthModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const authModalParam = searchParams.get("auth_modal");
  const authVariantParam = searchParams.get("variant");
  const authModalRef = useRef<HTMLDialogElement | null>(null);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleUserData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      [e.target.name]: e.target.value,
    }));
  };

  const createUser = async () => {
    const avatar = generateRandomAvatar();
    const { data } = await axios.post("/api/auth/register", {
      ...userData,
      image: avatar,
    });

    return data;
  };

  const { isLoading, mutate } = useMutation(createUser, {
    onSuccess: (data) => {
      toast.success(data);
      setUserData({
        username: "",
        email: "",
        password: "",
      });
    },
    onError: (error) => {
      const err = error as AxiosError;
      toast.error(err.response?.data);
    },
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (authVariantParam === "register") {
      if (userData.username && userData.password && userData.email) {
        mutate();
      } else {
        toast.error("Make sure to fill all fields!");
      }
    }
  };

  useEffect(() => {
    if (authModalParam === "y") {
      authModalRef.current?.showModal();
    } else {
      authModalRef.current?.close();
    }
  }, [authModalParam]);

  return (
    <dialog
      ref={authModalRef}
      className={`relative w-full lg:w-1/2 p-5 rounded-md bg-white ${
        authModalParam === "y" ? "flex-center flex-col" : "hidden"
      }`}
    >
      <div className='flex-center flex-col gap-3'>
        <Logo />
        <h1 className='text-xl font-semibold'>
          Selamat Datang di Menu Kreatif!
        </h1>
        <h2 className='italic text-center'>
          Memasak dengan cinta, berbagi dengan dunia!
        </h2>
      </div>
      <div className='w-full mt-10 flex-center flex-col'>
        <form
          onSubmit={handleSubmit}
          className='w-full flex-center flex-col gap-3 mb-10'
        >
          {authVariantParam === "register" && (
            <input
              type='text'
              name='username'
              placeholder='username'
              className='auth-input'
              value={userData.username}
              onChange={handleUserData}
            />
          )}
          <input
            type='email'
            name='email'
            placeholder='email'
            className='auth-input'
            value={userData.email}
            onChange={handleUserData}
          />
          <input
            type='password'
            placeholder='password'
            className='auth-input'
            name='password'
            value={userData.password}
            onChange={handleUserData}
          />
          <button className='w-full lg:w-4/5 bg-lime-500 hover:bg-lime-400 rounded-full py-3 text-white font-bold flex-center gap-3'>
            {isLoading && <Loader />}
            {authVariantParam === "login" ? "Masuk" : "Daftar"}
          </button>
          <small>
            {authVariantParam === "login"
              ? "Belum punya akun?"
              : "Sudah punya akun?"}{" "}
            <Link
              href={`${pathname}?auth_modal=y&variant=register`}
              className='underline'
            >
              {authVariantParam === "login" ? "Daftar" : "Masuk"}
            </Link>
          </small>
        </form>
        <button
          type='button'
          className='flex-center gap-3 w-full lg:w-4/5 rounded-full py-3 border border-gray-200'
          onClick={() => signIn("google", { callbackUrl: pathname })}
        >
          <Image
            src='/google-icon.svg'
            alt='google icon'
            width={23}
            height={23}
          />
          Lanjutkan dengan google
        </button>
      </div>
      <Link
        href={pathname}
        className='absolute top-0 right-0 p-3 rounded-full hover:bg-gray-50'
      >
        <X />
      </Link>
      <ToasterProvider />
    </dialog>
  );
};

export default AuthModal;
