"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppointmentPage() {
  const { id } = useParams();
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
const [doctor, setDoctor] = useState<Doctor | null>(null);

  const [selectedDate, setSelectedDate] = useState("14");
  const [selectedSlot, setSelectedSlot] = useState("");

  const dates = [
    { day: "13", label: "MON" },
    { day: "14", label: "TUE" },
    { day: "16", label: "WED" },
    { day: "17", label: "WED" },
    { day: "18", label: "THU" },
  ];

  const morningSlots = [
    "09:30 AM - 09:45AM",
    "10:00 AM - 10:15AM",
    "10:30 AM - 10:45AM",
    "11:30 AM - 11:45AM",
    "12:00 PM - 12:15PM",
    "01:00 PM - 01:15PM",
  ];

  const eveningSlots = [
    "11:30 AM - 11:45AM",
    "12:00 PM - 12:15PM",
    "01:00 PM - 01:15PM",
  ];

  useEffect(() => {
    fetch(`http://localhost:5000/doctors/${id}`)
      .then((res) => res.json())
      .then(setDoctor)
      .catch(console.error);
  }, [id]);

  if (!doctor) {
    return <div className="p-6 text-gray-500">Loading appointment info...</div>;
  }

  return (
    <div className="bg-white  text-black flex flex-col">

    <div className="w-[450px] max-w-full mx-auto min-h-screen bg-white shadow-2xl ">
      {/* Header */}
      <div className="bg-cyan-400 text-white h-[70px]  rounded-bl-2xl mb-[-2px]">
        <h2 className="text-lg font-semibold text-center p-10px">Book Appointment</h2>
      </div>

      {/* Doctor Info Card */}
      <div className="bg-white rounded-xl mx-3 mt-[-45px] p-4 flex items-center gap-4 shadow mb-4">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-16 h-16 object-cover rounded-md"
        />
        <div>
          <h3 className="font-bold">{doctor.name}</h3>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
          <p className="text-xs text-gray-400">{doctor.degree}</p>
        </div>
      </div>
      

      {/* Date Picker */}
      <div className="mb-4 px-[20px]">
        <h4 className="text-sm font-semibold mb-2">Book Appointment</h4>
        <p className="text-xs text-gray-500 mb-2">Aug, 2025 </p>
        <div className="flex gap-2 overflow-x-auto">
          {dates.map((date) => (
            <button
              key={date.day}
              onClick={() => setSelectedDate(date.day)}
              className={`flex flex-col items-center border rounded-md  hover:bg-cyan-500 hover:text-white hover:border-cyan-500  px-3 py-2 text-sm ${
                selectedDate === date.day
                  ? "bg-cyan-400 text-white border-cyan-400"
                  : "text-gray-700 border-gray-300"
              }`}
            >
              <span className="font-bold">{date.day}</span>
              <span className="text-xs">{date.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Select Slot */}
      <h4 className="text-sm font-semibold mb-2 mt-4 px-[20px] ">Select slot</h4>
      <div className="grid grid-cols-2 px-[20px]  gap-2 mb-4">
        {morningSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`text-sm py-2 border px-[20px]  hover:bg-cyan-500 hover:text-white hover:border-cyan-500 rounded-md ${
              selectedSlot === slot
                ? "bg-cyan-500 text-white border-cyan-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      {/* Evening Slot */}
      <h4 className="text-sm font-semibold mb-2 px-[20px] mt-4">Evening Slot</h4>
      <div className="grid px-[20px]  grid-cols-2 gap-2 mb-6">
        {eveningSlots.map((slot) => (
          <button
            key={slot}
            onClick={() => setSelectedSlot(slot)}
            className={`text-sm px-[20px]  py-2 border  hover:bg-cyan-500 hover:text-white hover:border-cyan-500  rounded-md ${
              selectedSlot === slot
                ? "bg-cyan-500 text-white border-cyan-500"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {slot}
          </button>
        ))}
      </div>

      <button className="w-[80%] mx-[40px] bg-cyan-400 text-white py-3 rounded-md text-sm font-semibold hover:bg-cyan-500 transition">
        Book appointment
      </button>
      </div>
    </div>
  );
}
