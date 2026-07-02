

"use client";

import api from "@/lib/api";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ userName, email, role }) {
  const pathname = usePathname();
  const router = useRouter();

  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setProfileOpen(false);
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="sticky top-0 z-[1000] bg-white border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">

        {/* Logo */}
        <Link
          href={userName ? "/dashboard" : "/"}
          className="text-xl font-black text-gray-900 hover:text-green-600 transition-colors"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Recycle Connect
        </Link>

        {/* ================= Desktop ================= */}

        <div className="hidden md:flex items-center gap-8">
          <Link
            href={userName ? role ==="user" ? "/dashboard/user" : "/dashboard/vendor" : "/"}
            className={`text-sm font-medium ${
              pathname === "/dashboard" || pathname === "/"
                ? "text-green-600"
                : "text-gray-500"
            } hover:text-green-600`}
          >
            Home
          </Link>

          <Link
            href="#tips"
            className="text-sm font-medium text-gray-500 hover:text-green-600"
          >
            Recycling Tips
          </Link>

          <Link
            href="#"
            className="text-sm font-medium text-gray-500 hover:text-green-600"
          >
            Support
          </Link>

          {userName && (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center hover:bg-green-200"
              >
                👤
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white border rounded-xl shadow-xl z-[9999] overflow-hidden">
                  <DropdownContent
                    userName={userName}
                    email={email}
                    role={role}
                    handleLogout={handleLogout}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= Mobile ================= */}

        <div className="md:hidden">
          {userName ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full bg-green-100 border-2 border-green-400 flex items-center justify-center"
              >
                👤
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white border rounded-xl shadow-xl z-[9999] overflow-hidden">
                  <DropdownContent
                    userName={userName}
                    email={email}
                    role={role}
                    handleLogout={handleLogout}
                  />
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-green-600 font-semibold"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

function DropdownContent({
  userName,
  email,
  role,
  handleLogout,
}) {
  return (
    <div className="p-5">

      <div className="flex flex-col items-center gap-2 text-center">

        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
          👤
        </div>

        <div className="font-semibold">
          {userName}
        </div>

        <div className="text-xs text-gray-400">
          {email}
        </div>

        {role === "user" && (
          <Link
            href="/dashboard/user/orders"
            className="text-blue-500 text-xs"
          >
            Order History
          </Link>
        )}

        <button
          onClick={handleLogout}
          className="mt-2 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>

      </div>

      <div className="flex justify-center gap-3 mt-5 text-xs">
        <span className="text-blue-500 cursor-pointer hover:underline">
          Privacy Policy
        </span>

        <span>•</span>

        <span className="text-blue-500 cursor-pointer hover:underline">
          Terms of Service
        </span>
      </div>

    </div>
  );
}