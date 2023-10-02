"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Heart, Bookmark, PenSquare } from "lucide-react";

import { Logo } from ".";
import useHamburgerMenuStore from "@/store/hamburger-menu-store";

const Sidebar = () => {
  const links = [
    {
      title: "Beranda",
      path: "/",
      icon: Home,
    },
    {
      title: "Cari Resep",
      path: "/search",
      icon: Search,
    },
    {
      title: "Unggah Resep",
      path: "/upload",
      icon: PenSquare,
    },
    {
      title: "Resep Favorit",
      path: "/favorites",
      icon: Heart,
    },
    {
      title: "Resep Disimpan",
      path: "/bookmarks",
      icon: Bookmark,
    },
  ];

  const pathname = usePathname();
  const { isMenuOpen } = useHamburgerMenuStore();

  return (
    <aside
      className={`fixed top-0 h-screen z-50 w-[70%] lg:w-[20%] lg:translate-x-0 bg-white flex flex-col border-r border-gray-200 duration-200 ease-in-out ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className='py-3 px-5 border-b border-gray-200 h-20'>
        <Logo />
      </div>
      <div>
        {links.map((link) => (
          <Link
            href={link.path}
            key={link.path}
            className={`flex items-center gap-3 py-3 px-5 font-semibold text-gray-700 ${
              link.path === pathname ? "bg-lime-400" : "hover:bg-lime-300"
            }`}
          >
            <link.icon />
            {link.title}
          </Link>
        ))}
      </div>
      <Link
        href={`${pathname}?auth_modal=y&variant=login`}
        className='py-3 w-4/5 border border-lime-400 hover:bg-lime-500 text-gray-700 text-center rounded-full mx-auto mt-auto mb-16 font-semibold'
      >
        Masuk
      </Link>
    </aside>
  );
};

export default Sidebar;
