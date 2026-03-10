import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../components/navbar";
import publicationHero from "../assets/foto1.jpg";

const API_BASE_URL = (process.env.REACT_APP_API_URL || "http://localhost:5000").replace(/\/$/, "");

export default function PublicationPage() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI controls
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("year_desc"); // year_desc | year_asc
  const [page, setPage] = useState(1);
  const limit = 10;

  const fetchData = async (nextPage) => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(`${API_BASE_URL}/api/publications`, {
        params: {
          page: nextPage,
          limit,
          sort,
          search,
        },
        timeout: 10000,
      });

      const data = res.data?.data ?? [];
      setRows(Array.isArray(data) ? data : []);

      setMeta({
        page: res.data?.page ?? nextPage,
        totalPages: res.data?.totalPages ?? 1,
        total: res.data?.total ?? (Array.isArray(data) ? data.length : 0),
      });
    } catch (e) {
      setError(e?.response?.data?.message || "Gagal memuat data publication");
      setRows([]);
      setMeta({ page: 1, totalPages: 1, total: 0 });
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Fetch ketika page/sort berubah
  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort]);

  // 🔎 Debounce search: reset page=1 lalu fetch
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1); // ini otomatis trigger fetch karena page berubah
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  // Group by year
  const grouped = useMemo(() => {
    const map = new Map();
    for (const p of rows) {
      const y = p.year ?? "Unknown";
      if (!map.has(y)) map.set(y, []);
      map.get(y).push(p);
    }

    const years = Array.from(map.keys()).sort((a, b) => {
      const na = Number(a);
      const nb = Number(b);
      if (Number.isNaN(na) || Number.isNaN(nb)) return String(b).localeCompare(String(a));
      return sort === "year_asc" ? na - nb : nb - na;
    });

    return years.map((year) => ({ year, items: map.get(year) }));
  }, [rows, sort]);

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="relative w-full h-[55vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full h-full">
          <div
            className="w-full h-full bg-cover bg-center rounded-3xl shadow-2xl"
            style={{ backgroundImage: `url(${publicationHero})` }}
          />
        </div>
      </div>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1e9c2d]">
            Publications
          </h1>
          <p className="text-gray-600 mt-3 max-w-3xl mx-auto text-lg">
            Daftar publikasi C-SERM UNAS berdasarkan tahun.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 mb-8 flex flex-col md:flex-row gap-3 md:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul / author / journal / doi..."
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e9c2d]"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1e9c2d]"
          >
            <option value="year_desc">Tahun (Terbaru)</option>
            <option value="year_asc">Tahun (Terlama)</option>
          </select>

          <div className="text-sm text-gray-500">
            Total: {meta.total}
          </div>
        </div>

        {/* Loading / Error */}
        {loading && (
          <div className="text-center py-10 text-gray-500">Loading...</div>
        )}

        {!loading && error && (
          <div className="text-center py-10 text-red-600">{error}</div>
        )}

        {/* Grouped by Year */}
        {!loading && !error && grouped.length > 0 && (
          <div className="space-y-10">
            {grouped.map(({ year, items }) => (
              <div
                key={year}
                className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl p-8 border border-gray-100"
              >
                <h3 className="text-3xl font-extrabold mb-6 text-[#1e9c2d] border-b border-[#1e9c2d]/30 pb-2">
                  {year}
                </h3>

                <ul className="list-disc pl-6 text-gray-800 space-y-4">
                  {items.map((p) => (
                    <li key={p.id} className="leading-relaxed">
                      <div>
                        <span className="font-medium text-gray-900">{p.title}</span>
                        <span className="text-gray-600"> — {p.authors}</span>
                        {p.journal && (
                          <span className="italic text-gray-500"> ({p.journal})</span>
                        )}
                      </div>

                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block mt-1 text-sm text-[#1e9c2d] hover:underline break-all"
                        >
                          {p.url}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && grouped.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Belum ada data publication.
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && meta.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              disabled={!canPrev}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-xl border border-[#1e9c2d] text-[#1e9c2d]
                         hover:bg-[#1e9c2d] hover:text-white transition disabled:opacity-50"
            >
              Prev
            </button>

            <div className="text-sm text-gray-600">
              Page <b className="text-[#1e9c2d]">{meta.page}</b> / {meta.totalPages}
            </div>

            <button
              disabled={!canNext}
              onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
              className="px-4 py-2 rounded-xl border border-[#1e9c2d] text-[#1e9c2d]
                         hover:bg-[#1e9c2d] hover:text-white transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}