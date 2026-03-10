import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from "../../services/publicationService";

const sortOptions = [
  { value: "year_desc", label: "Tahun (Terbaru)" },
  { value: "year_asc", label: "Tahun (Terlama)" },
  { value: "newest", label: "Dibuat (Terbaru)" },
  { value: "oldest", label: "Dibuat (Terlama)" },
];

export default function PublicationManagement() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("year_desc");
  const [page, setPage] = useState(1);
  const limit = 10;

  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    authors: "",
    year: new Date().getFullYear(),
    journal: "",
    url: "",
    doi: "",
    abstract: "",
  });

  const load = async (nextPage = page) => {
    try {
      setLoading(true);
      const res = await getPublications({ page: nextPage, limit, sort, search });
      setRows(res.data?.data || []);
      setMeta(res.data?.meta || { page: nextPage, limit, total: 0, totalPages: 1 });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Gagal memuat publications", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      load(1);
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const resetForm = () => {
    setEditId(null);
    setForm({
      title: "",
      authors: "",
      year: new Date().getFullYear(),
      journal: "",
      url: "",
      doi: "",
      abstract: "",
    });
  };

  const onEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title || "",
      authors: item.authors || "",
      year: item.year || new Date().getFullYear(),
      journal: item.journal || "",
      url: item.url || "",
      doi: item.doi || "",
      abstract: item.abstract || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    try {
      setSubmitting(true);

      const payload = {
        title: form.title,
        authors: form.authors,
        year: form.year,
        journal: form.journal,
        url: form.url,
        doi: form.doi,
        abstract: form.abstract,
      };

      if (editId) {
        await updatePublication(editId, payload);
        Swal.fire({ icon: "success", title: "Updated", timer: 1200, showConfirmButton: false });
      } else {
        await createPublication(payload);
        Swal.fire({ icon: "success", title: "Created", timer: 1200, showConfirmButton: false });
      }

      resetForm();
      setPage(1);
      await load(1);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Gagal menyimpan publication", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const onDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus publication?",
      text: "Data akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });
    if (!result.isConfirmed) return;

    try {
      await deletePublication(id);
      Swal.fire({ icon: "success", title: "Terhapus", timer: 1000, showConfirmButton: false });

      const nextPage = Math.min(page, Math.max(meta.totalPages, 1));
      await load(nextPage);
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Gagal hapus publication", "error");
    }
  };

  const canPrev = meta.page > 1;
  const canNext = meta.page < meta.totalPages;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-slate-800">Kelola Publications</h1>
        <p className="text-slate-500 mt-1">Tambah, edit, hapus publikasi berbasis link.</p>
      </div>

      {/* FORM */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="font-semibold text-slate-800">
            {editId ? "Edit Publication" : "Tambah Publication"}
          </div>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm"
            >
              Batal Edit
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Judul"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />
          <input
            className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Authors"
            value={form.authors}
            onChange={(e) => setForm((p) => ({ ...p, authors: e.target.value }))}
            required
          />
          <input
            type="number"
            className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Tahun"
            value={form.year}
            onChange={(e) => setForm((p) => ({ ...p, year: e.target.value }))}
            required
          />
          <input
            className="w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Journal (opsional)"
            value={form.journal}
            onChange={(e) => setForm((p) => ({ ...p, journal: e.target.value }))}
          />
          <input
            className="md:col-span-2 w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="URL (https://...)"
            value={form.url}
            onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
            required
          />
          <input
            className="md:col-span-2 w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="DOI (opsional)"
            value={form.doi}
            onChange={(e) => setForm((p) => ({ ...p, doi: e.target.value }))}
          />
          <textarea
            className="md:col-span-2 w-full border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
            placeholder="Abstract (opsional)"
            rows={4}
            value={form.abstract}
            onChange={(e) => setForm((p) => ({ ...p, abstract: e.target.value }))}
          />

          <div className="md:col-span-2 flex justify-end">
            <button
              disabled={submitting}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {submitting ? "Menyimpan..." : editId ? "Update" : "Tambah"}
            </button>
          </div>
        </form>
      </div>

      {/* FILTER */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-4 flex flex-col md:flex-row md:items-center gap-3">
        <input
          className="flex-1 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-300"
          placeholder="Cari judul / authors / journal / doi..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-slate-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-slate-300"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <div className="text-sm text-slate-500">
          Page {meta.page} / {meta.totalPages} • Total {meta.total}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-slate-500">Loading...</div>
        ) : rows.length === 0 ? (
          <div className="p-6 text-slate-500">Belum ada publication.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left px-4 py-3">Tahun</th>
                  <th className="text-left px-4 py-3">Judul</th>
                  <th className="text-left px-4 py-3">Authors</th>
                  <th className="text-left px-4 py-3">Link</th>
                  <th className="text-right px-4 py-3">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-semibold text-slate-700">{r.year}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{r.title}</div>
                      {r.journal && <div className="text-xs text-slate-500 mt-0.5">{r.journal}</div>}
                      {r.doi && <div className="text-xs text-slate-500">DOI: {r.doi}</div>}
                    </td>
                    <td className="px-4 py-3 text-slate-700">{r.authors}</td>
                    <td className="px-4 py-3">
                      <a href={r.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline break-all">
                        Buka Link
                      </a>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          onClick={() => onEdit(r)}
                          className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => onDelete(r.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            disabled={!canPrev || loading}
            onClick={() => {
              const next = page - 1;
              setPage(next);
              load(next);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
          >
            Prev
          </button>

          <div className="text-sm text-slate-500">
            Page {meta.page} of {meta.totalPages}
          </div>

          <button
            disabled={!canNext || loading}
            onClick={() => {
              const next = page + 1;
              setPage(next);
              load(next);
            }}
            className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}