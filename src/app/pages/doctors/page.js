'use client';

import { AppContext } from "@/context/AppContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { useSearchParams } from "next/navigation";

const specialities = [
  "All",
  "General_physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

export default function Doctors() {
  const { doctors } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");

  const [filterDoc, setFilterDoc] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
const searchParams = useSearchParams();
const specialityParam = searchParams.get("speciality");

const initialSpeciality =
  specialityParam && specialities.includes(specialityParam)
    ? specialityParam
    : "All";

const [selected, setSelected] = useState(initialSpeciality);


  useEffect(() => {
    if (initialSpeciality && specialities.includes(initialSpeciality)) {
      setSelected(initialSpeciality);
    }
  }, [initialSpeciality]);

  useEffect(() => {
    let filtered = [...doctors];

    if (selected !== "All") {
      filtered = filtered.filter((doc) => doc.speciality === selected);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterDoc(filtered);
  }, [searchTerm, selected, doctors]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Find Your Doctor</h1>

      {/* 🔍 Search bar + filter toggle for mobile */}
      <div className="flex justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden bg-blue-600 text-white px-4 py-2 rounded-md shadow"
        >
          Filter
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 🧭 Desktop sidebar */}
        <aside className="hidden lg:block lg:w-1/4 space-y-6">
          <SidebarFilter
            selected={selected}
            setSelected={setSelected}
            specialities={specialities}
          />
        </aside>

        {/* 🧑‍⚕️ Doctor list */}
        <main className="w-full lg:w-3/4">
          {filterDoc.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">No doctors found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filterDoc.map((doc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={`/pages/appointment/${doc._id || index}`}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-4 flex flex-col items-center text-center cursor-pointer"
                  >
                    <div className="w-24 h-24 relative mb-3">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="rounded-full object-cover border-[3px] border-transparent hover:border-blue-500 transition"
                      />
                    </div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base group-hover:text-blue-600 transition">
                      {doc.name}
                    </p>
                    <p className="text-gray-500 text-sm">{doc.speciality}</p>
                    <span className="text-green-600 text-xs mt-1">Available</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 📱 Mobile Sidebar Drawer */}
      <Dialog open={sidebarOpen} onClose={() => setSidebarOpen(false)} className="relative z-50 lg:hidden">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-y-0 left-0 w-1/2 max-w-xs bg-white p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filter by Speciality</h2>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <SidebarFilter
            selected={selected}
            setSelected={(val) => {
              setSelected(val);
              setSidebarOpen(false);
            }}
            specialities={specialities}
          />
        </div>
      </Dialog>
    </div>
  );
}

// 🧱 Filter component
function SidebarFilter({ selected, setSelected, specialities }) {
  return (
    <div className="flex flex-col gap-2">
      {specialities.map((type) => (
        <button
          key={type}
          onClick={() => setSelected(type)}
          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
            selected === type
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-blue-100"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
