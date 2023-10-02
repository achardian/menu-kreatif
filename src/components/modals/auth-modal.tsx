"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { signIn } from "next-auth/react";

import { Logo } from "..";

const AuthModal = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const authModalParam = searchParams.get("auth_modal");
  const authVariantParam = searchParams.get("variant");
  const authModalRef = useRef<HTMLDialogElement | null>(null);

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
        <form className='w-full flex-center flex-col gap-3 mb-10'>
          {authVariantParam === "register" && (
            <input type='text' placeholder='username' className='auth-input' />
          )}
          <input type='email' placeholder='email' className='auth-input' />
          <input
            type='password'
            placeholder='password'
            className='auth-input'
          />
          <button className='w-full lg:w-4/5 bg-lime-500 hover:bg-lime-400 rounded-full py-3 text-white font-bold'>
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
    </dialog>
  );
};

export default AuthModal;
