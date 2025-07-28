"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OTPPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = searchParams.get("login") || ""; // Email or Phone passed from login page

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  // Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Input change handler
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next box
    if (value && index < 3) {
      const nextInput= document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // Verify dummy
  const handleVerify = () => {
    router.push("/home"); // Redirect to home
  };

  // Format login display
  const maskedLogin = login.includes("@")
    ? login.slice(0, 2) + "****" + login.slice(-4)
    : "+91 " + login.slice(0, 3) + " ******" + login.slice(-2);

  return (
    <div className="min-h-screen px-6 py-8 bg-white flex flex-col items-center">
      {/* Back & Title */}
      <div className="w-full max-w-sm text-black">
        <button onClick={() => router.back()} className="text-xl mb-4">←</button>
        <h1 className="text-lg font-semibold mb-3">OTP Code Verification</h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          Code has been sent to <span className="font-medium">{maskedLogin}</span>
        </p>

        {/* OTP Boxes */}
        <div className="flex justify-between mb-4 px-6 text-black">
          {otp.map((digit, i) => (
            <input
              key={i}
              id={`otp-${i}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              className={`w-12 h-12 text-center border rounded-lg text-xl focus:outline-none ${
                otp[i] ? "border-cyan-400" : "border-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Resend */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Resend code in <span className="text-blue-600 font-medium">{timer}s</span>
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="w-full bg-cyan-400 text-white text-lg font-medium py-2 rounded-lg hover:bg-cyan-500 transition mb-8"
        >
          Verify
        </button>
      </div>

      {/* Mobile-style Number Pad */}
      <div className="grid grid-cols-3 text-black gap-4 w-full max-w-xs">
        {[..."123456789*0⌫"].map((key, i) => (
          <button
            key={i}
            className="py-4 text-lg rounded-xl bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              if (key === "⌫") {
                const lastIndex = otp.findLastIndex((v) => v !== "");
                if (lastIndex >= 0) {
                  const newOtp = [...otp];
                  newOtp[lastIndex] = "";
                  setOtp(newOtp);
                }
              } else {
                const firstIndex = otp.findIndex((v) => v === "");
                if (firstIndex >= 0) {
                  const newOtp = [...otp];
                  newOtp[firstIndex] = key;
                  setOtp(newOtp);
                }
              }
            }}
          >
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
