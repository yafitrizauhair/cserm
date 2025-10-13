import React from "react";
import Navbar from "../components/navbar";
import team1 from "../assets/orang.png"; 
import team2 from "../assets/orang.png";
import team3 from "../assets/orang.png";
import team4 from "../assets/orang.png";
import team5 from "../assets/orang.png";
import team6 from "../assets/orang.png";
import team7 from "../assets/orang.png";
import team8 from "../assets/orang.png";
import team9 from "../assets/orang.png";
import team10 from "../assets/orang.png";

export default function OurTeam() {
  const management = [
    { name: "Dr. Jito Sugardjito", role: "Director", img: team1 },
    { name: "Inez Saptenno", role: "International Project Manager", img: team2 },
  ];

  const staff = [
    { name: "Agung Iswadi", role: "Research Fellow", img: team3 },
    { name: "Dr. R. A. Pratiwi", role: "Research Fellow for C-SERM Blue Communities", img: team4 },
    { name: "Andi Kurniawan", role: "Research Assistant", img: team5 },
    { name: "Dr. Tatang Mitra Setia", role: "Research Fellow", img: team6 },
    { name: "Dr. Asep Adhikerana", role: "Research Fellow", img: team7 },
    { name: "Chris Kelly", role: "Project Developer / MER Officer", img: team8 },
    { name: "Prawesti Wulandari", role: "Research Assistant", img: team9 },
    { name: "Arfa Wulanda Agnia", role: "Research Assistant", img: team10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans scroll-smooth">
      {/* Navbar */}
      <Navbar />

      {/* Management Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-extrabold mb-10 text-[#1E9C2D] text-center tracking-wide">
          C-SERM MANAGEMENT
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
          {management.map((person, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
            >
              <div className="overflow-hidden">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-65 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-md font-medium text-gray-700 mb-1">
                  {person.role}
                </h3>
                <p className="text-[#1E9C2D] font-bold text-lg">{person.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Staff Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-extrabold mb-10 text-[#1E9C2D] text-center tracking-wide">
          C-SERM STAFF
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-center">
          {staff.map((person, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden text-center shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100"
            >
              <div className="overflow-hidden">
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-65 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-md font-medium text-gray-700 mb-1">
                  {person.role}
                </h3>
                <p className="text-[#1E9C2D] font-bold text-lg">{person.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
