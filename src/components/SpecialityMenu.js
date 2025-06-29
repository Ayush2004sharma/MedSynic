'use client';

import { motion } from 'framer-motion';
import { specialityData } from '@/assets/assets_frontend/assets';
import Link from 'next/link';
import Image from 'next/image';

export default function SpecialityMenu() {
  return (
    <section id="speciality" className="py-10 px-4 max-w-7xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-gray-800"
        >
          Find by Speciality
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sm md:text-base text-gray-600 mt-2"
        >
          Browse through trusted doctors by their speciality.
        </motion.p>
      </div>

      {/* Scrollable Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="overflow-x-auto no-scrollbar"
      >
        <div className="flex justify-center gap-6 w-max mx-auto px-2 pb-2">
          {specialityData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link
                href={`/pages/doctors/${item.speciality}`}
                className="flex flex-col items-center text-center bg-white rounded-xl shadow-md hover:shadow-xl px-4 py-3 min-w-[110px] max-w-[140px] h-[150px] transition-all"
              >
                <div className="w-14 h-14 relative mb-2">
                  <Image
                    src={item.image}
                    alt={item.speciality}
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm font-medium text-gray-800 leading-tight">
                  {item.speciality}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
