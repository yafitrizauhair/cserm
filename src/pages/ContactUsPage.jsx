import React, { useState } from "react";
import contactImage from "../assets/contactus.jpeg";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbz75a4DsOKkFSVL3qps9ibLAgfvfbkKI6cmHhxCBgOodIs4tpTEs_EozVKTW6C-LhEnkA/exec";

    try {
      const response = await fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "success") {
        setStatusMessage({
          type: "success",
          text: "✅ Pesan berhasil dikirim! Terima kasih sudah menghubungi kami.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatusMessage({
          type: "error",
          text: "❌ Gagal mengirim pesan. Silakan coba lagi.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage({
        type: "error",
        text: "⚠️ Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${contactImage})`,
      }}
    >
      {/* Overlay - dikurangi opacity-nya */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Contact Box - Diposisikan di tengah gambar */}
      <div className="relative z-10 w-[90%] md:w-[80%] lg:w-[75%] mt-60 mb-20 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">
        {/* Left Info Section - lebih transparan */}
        <div className="bg-[#b87348]/80 backdrop-blur-md text-white w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-center rounded-l-3xl">
          <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
          <p className="text-sm mb-8 opacity-90 leading-relaxed">
            Kita Membuat kontak untuk mempermudah bila mana ada keluhan yang
            ingin disampaikan
          </p>

          <div className="space-y-6 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-xl">📞</span>
              <div>
                <div>+62 (21) 788 48 152</div>
                <div>+62 (21) 780 2719</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">✉️</span>
              <span>cserm@unas.ac.id</span>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <span className="leading-relaxed">
                Jl. Sawo Manila No.61, RT.14/RW.7, Pejaten Bar. Ps. Minggu,
                Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12520
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Section - lebih transparan dengan glassmorphism */}
        <div
          className="w-full md:w-3/5 p-8 md:p-10 rounded-r-3xl text-gray-900"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.2)",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">
            Contact Us
          </h3>
          <form onSubmit={handleSubmit} className="space-y-5 text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-1 drop-shadow">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#b87348] backdrop-blur-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 drop-shadow">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#b87348] backdrop-blur-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 drop-shadow">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-[#b87348] backdrop-blur-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 drop-shadow">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white placeholder-white/70 resize-none focus:outline-none focus:ring-2 focus:ring-[#b87348] backdrop-blur-sm"
              />
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading ? "bg-gray-400" : "bg-[#b87348] hover:bg-[#9d6038]"
                } text-white font-semibold text-lg px-10 py-2.5 rounded-lg shadow-md transition-all`}
              >
                {loading ? "Mengirim..." : "Submit"}
              </button>
            </div>

            {statusMessage && (
              <div
                className={`mt-3 text-sm font-medium drop-shadow ${
                  statusMessage.type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {statusMessage.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;