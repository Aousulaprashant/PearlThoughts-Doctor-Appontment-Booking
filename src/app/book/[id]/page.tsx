"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DoctorDetailPage() {
  const router = useRouter();
  type Doctor = {
  id: number | string;
  name: string;
  image: string;
  specialization: string;
  degree: string;
  patients: number;
  experience: number;
  rating: number;
  reviews: number;
  about: string;
  service: string;
  availability?: {
    days: string;
    time: string;
  };
};

  const params = useParams();
  const docId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    if (!docId) return;
    fetch(`http://localhost:5000/doctors/${docId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Doctor not found");
        return res.json();
      })
      .then((data) => setDoctor(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [docId]);

  if (!doctor) {
    return <div className="p-6 text-gray-500">Loading doctor details...</div>;
  }

  const handleBookClick = () => {
    router.push(`/book/${docId}/appointment`);
  };

  return (
    <div className=" text-black bg-white ">
        
        <div className="min-h-screen bg-white shadow-2xl pb-24 w-[450px] max-w-full mx-auto ">
        <div className="bg-cyan-400 text-white h-[70px]  rounded-bl-2xl mb-[-2px]"></div>

      <div className="bg-white  rounded-xl mx-3 mt-[-55px] p-4 flex items-center gap-4 shadow mb-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-[6rem] h-[6rem] object-cover rounded-md"
        />
        <div>
          <h3 className="font-bold">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
          <p className="text-xs text-gray-400">{doctor.degree}</p>
        </div>
      </div>

        <div className="grid grid-cols-2 gap-4 text-center text-sm mb-4">
            <div>
            <p className="font-bold text-cyan-600">{doctor.patients}</p>
            <p className="text-gray-500">patients</p>
            </div>
            <div>
            <p className="font-bold text-cyan-600">{doctor.experience}+ yrs</p>
            <p className="text-gray-500">experience</p>
            </div>
            <div>
            <p className="font-bold text-cyan-600">{doctor.rating}</p>
            <p className="text-gray-500">rating</p>
            </div>
            <div>
            <p className="font-bold text-cyan-600">{doctor.reviews}</p>
            <p className="text-gray-500">reviews</p>
            </div>
        </div>

        <div className="mb-4 px-[20px]">
            <h4 className="font-semibold">About Doctor</h4>
            <p className="text-sm text-gray-600">{doctor.about}</p>
        </div>

        <div className="mb-4 px-[20px]">
            <h4 className="font-semibold">Service & Specialization</h4>
            <p className="text-sm text-gray-600">Service: {doctor.service}</p>
            <p className="text-sm text-gray-600">Specialization: {doctor.specialization}</p>
        </div>

        <div className="mb-6 px-[20px]">
            <h4 className="font-semibold">Availability</h4>
            <p className="text-sm text-gray-600">{doctor.availability?.days} | {doctor.availability?.time}</p>
        </div>

        <button
            onClick={handleBookClick}
            className="w-[80%] mx-[40px] bg-cyan-400 text-white font-semibold py-3 rounded-md hover:bg-cyan-500 transition"
        >
            Book appointment
        </button>
        
        </div>
    </div>
  );
}
