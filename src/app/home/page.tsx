"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavbar from "../components/BottomNavbar";

export default function HomePage() {
  
  const router = useRouter();
  type Doctor = {
  id: string | number;
  name: string;
  specialization: string;
  image: string;
  // Add any other properties you use: degree, rating, etc.
};
const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch("https://json-mock-api-axzu.onrender.com/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data))
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, []);
  
  const handleDoctorClick = (id: number | string) => {
    router.push(`/book/${id}`);
  };

  return (
  
    <div className="min-h-screen bg-white px-4 py-6 pb-20">
      {/* Header */}
      <div className="mb-4  text-black">
        <h2 className="font-semibold text-lg">WellCome to <span className="font-bold text-cyan-500"> Shedula</span> </h2> 
        <p className="text-sm text-gray-500"> Dombivli, Mumbai</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Doctors"
          className="w-full  text-black rounded-xl px-4 py-2 shadow-sm focus:outline-none"
        />
      </div>

      {/* Doctor Cards */}
      <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {doctors.map((doc) => (
          <div
            key={doc.id}
            className="flex border max-w-[400px] rounded-xl  p-3 gap-4 shadow cursor-pointer"
            onClick={() => handleDoctorClick(doc.id)}
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className=" text-black">
              <h3 className="font-semibold text-lg">{doc.name}</h3>
              <p className="text-sm text-cyan-500">{doc.specialization}</p>
              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-md inline-block mt-1">
                Available
              </span>
              <p className="text-xs mt-1">10:00 AM – 5:00 PM</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <BottomNavbar selected="home" />
    </div>
   

  );
}
