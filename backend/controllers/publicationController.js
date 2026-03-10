const db = require("../config/db");

/* ===============================
   GET ALL PUBLICATIONS
================================= */
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const year = req.query.year || null;

    const offset = (page - 1) * limit;

    let whereSql = "";
    let params = [];

    if (year) {
      whereSql = "WHERE year = ?";
      params.push(year);
    }

    // total count
    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM publications ${whereSql}`,
      params
    );

    const total = countRows[0].total;

    // main data
    const [rows] = await db.query(
      `SELECT id, title, authors, year, journal, url, doi, created_at
       FROM publications
       ${whereSql}
       ORDER BY year DESC, created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      data: rows,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("GET PUBLICATIONS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   CREATE PUBLICATION
================================= */
exports.create = async (req, res) => {
  try {
    const { title, authors, year, journal, url, doi } = req.body;

    if (!title || !authors || !year || !url) {
      return res.status(400).json({ message: "Field wajib belum diisi" });
    }

    await db.query(
      `INSERT INTO publications (title, authors, year, journal, url, doi)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        title.trim(),
        authors.trim(),
        parseInt(year),
        journal?.trim() || null,
        url.trim(),
        doi?.trim() || null,
      ]
    );

    res.json({ message: "Publication berhasil ditambahkan" });
  } catch (err) {
    console.error("CREATE PUBLICATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   UPDATE PUBLICATION
================================= */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, authors, year, journal, url, doi } = req.body;

    if (!title || !authors || !year || !url) {
      return res.status(400).json({ message: "Field wajib belum diisi" });
    }

    await db.query(
      `UPDATE publications
       SET title=?, authors=?, year=?, journal=?, url=?, doi=?
       WHERE id=?`,
      [
        title.trim(),
        authors.trim(),
        parseInt(year),
        journal?.trim() || null,
        url.trim(),
        doi?.trim() || null,
        id,
      ]
    );

    res.json({ message: "Publication berhasil diupdate" });
  } catch (err) {
    console.error("UPDATE PUBLICATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ===============================
   DELETE PUBLICATION
================================= */
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM publications WHERE id=?", [id]);

    res.json({ message: "Publication berhasil dihapus" });
  } catch (err) {
    console.error("DELETE PUBLICATION ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};