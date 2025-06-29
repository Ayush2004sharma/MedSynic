'use client';

import { assets } from '@/assets/assets_frontend/assets';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Left: Logo + Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={assets.logo}// Replace with your logo path
                alt="Prescripto Logo"
                width={40}
                height={40}
              />
              <span className="text-xl font-semibold text-gray-900">Prescripto</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s.
            </p>
          </div>

          {/* Middle: Company Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">COMPANY</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About us</Link></li>
              <li><Link href="/delivery">Delivery</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Right: Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">GET IN TOUCH</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>+0-000-000-000</li>
              <li>greatstackdev@gmail.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center text-sm text-gray-700 border-t mt-12 pt-4">
          Copyright 2024 © Greatstack.dev - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
