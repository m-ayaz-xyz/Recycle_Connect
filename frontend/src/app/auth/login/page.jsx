"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
// import { VENDORS, PICKUP_TIMES } from "@/lib/data";
import Link from "next/link";
import axios from "axios";
import api from "@/lib/api";
// import { cookies } from "next/headers";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // const token = cookies().get("token");
  // const payload = jwt.verify(token.value, SECRET);

  const login = async () => {
    try {
      const res = await api.post(
        "auth/login",

        {
          email,
          password,
        },
      );

      const user = res.data;

      if (user.role === "vendor") {
        router.push("/dashboard/vendor");
      } else {
        router.push("/dashboard/user");
      }
    } catch (error) {
      setMessage("Invalid email or password");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-10">
        <div className="bg-white border border-green-100 rounded-3xl p-8 w-full max-w-md shadow-sm">
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-400 hover:text-gray-700 mb-6 transition-colors"
          >
            ‹ Back
          </button>

          <h1
            className="text-2xl font-black text-gray-900 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Recycle Connect LogIn
          </h1>
          {message && (
            <div className="text-center text-red-500 text-md mt-4">
              {message}
            </div>
          )}
          {/* Form fields */}
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Submit */}
            <button
              onClick={login}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-base py-4 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-[1.02] mt-2"
            >
              Login
            </button>
          </div>
          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-green-500 font-bold">
              Sign Up
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-gray-400">
          Loading...
        </div>
      }
    >
      <Login />
    </Suspense>
  );
}
