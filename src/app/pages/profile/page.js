'use client';

import { useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets_frontend/assets';
import AppointmentsList from '../myappointments/page';

export default function ProfileCard() {
  const initialUser = {
    name: 'Edward Vincent',
    email: 'richardjameswap@gmail.com',
    phone: '+1 123 456 7890',
    address: '57th Cross, Richmond Circle, Church Road, London',
    gender: 'Male',
    birthday: '2024-07-20', // ISO format for input type="date"
    image: assets.profile_pic,
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // You can send formData to backend here
    console.log('Updated profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      {/* Top Section with Image */}
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <Image
          src={formData.image}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full border border-gray-300 shadow-sm object-cover"
        />

        <div className="flex-1 space-y-2">
          {/* Name */}
          {isEditing ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-xl font-semibold w-full border px-3 py-2 rounded-md"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800">{formData.name}</h2>
          )}

          {/* Contact Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase">Contact Information</h3>
            <ul className="text-sm text-gray-700 mt-1 space-y-1">
              <li>
                <span className="font-medium">Email id:</span>{' '}
                {isEditing ? (
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded-md w-full mt-1"
                  />
                ) : (
                  <a href={`mailto:${formData.email}`} className="text-blue-600 hover:underline">
                    {formData.email}
                  </a>
                )}
              </li>
              <li>
                <span className="font-medium">Phone:</span>{' '}
                {isEditing ? (
                  <input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded-md w-full mt-1"
                  />
                ) : (
                  <a href={`tel:${formData.phone}`} className="text-blue-600 hover:underline">
                    {formData.phone}
                  </a>
                )}
              </li>
              <li>
                <span className="font-medium">Address:</span>{' '}
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded-md w-full mt-1"
                  />
                ) : (
                  formData.address
                )}
              </li>
            </ul>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 uppercase mt-4">Basic Information</h3>
            <ul className="text-sm text-gray-700 mt-1 space-y-1">
              <li>
                <span className="font-medium">Gender:</span>{' '}
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded-md w-full mt-1"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  formData.gender
                )}
              </li>
              <li>
                <span className="font-medium">Birthday:</span>{' '}
                {isEditing ? (
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded-md mt-1"
                  />
                ) : (
                  new Date(formData.birthday).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-5 py-2 rounded-md border text-sm font-medium hover:bg-gray-100 transition"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
        <button
          onClick={handleSave}
          disabled={!isEditing}
          className={`px-5 py-2 rounded-md text-sm font-medium text-white transition ${
            isEditing ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Save information
        </button>
      </div>

      <AppointmentsList/>
    </div>
  );
}
