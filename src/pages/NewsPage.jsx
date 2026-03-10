import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import newsHero from "../assets/recentNews.jpg";

export default function NewsPage() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ======================
  // LOAD NEWS DARI API
  // ======================
  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNewsList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil news:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
            style={{ backgroundImage: `url(${newsHero})` }}
          ></div>
        </div>
      </div>

      {/* News List Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-[#1E9C2D] text-center">
          RECENT NEWS
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading news...</p>
        ) : newsList.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada news tersedia
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10">
            {newsList.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-3xl overflow-hidden text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              >
                <img
                  src={
                    item.image
                      ? `http://localhost:5000/uploads/${item.image}`
                      : "https://via.placeholder.com/400x300?text=No+Image"
                  }
                  alt={item.title}
                  className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />

                <div className="p-5">
                  <h3 className="font-semibold mt-2 text-lg text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
