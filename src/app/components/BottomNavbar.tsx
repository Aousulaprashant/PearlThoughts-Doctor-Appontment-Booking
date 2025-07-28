"use client";
import { useRouter } from "next/navigation";
import { FaSearch, FaCalendarAlt, FaClipboard, FaUser } from "react-icons/fa";

export default function BottomNavbar({ selected }: { selected: "home" | "book" | "records" | "profile" }) {
  const router = useRouter();

  const navItems = [
    {
      key: "home",
      label: "Find a Doctor",
      icon: <FaSearch size={20} />,
      onClick: () => router.push("/"),
    },
    {
      key: "book",
      label: "Appointment",
      icon: <FaCalendarAlt size={20} />,
      onClick: () => alert("Appointments not implemented"),
    },
    {
      key: "records",
      label: "Records",
      icon: <FaClipboard size={20} />,
      onClick: () => alert("Records not implemented"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: <FaUser size={20} />,
      onClick: () => alert("Profile not implemented"),
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md flex justify-around py-2">
      {navItems.map((item) => {
        const isActive = selected === item.key;
        return (
          <button
            key={item.key}
            onClick={item.onClick}
            className={`flex flex-col items-center text-xs ${
              isActive ? "text-cyan-500 font-medium" : "text-black"
            }`}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
