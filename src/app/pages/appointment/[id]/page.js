'use client';

import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { BadgeCheck, Info } from "lucide-react";
import ReleatedDoctors from "@/components/RelatedDoctore";
import AboutUsSection from "../../about/page";

export default function Appointment() {
  const { doctors, currencySy } = useContext(AppContext);
  const { id: docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotsTime] = useState('');
const daysofweek= ['SUN','MON','TUE','WED','THU','FRI','SAT']
  // ⏰ Generate slots for 7 days
  const getAvailableSlots = async () => {
    const slots = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      const dateStart = new Date(currDate);
      const dateEnd = new Date(currDate);
      dateStart.setHours(i === 0 ? Math.max(today.getHours(), 10) : 10, 0, 0, 0);
      dateEnd.setHours(21, 0, 0, 0);

      const timeslots = [];
      const slotCursor = new Date(dateStart);

      while (slotCursor < dateEnd) {
        timeslots.push({
          datetime: new Date(slotCursor),
          time: slotCursor.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        slotCursor.setMinutes(slotCursor.getMinutes() + 30);
      }

      slots.push(timeslots);
    }

    setDocSlots(slots);
  };

  // Load doctor info
  useEffect(() => {
    if (doctors.length && docId) {
      const found = doctors.find((doc) => doc._id === docId);
      setDocInfo(found);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  if (!docInfo) {
    return <p className="text-center text-gray-500 p-8">Loading doctor information...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Doctor Image */}
        <div className="sm:w-1/3 flex items-end justify-center bg-blue-100 p-4">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60">
            <Image
              src={docInfo.image}
              alt={docInfo.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Doctor Info */}
        <div className="sm:w-2/3 p-4 sm:p-6 space-y-3">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            {docInfo.name}
            <BadgeCheck className="text-blue-500 w-5 h-5" />
          </h2>

          <p className="text-gray-700 text-sm">
            {docInfo.degree || "MBBS"} – {docInfo.speciality}
            {docInfo.experience && (
              <span className="ml-3 px-2 py-1 bg-gray-100 text-xs font-medium rounded-full">
                {docInfo.experience}
              </span>
            )}
          </p>

          <div className="text-sm text-gray-600">
            <div className="flex items-center font-medium mb-1">
              <Info className="w-4 h-4 mr-1" /> About
            </div>
            <p>{docInfo.about || "No description provided."}</p>
          </div>

          <p className="text-gray-800 font-medium">
            Appointment fee: <span className="font-bold text-black">{currencySy}{docInfo.fees || 0}</span>
          </p>
        </div>
      </div>
{/* Booking Slots UI */}
<div className="mt-10">
  <h3 className="text-lg font-semibold mb-4 text-gray-800">Booking slots</h3>

  {/* Day Selector */}
  <div className="flex gap-3 overflow-x-auto pb-2 mb-4">
    {docSlots.map((daySlots, idx) => {
      const date = new Date();
      date.setDate(date.getDate() + idx);
      const day = date.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
      const dateNum = date.getDate();

      return (
        <button
          key={idx}
          onClick={() => setSlotIndex(idx)}
          className={`flex flex-col items-center justify-center min-w-[56px] h-[70px] rounded-full px-3 py-2 border font-medium transition ${
            slotIndex === idx
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          <span className="text-xs">{day}</span>
          <span className="text-base font-semibold">{dateNum}</span>
        </button>
      );
    })}
  </div>

  {/* Time Slot Selector */}
  <div className="flex flex-wrap gap-3 mb-6">
    {docSlots[slotIndex]?.length > 0 ? (
      docSlots[slotIndex].map((slot, i) => (
        <button
          key={i}
          onClick={() => setSlotsTime(slot.time)}
          className={`px-4 py-1.5 rounded-full text-sm border transition ${
            slotTime === slot.time
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {slot.time}
        </button>
      ))
    ) : (
      <p className="text-gray-500 text-sm">No slots available for this day.</p>
    )}
  </div>

  {/* Book Button */}
  <div className="flex justify-center">
    <button
      className={`px-6 py-2 rounded-full text-white text-sm font-medium transition ${
        slotTime
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-300 cursor-not-allowed"
      }`}
      disabled={!slotTime}
      onClick={() => {
        if (slotTime) {
          alert(`Booking confirmed at ${slotTime}`);
        }
      }}
    >
      Book an appointment
    </button>
  </div>
</div>

      
      {/*----Liistinng releated doctros------ */}
    <ReleatedDoctors docId={docId} speciality={docInfo.speciality} />

{/*----about section */}
<AboutUsSection/>
    </div>
  );
}
