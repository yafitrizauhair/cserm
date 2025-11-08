import React from "react";
import project3 from "../assets/project1.jpg";
import project4 from "../assets/project2.jpg";
import hero from "../assets/orang1.jpg";

const ProjectPage = () => {


  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
            style={{ backgroundImage: `url(${hero})` }}
          >
          </div>
        </div>
      </div>

      {/* Recent Project Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 animate-slide-up">
        <div className="relative">
          <div className="absolute -left-4 top-0 w-1 h-20 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent uppercase">
            This is our recent project
          </h2>
        </div>
        <p className="text-sm text-gray-400 mb-8 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          Day, date/month/year
        </p>

        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed text-lg hover:text-gray-900 transition-colors duration-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id
            ullamcorper nisi, eu dictum felis. Nunc et finibus nisi. Nunc non sem
            rhoncus, scelerisque metus mattis, blandit enim. Integer eget congue
            enim. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            Donec non nulla a erat commodo aliquet eu sed massa. Sed ullamcorper
            facilisis maximus. Duis magna magna, finibus finibus orci id, rutrum
            ornare est.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg hover:text-gray-900 transition-colors duration-300">
            Donec sit amet ligula in ipsum luctus mollis vel vestibulum quis
            turpis. Vestibulum quis ullamcorper turpis, id lacinia odio. Aliquam
            eget augue eros. Mauris commodo dolor quis nisl iaculis congue.
            Vestibulum non vehicula lorem. Donec viverra, ex sit amet eleifend
            convallis, risus erat fermentum lectus, eu vulputate nulla arcu id
            felis.
          </p>
        </div>
      </section>

      {/* Content with Image - Example 1 */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="group">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
              <p className="text-gray-700 leading-relaxed text-lg">
                Phasellus consequat odio magna, eu cursus odio congue non.
                Suspendisse potenti. Mauris venenatis fermentum neque sit amet
                posuere. Pellentesque ut est mi dictum, porttitor justo, et fermentum
                lectus.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={project3}
              alt="project 1"
              className="rounded-full w-72 h-72 object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Content with Image - Example 2 */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <img
              src={project4}
              alt="project 2"
              className="rounded-2xl w-96 h-72 object-cover shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2 group">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200">
              <p className="text-gray-700 leading-relaxed text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed
                justo vitae tortor tincidunt laoreet. Aenean porttitor elementum
                vehicula. Cras eros erat, mollis in mauris ut, luctus elementum diam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Spacing */}
      <div className="h-16"></div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProjectPage;