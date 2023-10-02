import { AuthModal, Navbar, Sidebar } from "@/components";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menu Kreatif",
  description:
    "Menu Kreatif adalah sebuah web app untuk mencari dan berbagi resep masakan. Memasak dengan cinta, berbagi dengan dunia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Sidebar />
        <div className='ml-0 lg:ml-[20%]'>
          <Navbar />
          {children}
        </div>
        <AuthModal />
      </body>
    </html>
  );
}
