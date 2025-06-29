'use client';

import { AppContext } from "@/context/AppContext";
import { useContext, useEffect, useState } from "react";
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from "next/image";

export default function ReleatedDoctors({ docId ,speciality}) {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorData);
    }
  }, [doctors, speciality, docId]);

  return (
    <section className="py-10 px-3 sm:px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Top Doctors to Book</h2>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Simply browse through our extensive list of trusted doctors
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {relDoc.slice(0, 5).map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="transition-all duration-300"
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/pages/appointment/${item._id}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-24 h-24 relative mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-full object-cover border-[3px] border-transparent group-hover:border-blue-500 transition"
                  />
                </div>
                <p className="font-semibold text-gray-900 text-sm md:text-base group-hover:text-blue-600 transition">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm">{item.speciality}</p>
                <span className="text-green-600 text-xs mt-1">Available</span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/pages/doctors"
            className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            View All Doctors
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
