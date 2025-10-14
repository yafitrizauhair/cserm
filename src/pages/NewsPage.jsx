import React from "react";
import Navbar from "../components/navbar";
import newsHero from "../assets/grass.jpg";
import news1 from "../assets/news1.png";
import news2 from "../assets/news2.png";
import news3 from "../assets/news3.png";

export default function NewsPage() {
  const newsList = [
    {
      title: "1st News",
      desc: "This is the description of the news",
      img: news1,
    },
    {
      title: "2nd News",
      desc: "This is the description of the news",
      img: news2,
    },
    {
      title: "3rd News",
      desc: "This is the description of the news",
      img: news3,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* ✅ Hero Section (sama seperti contohmu) */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
            style={{ backgroundImage: `url(${newsHero})` }}
          ></div>
        </div>
      </div>

      {/* ✅ News List Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-[#1E9C2D] text-center">
          RECENT NEWS
        </h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {newsList.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-3xl overflow-hidden text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="p-5">
                <h3 className="font-semibold mt-2 text-lg text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
