const db = require("../config/db");

// =====================
// GET semua news
// =====================
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM news ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =====================
// GET news by id
// =====================
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query("SELECT * FROM news WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "News tidak ditemukan" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =====================
// CREATE news
// =====================
exports.create = async (req, res) => {
  try {
    const { title, content } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({ message: "Title dan content wajib" });
    }

    const image = req.file ? `news/${req.file.filename}` : null;

    await db.query(
      "INSERT INTO news (title, content, image) VALUES (?, ?, ?)",
      [title, content, image]
    );

    res.json({ message: "News berhasil ditambahkan" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =====================
// UPDATE news
// =====================
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body || {};

    if (!id) {
      return res.status(400).json({ message: "ID tidak ditemukan" });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Title dan content wajib" });
    }

    let query = "UPDATE news SET title=?, content=?";
    let values = [title, content];

    if (req.file) {
      query += ", image=?";
      values.push(`news/${req.file.filename}`);
    }

    query += " WHERE id=?";
    values.push(id);

    await db.query(query, values);

    res.json({ message: "News berhasil diupdate" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// =====================
// DELETE news
// =====================
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID tidak ditemukan" });
    }

    await db.query("DELETE FROM news WHERE id=?", [id]);

    res.json({ message: "News berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};