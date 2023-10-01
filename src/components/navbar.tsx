"use client";

import { UserCircle } from "lucide-react";

import useHamburgerMenuStore from "@/store/hamburger-menu-store";
import { Logo, SearchBar } from ".";

const Navbar = () => {
  const { isMenuOpen, setIsMenuOpen } = useHamburgerMenuStore();

  return (
    <nav className='w-full h-20 flex justify-between items-center gap-5 border-b border-gray-200 px-5'>
      <div className='flex items-center justify-center lg:hidden'>
        <Logo />
      </div>
      {/* search */}
      <SearchBar />
      {/* user-profile */}
      <UserCircle />
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
