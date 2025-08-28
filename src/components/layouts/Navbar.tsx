"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { ListTodo, Menu } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo / Title */}
        <Link
          href="/"
          className="flex items-center text-white text-lg md:text-xl font-bold"
        >
          <ListTodo className="inline-block mr-2 h-6 w-6" />
          TODO-APP
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center">
          {session ? (
            <>
              {/* Greeting */}
              <span className="text-white font-medium">
                Hi, {session.user?.name || "User"} 👋
              </span>

              <Button
                className="bg-black/40 hover:bg-black/60 text-white cursor-pointer"
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              asChild
              className="bg-white text-pink-600 hover:bg-gray-100 cursor-pointer"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-3 bg-white/10 backdrop-blur-md p-4">
          {session ? (
            <>
              {/* Greeting */}
              <span className="text-white font-medium">
                Hi, {session.user?.name || "User"} 👋
              </span>

              <Button
                className="bg-black/40 hover:bg-black/60 text-white w-full cursor-pointer"
                onClick={async () => {
                  await signOut({ redirect: false });
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              asChild
              className="bg-white text-pink-600 hover:bg-gray-100 w-full cursor-pointer"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}
