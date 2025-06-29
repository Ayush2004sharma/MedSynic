'use client';

import { AppContext } from '@/context/AppContext';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TopDoctors() {
  const { doctors } = useContext(AppContext);

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="py-10 px-2 sm:px-4 max-w-6xl mx-auto"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
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
          {doctors.slice(0, 12).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={`/pages/doctors?speciality=${encodeURIComponent(item.speciality)}`}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="w-24 h-24 relative mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="rounded-full object-cover border-[3px] border-transparent hover:border-blue-500 transition"
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
        <div className="mt-8 flex justify-center">
          <Link href="/pages/doctors">
            <button className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 transition">
              View All Doctors
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
