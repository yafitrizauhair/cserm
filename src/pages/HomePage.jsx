import Navbar from "../components/navbar";
import heroImage from "../assets/grass.jpg";
import aim1 from "../assets/Image.png";
import aim2 from "../assets/Image2.png";
import aim3 from "../assets/Image3.png";
import visionImage from "../assets/Image4.png";
import ProjectPage from "./ProjectPage";
import PublicationPage from "./PublicationPage";
import OurTeamPage from "./OurTeamPage";
import NewsPage from "./NewsPage";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans scroll-smooth bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section (tanpa parallax, tetap muncul saat scroll) */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white">
        {/* Gambar latar hero */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Overlay hitam transparan */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        {/* Konten hero */}
        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
            Centre for Sustainable Energy & Resources Management
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto text-gray-100 font-medium">
            Promoting Renewable Energy, Biodiversity, and Sustainable Futures.
          </p>
          <a
            href="#profile"
            className="mt-8 inline-block bg-[#1E9C2D] hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6 text-[#1E9C2D] text-center">
          About C-SERM
        </h2>
        <p className="text-gray-700 leading-relaxed text-justify text-lg">
          C-SERM was established at Universitas Nasional in June 2014 based on
          the decree of Rector No. 136 year 2014. It aims to be an
          internationally recognized centre for the assessment, development, and
          promotion of renewable energy and ecosystem services protection
          through a multi-disciplinary approach. C-SERM advocates strongly the
          development of local capacity which significantly contributes to the
          sustainable economic, social, and environmental well-being of the
          people.
        </p>
      </section>

      {/* Aims Section */}
      <section id="aims" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-[#1E9C2D] text-center">
            C-SERM's Aims
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[aim1, aim2, aim3].map((img, index) => {
              const texts = [
                "Identifying and assessing renewable energy resources and appropriate technology at local levels in the remote area of Indonesia supporting sustainable livelihoods of local communities.",
                "Collaborating with Academic, Business, Government, and Civil Society to develop Best Practices for human capital and supply chain development.",
                "Training local communities and industry professionals in delivering the sustainability agenda and developing innovative solutions to global issues.",
              ];
              return (
                <div
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={`Aim ${index + 1}`}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-gray-700 font-medium text-justify">
                      {texts[index]}
                    </p>
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
        className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center"
      >
        <div>
          <h2 className="text-3xl font-bold mb-6 text-[#1E9C2D]">
            Vision & Mission
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg text-[#1E9C2D] mb-2">Vision</h3>
              <p className="text-gray-800 leading-relaxed">
                A sustainable future for the planet, where renewable energy is
                utilized efficiently and ecosystem services are protected for
                the benefit of the people.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1E9C2D] mb-2">Mission</h3>
              <p className="text-gray-800 leading-relaxed">
                Promote renewable energy and biodiversity, and protect ecosystem
                services through a multidisciplinary approach which takes into
                account human needs.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <img
            src={visionImage}
            alt="Vision & Mission"
            className="rounded-2xl shadow-lg w-full max-w-md object-cover"
          />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="bg-gray-50 py-20">
        <ProjectPage />
      </section>

      {/* Publications Section */}
      <section id="publications" className="bg-white py-20">
        <PublicationPage />
      </section>

      {/* Our Team Section */}
      <section id="ourteam" className="bg-gray-50 py-20">
        <OurTeamPage />
      </section>

      {/* News Section */}
      <section id="news" className="bg-white py-20">
        <NewsPage />
      </section>
    </div>
  );
}
