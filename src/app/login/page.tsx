"use client"; // For App Router

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      alert("Please enter both fields.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/users?emailOrPhone=${emailOrPhone}&password=${password}`
      );
      const users = await res.json();

      if (users.length > 0) {
        alert("Login successful!");
        router.push(`/otp?login=${encodeURIComponent(emailOrPhone)}`);
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto">
          <img src="/Imgs/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-cyan-500 text-center">Shedula</h1>

        {/* Input: Email or Phone */}
        <div>
          <label className="block text-black text-sm font-medium mb-1">Mobile / Email</label>
          <input
            type="text"
            placeholder="Enter your Mobile or Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full border text-black border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Input: Password */}
        <div>
          <label className="block  text-black text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full  text-black border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center text-sm">
          <label className="flex  text-black items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="accent-cyan-500"
            />
            Remember Me
          </label>
          <button className="text-red-500 hover:underline">Forgot Password</button>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-cyan-400 text-white font-semibold py-2 rounded-md hover:bg-cyan-500 transition"
        >
          Login
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-200" />
          Or login With
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Login */}
        <button className="w-full flex text-black justify-center items-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Signup Prompt */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-cyan-500 font-medium hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
