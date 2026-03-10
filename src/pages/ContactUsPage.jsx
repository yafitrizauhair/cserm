import React, { useState, useEffect } from "react";
import contactImage from "../assets/contactus.jpeg";

import {
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineLocationMarker
} from "react-icons/hi";

const ContactUsPage = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "" // honeypot anti spam
  });

  const [formLoadedAt, setFormLoadedAt] = useState(Date.now());
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  useEffect(() => {
    setFormLoadedAt(Date.now());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatusMessage(null);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbyH-q5azT2nPuv4cBVR__QIwOwRDedjE0Bx8YPE7q5zbjtJzGvnEIeqn7G0eWPvZIWW/exec";

    try {
      const payload = new URLSearchParams();

      payload.append("name", formData.name.trim());
      payload.append("email", formData.email.trim());
      payload.append("subject", formData.subject.trim());
      payload.append("message", formData.message.trim());
      payload.append("website", formData.website);
      payload.append("formLoadedAt", String(formLoadedAt));

      const response = await fetch(scriptURL, {
        method: "POST",
        body: payload
      });

      const result = await response.json();

      if (result.status === "success") {
        setStatusMessage({
          type: "success",
          text: "✅ Pesan berhasil dikirim! Terima kasih sudah menghubungi kami."
        });

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: ""
        });

        setFormLoadedAt(Date.now());
      } else {
        setStatusMessage({
          type: "error",
          text: result.message || "❌ Gagal mengirim pesan."
        });
      }

    } catch (error) {
      console.error(error);

      setStatusMessage({
        type: "error",
        text: "⚠️ Terjadi kesalahan saat mengirim pesan."
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${contactImage})`
      }}
    >

      {/* overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* container */}
      <div className="relative z-10 w-[90%] md:w-[80%] lg:w-[75%] mt-60 mb-20 flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl">

        {/* LEFT SIDE */}
        <div className="bg-[#d9cbba]/80 backdrop-blur-md text-white w-full md:w-2/5 p-8 md:p-10 flex flex-col justify-center rounded-l-3xl">

          <h3 className="text-xl font-semibold mb-8">
            Contact Information
          </h3>

          <div className="space-y-7 text-sm md:text-base">

            {/* PHONE */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#703818]/30 border border-white/20 flex items-center justify-center shadow-md">
                <HiOutlinePhone className="text-white text-xl" />
              </div>

              <div className="leading-relaxed">
                <div>+62 (21) 788 48 152</div>
                <div>+62 (21) 780 2719</div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#703818]/30 border border-white/20 flex items-center justify-center shadow-md">
                <HiOutlineMail className="text-white text-xl" />
              </div>

              <div className="leading-relaxed break-all">
                cserm@unas.ac.id
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full bg-[#703818]/30 border border-white/20 flex items-center justify-center shadow-md">
                <HiOutlineLocationMarker className="text-white text-xl" />
              </div>

              <div className="leading-relaxed">
                Jl. Sawo Manila No.61, RT.14/RW.7,
                Pejaten Bar. Ps. Minggu,
                Kota Jakarta Selatan,
                Daerah Khusus Ibukota Jakarta 12520
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div
          className="w-full md:w-3/5 p-8 md:p-10 rounded-r-3xl text-gray-900"
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(15px)",
            border: "1px solid rgba(255,255,255,0.2)"
          }}
        >

          <h3 className="text-2xl font-bold mb-6 text-white drop-shadow-lg">
            Contact Us
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5 text-white">

            {/* honeypot */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="hidden"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Your Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white"
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Message
              </label>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full rounded-md border border-white/40 px-4 py-2 bg-white/10 text-white resize-none"
              />
            </div>

            <div className="flex justify-start">
              <button
                type="submit"
                disabled={loading}
                className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#703818] hover:bg-[#5c2f14]"
                } text-white font-semibold text-lg px-10 py-2.5 rounded-lg shadow-md transition-all`}
              >
                {loading ? "Mengirim..." : "Submit"}
              </button>
            </div>

            {statusMessage && (
              <div
                className={`mt-3 text-sm font-medium ${
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