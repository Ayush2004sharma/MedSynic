'use client';

import Image from 'next/image';
import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';

export default function AppointmentsList() {
  const { doctors } = useContext(AppContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);

  const topAppointments = doctors.slice(0, 3);
  const getDoctorInfo = (id) => doctors.find(doc => doc._id === id);

  const handleCancelClick = (appt) => {
    setSelectedAppt(appt);
    setShowConfirmModal(true);
  };

  const confirmCancel = () => {
    console.log('Cancelling appointment:', selectedAppt); // Replace with API call
    setShowConfirmModal(false);
    setSelectedAppt(null);
  };

  const cancelModal = (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full text-center space-y-4">
        <h3 className="text-xl font-bold text-gray-800">Cancel Appointment?</h3>
        <p className="text-gray-600 text-sm">Are you sure you want to cancel this appointment?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 text-sm rounded-md border border-gray-400 hover:bg-gray-100 transition"
          >
            No
          </button>
          <button
            onClick={confirmCancel}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );

 const StatusBadge = ({ status }) => {
  if (!status || typeof status !== 'string') {
    return (
      <span className="px-2 py-1 text-xs rounded-full border font-medium bg-gray-100 text-gray-600 border-gray-300">
        Unknown
      </span>
    );
  }

  const badgeColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    paid: 'bg-green-100 text-green-800 border-green-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300',
  };

  const badgeText = status.charAt(0).toUpperCase() + status.slice(1);

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full border font-medium ${badgeColors[status] || 'bg-gray-100 text-gray-600 border-gray-300'}`}
    >
      {badgeText}
    </span>
  );
};

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-700 border-b pb-2">
        My Appointments
      </h2>

      {topAppointments.length === 0 ? (
        <p className="text-gray-500 text-center text-base sm:text-lg">No appointments found.</p>
      ) : (
        <div className="space-y-6">
          {topAppointments.map((appt, index) => {
            const doctor = getDoctorInfo(appt.doctorId);

            return (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 p-4 sm:p-6 rounded-xl border shadow-sm bg-white"
              >
                {/* Doctor Image */}
                <div className="flex-shrink-0 self-center md:self-start">
                  <Image
                    src={appt?.image || '/default-doctor.png'}
                    alt={appt?.name || 'Doctor'}
                    width={100}
                    height={100}
                    className="rounded-md object-cover w-24 h-24 sm:w-28 sm:h-28"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex-1 w-full space-y-1 text-gray-700">
                  <div className="flex items-center justify-between">
                    <p className="text-lg sm:text-xl font-semibold text-gray-900">
                      {appt?.name || 'Doctor Name'}
                    </p>
                    <StatusBadge status={appt.status} />
                  </div>
                  <p className="text-sm sm:text-base text-gray-600">
                    {appt?.speciality || 'Speciality'}
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">Address:</span>{' '}
                    {appt?.address?.line1 || 'N/A'}, {appt?.address?.line2 || ''}
                  </p>
                  <p className="text-sm sm:text-base">
                    <span className="font-medium">Date & Time:</span>{' '}
                    {appt.date}, {appt.time}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0 md:items-end">
                  {appt.status === 'pending' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition w-full md:w-auto">
                      Pay here
                    </button>
                  )}
                  {appt.status === 'paid' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm cursor-default w-full md:w-auto">
                      Paid
                    </button>
                  )}
                  <button
                    onClick={() => handleCancelClick(appt)}
                    className="border border-gray-400 text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition w-full md:w-auto"
                  >
                    Cancel appointment
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showConfirmModal && cancelModal}
    </div>
  );
}
