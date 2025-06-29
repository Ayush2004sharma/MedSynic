'use client';

import Image from "next/image";
import { assets } from "@/assets/assets_frontend/assets";

export default function ContactUsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
        Contact <span className="text-blue-600">Us</span>
      </h2>

      <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-10 transition-all duration-300">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={assets.contact_image} // put your actual image path here
            alt="Doctor with patient"
            className="rounded-2xl shadow-lg object-cover w-full h-auto"
            width={500}
            height={400}
            priority
          />
        </div>

        {/* Right Info */}
        <div className="w-full md:w-1/2 space-y-8 text-gray-700">
          {/* Office Info */}
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-gray-900 underline underline-offset-4">Our Office</h3>
            <p className="text-sm sm:text-base leading-relaxed">
              54709 Willms Station<br />
              Suite 350, Washington, USA
            </p>
            <p className="text-sm sm:text-base mt-2">
              Tel: <a href="tel:+14155550132" className="text-blue-600 hover:underline">(415) 555-0132</a>
            </p>
            <p className="text-sm sm:text-base">
              Email: <a href="mailto:greatstackdev@gmail.com" className="text-blue-600 hover:underline">greatstackdev@gmail.com</a>
            </p>
          </div>

          {/* Careers */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-1">Careers at Prescripto</h4>
            <p className="text-sm sm:text-base mb-4">Learn more about our teams and job openings.</p>
            <button className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition shadow-md">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
