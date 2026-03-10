import { useEffect, useState } from "react";
import {
  getNews,
  createNews,
  updateNews,
  deleteNews,
} from "../../services/newsService";
import Swal from "sweetalert2";

export default function NewsManagement() {
  const [news, setNews] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [fileKey, setFileKey] = useState(Date.now());

  // ======================
  // LOAD DATA
  // ======================
  const loadData = async () => {
    try {
      setLoading(true);
      const res = await getNews();
      setNews(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil data news:", err);
      Swal.fire("Error", "Gagal mengambil data news", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ======================
  // HANDLE FORM CHANGE
  // ======================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);

      if (form.image) {
        data.append("image", form.image);
      }

      if (editId) {
        await updateNews(editId, data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "News berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createNews(data);
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "News berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      resetForm();
      loadData();
    } catch (err) {
      console.error("Gagal menyimpan news:", err);
      Swal.fire("Error", "Gagal menyimpan news", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Data news akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await deleteNews(id);
        Swal.fire("Terhapus!", "News berhasil dihapus", "success");
        loadData();
      } catch (err) {
        Swal.fire("Error", "Gagal menghapus news", "error");
      }
    }
  };

  // ======================
  // EDIT
  // ======================
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      content: item.content,
      image: null,
    });
    setFileKey(Date.now());
  };

  // ======================
  // RESET
  // ======================
  const resetForm = () => {
    setForm({
      title: "",
      content: "",
      image: null,
    });
    setEditId(null);
    setFileKey(Date.now());
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kelola News</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Judul"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Konten"
          className="w-full border p-2 rounded"
          rows={4}
          required
        />

        <input
          key={fileKey}
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {submitting
              ? "Menyimpan..."
              : editId
              ? "Update News"
              : "Tambah News"}
          </button>

          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* LIST NEWS */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        news.map((n) => (
          <div key={n.id} className="bg-white p-4 rounded shadow mb-3">
            <h3 className="font-semibold">{n.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{n.content}</p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleEdit(n)}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(n.id)}
                className="text-red-600 text-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
