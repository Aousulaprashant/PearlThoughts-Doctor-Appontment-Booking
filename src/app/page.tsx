"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) {
      router.push("/login"); // Redirect to login if user not found
    }
  }, []);

  return (
    <div className="text-black">
      {/* This is the app page content */}
      <h1 className="text-2xl font-bold">Welcome to the App Dashboard</h1>
    </div>
  );
}
