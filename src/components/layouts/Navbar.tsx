"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { Lightbulb } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="w-full flex items-center justify-between p-4 border-b">
      {/* Logo / Title */}
      <Link href="/" className="text-lg font-bold">
        TODO-APP
      </Link>

      {/* Nav Links */}
      <div className="flex gap-4 items-center">
        <Button className="text-sm font-medium hover:underline">
          <Lightbulb className="mr-2 h-4 w-4" />
        </Button>

        {session ? (
          // ✅ If logged in → Show Logout
          <Button
            className="bg-gray-700 text-white"
            onClick={async () => {
              await signOut({ redirect: false }); // prevent auto redirect
              router.push("/"); // manually push to home
            }}
          >
            Logout
          </Button>
        ) : (
          // ✅ If not logged in → Show Login
          <Button asChild className="bg-[#eb0029] cursor-pointer">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
