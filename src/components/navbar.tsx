"use client";

import { UserCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import useHamburgerMenuStore from "@/store/hamburger-menu-store";
import { Logo, SearchBar } from ".";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useHamburgerMenuStore();
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className='w-full h-20 flex justify-between items-center gap-5 bg-white border-b border-gray-200 px-5'>
      <div className='w-full hidden lg:flex'>
        <SearchBar />
      </div>
      {session?.user ? (
        <Link
          href={`/user/${session.user.id}`}
          className='p-2 rounded-full hover:bg-gray-50'
        >
          <Image
            src={session.user.image as string}
            alt='user-img'
            width={35}
            height={35}
            className='rounded-full'
          />
        </Link>
      ) : (
        <Link href={`${pathname}?auth_modal=y&variant=login`}>
          <UserCircle width={35} height={35} />
        </Link>
      )}
      <div className='flex items-center justify-center lg:hidden'>
        <Logo />
      </div>
      <div
        onClick={() => setIsMenuOpen(isMenuOpen ? false : true)}
        className='relative flex lg:hidden flex-col items-center justify-center gap-1 py-3 cursor-pointer'
      >
        <div
          className={`hamburger-menu ${
            isMenuOpen && "absolute rotate-45 right-0"
          }`}
        ></div>
        <div
          className={`hamburger-menu ${isMenuOpen && "absolute hidden"}`}
        ></div>
        <div
          className={`hamburger-menu ${
            isMenuOpen && "absolute -rotate-45 right-0"
          }`}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;
