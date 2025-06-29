'use client';

import { assets } from "@/assets/assets_frontend/assets";
import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* About Us */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={assets.about_image}
            alt="Doctors"
            className="rounded-lg shadow-md object-cover w-full h-auto"
            width={500}
            height={400}
            priority
          />
        </div>

        {/* Text */}
        <div className="w-full md:w-1/2 space-y-4 text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900">
            About <span className="text-blue-600">Us</span>
          </h2>
          <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently.
            At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform,
            integrating the latest advancements to improve user experience and deliver superior service.
            Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <h3 className="font-semibold text-lg mt-4">Our Vision</h3>
          <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user.
            We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why <span className="text-blue-600">Choose Us</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center text-gray-700">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">Efficiency</h4>
            <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">Convenience</h4>
            <p>Access to a network of trusted healthcare professionals in your area.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg text-gray-900 mb-2">Personalization</h4>
            <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
