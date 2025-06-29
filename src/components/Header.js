// src/components/Header.tsx
'use client';

import { motion } from 'framer-motion';
import { assets } from '@/assets/assets_frontend/assets';
import Link from 'next/link';
import Image from 'next/image';

export default function Header({ onScrollClick }) {
  return (
    <div className="bg-white py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-blue-600 text-white rounded-lg max-w-6xl mx-auto shadow-md overflow-hidden"
      >
        <div className="flex flex-col md:flex-row w-full md:h-[400px]">
          {/* Left Side */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center gap-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold leading-snug">
              Book Appointment <br />With Trusted Doctors
            </h1>

            <div className="flex items-start gap-3">
              <Image src={assets.group_profiles} alt="Group Profiles" width={36} height={36} />
              <p className="text-base md:text-lg leading-tight">
                Browse our list of trusted doctors <br />
                and book hassle-free.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
           <button
  onClick={onScrollClick}
  className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-100 transition w-fit"
>
  Book Appointment
  <Image src={assets.arrow_icon} alt="Arrow Icon" width={16} height={16} />
</button>

            </motion.div>
          </motion.div>

          {/* Right Side */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hidden md:flex w-full md:w-1/2 items-center justify-center p-6"
          >
            <div className="max-w-[360px] w-full h-auto">
              <Image
                src={assets.header_img}
                alt="Header Illustration"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
