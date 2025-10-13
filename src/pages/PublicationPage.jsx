import React from "react";
import publicationHero from "../assets/mancing.png";

// 📚 Data publikasi per tahun
const publications = {
  2017: [
    {
      title: "Community-based Conservation Approaches",
      authors: "Arifin et al., Conservation Biology",
    },
    {
      title: "Energy Efficiency in Developing Countries",
      authors: "Nguyen et al., Renewable and Sustainable Energy Reviews",
    },
  ],
  2018: [
    {
      title: "Sustainable Fisheries Management",
      authors: "Putra et al., Fisheries Research",
    },
    {
      title: "Big Data in Environmental Science",
      authors: "Johnson et al., Environmental Research Letters",
    },
  ],
  2019: [
    {
      title: "Marine Protected Areas and Local Communities",
      authors: "Santoso et al., Marine Policy",
    },
    {
      title: "Internet of Things for Smart Agriculture",
      authors: "Wang et al., Computers and Electronics in Agriculture",
    },
  ],
  2020: [
    {
      title: "Climate Change Impacts on Coastal Communities",
      authors: "Rahman et al., Climate Risk Management",
    },
    {
      title: "Blockchain for Sustainable Supply Chains",
      authors: "Chen et al., Journal of Cleaner Production",
    },
  ],
  2021: [
    {
      title: "Renewable Energy Transitions in Southeast Asia",
      authors: "Yusuf et al., Energy Policy",
    },
    {
      title: "AI for Environmental Monitoring",
      authors: "Kim et al., Environmental Modelling & Software",
    },
  ],
  2022: [
    {
      title: "Cybersecurity Trends",
      authors: "Lee et al., Computers & Security",
    },
    {
      title: "Edge Computing Challenges",
      authors: "Tanaka et al., Future Internet",
    },
  ],
  2023: [
    {
      title: "Augmented Reality in Education",
      authors: "Doe et al., Education Journal",
    },
    {
      title: "Autonomous Vehicles and Safety",
      authors: "Smith et al., IEEE Transactions",
    },
  ],
  2024: [
    {
      title: "Assessing impact risk to tropical marine ecosystems",
      authors: "Culhane et al., Journal of Applied Ecology",
    },
  ],
  2025: [
    {
      title:
        "Community participation and habitat assessment determine sea cucumber grow-out site suitability in Selayar Islands",
      authors: "Ainin et al., Aquaculture International",
    },
    {
      title:
        "Developing a citizen science approach to monitor stranded marine plastics",
      authors: "Praptiwi et al., CLEAN - Soil, Air, Water",
    },
  ],
};

const PublicationPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/*  Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
            style={{ backgroundImage: `url(${publicationHero})` }}
          >
          </div>
        </div>
      </div>

      {/* 📄 Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-gray-600 mb-12 text-center max-w-3xl mx-auto text-lg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae numquam eveniet molestias earum eum pariatur distinctio blanditiis praesentium eos dolor odit, quasi nobis. Eos reprehenderit nesciunt ad sit obcaecati nisi!
        </p>

        {/* 📘 List per tahun */}
        <div className="space-y-10">
          {Object.entries(publications)
            .reverse() 
            .map(([year, papers]) => (
              <div
                key={year}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl p-8 border border-gray-100"
              >
                <h3 className="text-3xl font-bold mb-5 border-b pb-2 text-[#1E9C2D]">
                  {year}
                </h3>
                <ul className="list-disc pl-6 text-gray-800 space-y-3">
                  {papers.map((pub, idx) => (
                    <li
                      key={idx}
                      className="leading-relaxed hover:translate-x-1 transition-transform"
                    >
                      <span className="font-medium text-[#1E9C2D]">
                        {pub.title}
                      </span>
                      <span className="block text-gray-500 text-sm">
                        {pub.authors}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default PublicationPage;
