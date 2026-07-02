"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
// import { VENDORS, PICKUP_TIMES } from "@/lib/data";
import Link from "next/link";
import axios from "axios";
import api from "@/lib/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [repassword, setRepassword] = useState("");
  const router = useRouter();

  const submit = async () => {
    await api.post("auth/signup", {
      name,
      email,
      password,
      role,
    });
    setName("");
    setEmail("");
    setPassword("");
    setRepassword("");
    setRole("user");
    router.push("/auth/login");
    // alert("Account Created");
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
            Recycle Connect Sign Up
          </h1>

          <p className="text-red-500 pb-3">
            {password !== repassword && "Passwords do not match"}
          </p>

          {/* Form fields */}
          <div className="flex flex-col gap-5">
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Name
              </label>
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

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

            {/* Re-enter Password */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Re-enter Password
              </label>
              <input
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block font-bold text-sm text-gray-800 mb-2">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
              >
                <option value="user">User</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            {/* Submit */}
            <button
              onClick={submit}
              disabled={password !== repassword}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black text-base py-4 rounded-full shadow-lg shadow-green-100 transition-all hover:scale-[1.02] mt-2"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-green-500 font-bold">
              Log In
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
      <Signup />
    </Suspense>
  );
}
