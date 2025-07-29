"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!name || !emailOrPhone || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const checkRes = await fetch(
        `https://json-mock-api-axzu.onrender.com/users?emailOrPhone=${emailOrPhone}`
      );
      const existingUsers = await checkRes.json();
      if (existingUsers.length > 0) {
        alert("User already exists with this Mobile/Email.");
        return;
      }

      const res = await fetch("https://json-mock-api-axzu.onrender.com/users", {
        method: "POST",
        body: JSON.stringify({ name, emailOrPhone, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("Signup successful!");
        setName("");
        setEmailOrPhone("");
        setPassword("");
        setConfirmPassword("");
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <div className="w-24 h-24 mx-auto">
          <img src="/Imgs/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>

        <h1 className="text-2xl font-bold text-cyan-500 text-center">Shedula</h1>

        {/* Email or Phone */}
        <div>
          <label className="block text-sm text-black font-medium mb-1">Mobile / Email</label>
          <input
            type="text"
            placeholder="Enter your Mobile or Email"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full border text-black border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm text-black font-medium mb-1">Name</label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border text-black border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-black font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border text-black border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-black mb-1">Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border text-black border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full bg-cyan-400 text-white font-semibold py-2 rounded-md hover:bg-cyan-500 transition"
        >
          Sign Up
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-gray-200" />
          Or sign up With
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google Signup */}
        <button className="w-full text-black flex justify-center items-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Login Prompt */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-500 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
