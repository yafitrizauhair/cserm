import React, { useEffect, useState } from "react";
import {
  getProjectPageSettings,
  getFeaturedProject,
  getProjectBlocks,
  resolveProjectImage,
} from "../services/projectService";

const getImageClassByStyle = (style) => {
  switch (style) {
    case "rounded-full":
      return "rounded-full w-72 h-72 object-cover shadow-lg";
    case "rounded-xl":
      return "rounded-xl w-96 h-72 object-cover shadow-lg";
    case "rounded-2xl":
    default:
      return "rounded-2xl w-96 h-72 object-cover shadow-lg";
  }
};

const normalizeResponseData = (res) => {
  if (!res) return null;
  if (res?.data?.data !== undefined) return res.data.data;
  if (res?.data !== undefined) return res.data;
  return res;
};

const getProjectMainImage = (project) => {
  if (!project) return "";
  return project.featured_image || project.image || "";
};

const ProjectPage = () => {
  const [pageSettings, setPageSettings] = useState(null);
  const [featuredProject, setFeaturedProject] = useState(null);
  const [blocks, setBlocks] = useState([]);

  const [loadingPage, setLoadingPage] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingBlocks, setLoadingBlocks] = useState(false);

  const [pageError, setPageError] = useState("");
  const [featuredError, setFeaturedError] = useState("");
  const [blocksError, setBlocksError] = useState("");

  useEffect(() => {
    const loadPageSettings = async () => {
      try {
        setLoadingPage(true);
        setPageError("");

        const res = await getProjectPageSettings();
        const data = normalizeResponseData(res);
        setPageSettings(data || null);
      } catch (err) {
        console.error("LOAD PROJECT PAGE SETTINGS ERROR:", err);
        setPageError("Gagal mengambil page settings.");
        setPageSettings(null);
      } finally {
        setLoadingPage(false);
      }
    };

    const loadFeaturedProjectAndBlocks = async () => {
      try {
        setLoadingFeatured(true);
        setFeaturedError("");
        setBlocksError("");
        setBlocks([]);

        const res = await getFeaturedProject();
        const data = normalizeResponseData(res);

        setFeaturedProject(data || null);

        if (data?.id) {
          try {
            setLoadingBlocks(true);
            const blockRes = await getProjectBlocks(data.id);
            const blockData = normalizeResponseData(blockRes);
            setBlocks(Array.isArray(blockData) ? blockData : []);
          } catch (blockErr) {
            console.error("LOAD PROJECT BLOCKS ERROR:", blockErr);
            setBlocksError("Gagal mengambil project blocks.");
            setBlocks([]);
          } finally {
            setLoadingBlocks(false);
          }
        } else {
          setBlocks([]);
        }
      } catch (err) {
        console.error("LOAD FEATURED PROJECT ERROR:", err);
        setFeaturedError("Gagal mengambil featured project.");
        setFeaturedProject(null);
        setBlocks([]);
      } finally {
        setLoadingFeatured(false);
      }
    };

    loadPageSettings();
    loadFeaturedProjectAndBlocks();
  }, []);

  // PRIORITAS GAMBAR HERO:
  // 1. pageSettings.hero_image
  // 2. featuredProject.featured_image / featuredProject.image
  // 3. kosongkan kalau tidak ada
  const heroImageRaw =
    pageSettings?.hero_image || getProjectMainImage(featuredProject) || "";

  const heroImage = heroImageRaw ? resolveProjectImage(heroImageRaw) : "";

  const pageTitle =
    pageSettings?.page_title || featuredProject?.title || "Recent Project";

  const pageSubtitle =
    pageSettings?.page_subtitle ||
    featuredProject?.short_description ||
    "Belum ada deskripsi project.";

  const hasFeaturedProject = !!featuredProject;
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden py-6">
        <div className="max-w-7xl mx-auto px-6 w-full h-full">
          <div className="relative w-full h-full rounded-3xl shadow-2xl overflow-hidden bg-gray-200">
            {heroImage ? (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${heroImage})` }}
                />
                <div className="absolute inset-0 bg-black/35" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg bg-gray-100">
                No Hero Image
              </div>
            )}

            <div className="relative z-10 flex items-end h-full p-8 md:p-12">
              <div className="text-white max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {pageTitle}
                </h1>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {pageSubtitle}
                </p>

                {loadingPage && (
                  <p className="text-sm text-white/70 mt-3">
                    Loading page settings...
                  </p>
                )}

                {loadingFeatured && (
                  <p className="text-sm text-white/70 mt-2">
                    Loading featured project...
                  </p>
                )}

                {pageError && (
                  <p className="text-sm text-red-200 mt-3">{pageError}</p>
                )}

                {featuredError && (
                  <p className="text-sm text-red-200 mt-2">{featuredError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project Detail */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="relative mb-6 pl-4">
          <div className="absolute left-0 top-1 w-1 h-20 bg-gradient-to-b from-[#1E9C2D] to-green-400 rounded-full"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 uppercase">
            {featuredProject?.title || "Featured Project"}
          </h2>
        </div>

        {!hasFeaturedProject ? (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
            <p className="text-gray-500">Belum ada featured project.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {(featuredProject?.location || featuredProject?.project_date) && (
              <div className="text-sm text-gray-500 font-medium">
                {[featuredProject?.location, featuredProject?.project_date]
                  .filter(Boolean)
                  .join(" • ")}
              </div>
            )}

            {featuredProject?.short_description && (
              <p className="text-gray-700 leading-relaxed text-lg">
                {featuredProject.short_description}
              </p>
            )}

            {featuredProject?.full_description && (
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {featuredProject.full_description}
              </p>
            )}

            {featuredProject?.external_link && (
              <a
                href={featuredProject.external_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#1E9C2D] font-semibold hover:text-green-700 transition-all group"
              >
                Find out more…
                <span className="transform group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </a>
            )}
          </div>
        )}
      </section>

      {/* Project Blocks */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        {loadingBlocks ? (
          <div className="text-sm text-gray-500">Loading project blocks...</div>
        ) : blocksError ? (
          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600 font-medium">{blocksError}</p>
          </div>
        ) : !hasFeaturedProject ? null : !hasBlocks ? (
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
            <p className="text-gray-500">Belum ada project blocks.</p>
          </div>
        ) : (
          blocks.map((block, index) => {
            const imageSrc = block?.image ? resolveProjectImage(block.image) : null;
            const isImageLeft = block?.layout_type === "image-left-text-right";
            const imageClass = getImageClassByStyle(block?.image_style);

            return (
              <section key={block?.id || index} className="py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  {isImageLeft && (
                    <div className="flex justify-center order-2 md:order-1">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={block?.title || `Project Block ${index + 1}`}
                          className={imageClass}
                        />
                      ) : (
                        <div className="rounded-2xl w-96 h-72 bg-gray-100 flex items-center justify-center text-gray-400 shadow-lg">
                          No Image
                        </div>
                      )}
                    </div>
                  )}

                  <div className={isImageLeft ? "order-1 md:order-2 group" : "group"}>
                    <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-green-200">
                      {block?.title && (
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          {block.title}
                        </h3>
                      )}
                      <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                        {block?.content || "-"}
                      </p>
                    </div>
                  </div>

                  {!isImageLeft && (
                    <div className="flex justify-center">
                      {imageSrc ? (
                        <img
                          src={imageSrc}
                          alt={block?.title || `Project Block ${index + 1}`}
                          className={imageClass}
                        />
                      ) : (
                        <div className="rounded-2xl w-96 h-72 bg-gray-100 flex items-center justify-center text-gray-400 shadow-lg">
                          No Image
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            );
          })
        )}
      </section>

      <div className="h-16"></div>
    </div>
  );
};

export default ProjectPage;