import Navbar from "../components/navbar";
import hero1 from "../assets/herobaru.jpg";
import hero2 from "../assets/heroslider2.jpg";
import hero3 from "../assets/heroslider3.jpg";
import hero4 from "../assets/heroslider4.jpg";
import hero5 from "../assets/heroslider5.avif";
import hero6 from "../assets/heroslider6.jpg";
import aim1 from "../assets/aims1.jpg";
import aim2 from "../assets/aims2.jpg";
import aim3 from "../assets/aims3.jpg";
import visionImage from "../assets/vision.jpeg";
import partnerLogos from "../assets/Frame 3.png"; // ← tambahkan gambar partner di folder assets

import ProjectPage from "./ProjectPage";
import PublicationPage from "./PublicationPage";
import OurTeamPage from "./OurTeamPage";
import NewsPage from "./NewsPage";
import ContactUsPage from "./ContactUsPage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

export default function HomePage() {
  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6];

  return (
    <div className="min-h-screen flex flex-col font-sans scroll-smooth bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            speed={2000}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation
            className="rounded-3xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {heroImages.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[55vh] md:h-[65vh] lg:h-[75vh] overflow-hidden rounded-3xl">
                  <div
                    className="absolute inset-0 bg-center bg-cover scale-110 animate-zoomSlow"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/25 rounded-3xl"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-[#1E9C2D]">
          CENTRE FOR SUSTAINABLE ENERGY & RESOURCES MANAGEMENT
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify">
          C-SERM was established at Universitas Nasional in June 2014 based on
          the decree of Rector No. 136 year 2014. It aims to be an
          internationally recognized centre for the assessment, development, and
          promotion of renewable energy and ecosystem services protection through
          a multi-disciplinary approach. C-SERM advocates strongly the development
          of local capacity which significantly contributes to the sustainable
          economic, social, and environmental well-being of the people.
        </p>
      </section>

      {/* C-SERM’s Aims */}
      <section id="aims" className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-10 text-[#1E9C2D]">
            C-SERM'S AIMS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[aim1, aim2, aim3].map((img, index) => {
              const texts = [
                "Identifying and assessing renewable energy resources and appropriate technology at local levels in the remote area of Indonesia supporting sustainable livelihoods of local communities.",
                "Collaborating with Academic, Business, Government, and Civil Society to develop Best Practices for human capital and supply chain development.",
                "Training local communities and industry professionals in delivering the sustainability agenda and developing innovative solutions to global issues.",
              ];
              return (
                <div
                  key={index}
                  className="bg-[#1E9C2D] text-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
                >
                  <img
                    src={img}
                    alt={`Aim ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-5 text-sm md:text-base">
                    <p>{texts[index]}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section
        id="vision"
        className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[#1E9C2D]">
            Vision & Mission
          </h2>

          <div className="mb-6">
            <h3 className="font-bold text-lg text-[#1E9C2D] mb-2">Vision</h3>
            <p className="text-gray-800 leading-relaxed font-semibold">
              A sustainable future for the planet, where renewable energy is
              utilized with efficiency and ecosystem services are protected for
              the benefit of the people.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg text-[#1E9C2D] mb-2">Mission</h3>
            <p className="text-gray-800 leading-relaxed font-semibold">
              Promote renewable energy and biodiversity, and protect ecosystem
              services through a multidisciplinary approach which takes into
              account human needs.
            </p>
          </div>
        </div>

        <div>
          <img
            src={visionImage}
            alt="Vision & Mission"
            className="rounded-xl shadow-lg w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-50 py-16">
        <ProjectPage />
      </section>

      {/* Publications Section */}
      <section id="publications" className="bg-white py-16">
        <PublicationPage />
      </section>

      {/* Our Team Section */}
      <section id="ourteam" className="bg-gray-50 py-16">
        <OurTeamPage />
      </section>

      {/* News Section */}
      <section id="news" className="bg-white py-16">
        <NewsPage />
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-16">
        <ContactUsPage />
      </section>

      {/* Footer */}
      <footer className="bg-[#b87348] text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-6">
          {/* Partner Logos */}
          <img
            src={partnerLogos}
            alt="Partner Logos"
            className="w-full max-w-5xl object-contain opacity-90"
          />

          {/* Divider */}
          <div className="border-t border-white/40 w-full mt-4"></div>

          {/* Copyright */}
          <p className="text-sm text-white/90">
            © {new Date().getFullYear()} C-SERM Universitas Nasional. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
