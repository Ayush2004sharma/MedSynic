'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { assets } from '@/assets/assets_frontend/assets';
import { useState, useEffect, useRef } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [token, setToken] = useState(true);
  const dropdownRef = useRef(null);
  const mobileNavRef = useRef(null);

  const linkClass = (path) =>
    `font-medium ${
      pathname === path
        ? 'text-black border-b-[3px] border-black'
        : 'text-gray-700 hover:text-blue-600'
    }`;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target)
      ) {
        setShowMobileNav(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="px-4 py-3 shadow-md bg-white fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={assets.logo} alt="Logo" width={130} height={80} priority />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6">
          <Link href="/" className={linkClass('/')}>Home</Link>
          <Link href="/pages/doctors" className={linkClass('/doctors')}>All Doctors</Link>
          <Link href="/pages/about" className={linkClass('/about')}>About</Link>
          <Link href="/pages/contact" className={linkClass('/contact')}>Contact</Link>
        </div>

        {/* Account or Signup */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          {token ? (
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => {
                setShowMenu(!showMenu);
                setShowMobileNav(false); // close mobile nav if open
              }}
            >
              <Image src={assets.profile_pic} alt="Profile" width={32} height={32} className="rounded-full" />
              <Image src={assets.dropdown_icon} alt="Dropdown Icon" width={16} height={16} />
            </div>
          ) : (
            <Link href="/pages/signup">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                Create Account
              </button>
            </Link>
          )}

          {showMenu && token && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <Link
                href="/pages/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                onClick={() => setShowMenu(false)}
              >
                My Profile
              </Link>
              <Link
                href="/pages/myappointments"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                onClick={() => setShowMenu(false)}
              >
                My Appointments
              </Link>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                onClick={() => {
                  setToken(false);
                  setShowMenu(false);
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button
            onClick={() => {
              setShowMobileNav(!showMobileNav);
              setShowMenu(false); // close dropdown if open
            }}
          >
            <Image
              src={assets.menu_icon}
              alt="Menu"
              width={28}
              height={28}
              className="cursor-pointer"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileNav && (
        <div
          ref={mobileNavRef}
          className="md:hidden mt-3 flex flex-col gap-3 px-4"
        >
          <Link href="/" className={linkClass('/')}>Home</Link>
          <Link href="/pages/doctors" className={linkClass('/doctors')}>All Doctors</Link>
          <Link href="/pages/about" className={linkClass('/about')}>About</Link>
          <Link href="/pages/contact" className={linkClass('/contact')}>Contact</Link>

          {token ? (
            <>
              <Link href="/pages/profile" className="text-gray-700">My Profile</Link>
              <Link href="/pages/myappointments" className="text-gray-700">My Appointments</Link>
              <button
                className="text-red-600 text-left"
                onClick={() => {
                  setToken(false);
                  setShowMobileNav(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/pages/signup">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Create Account
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
