const express = require("express");
const router = express.Router();
const publicationController = require("../controllers/publicationController");

// public read
router.get("/", publicationController.getAll);

// admin CRUD (kalau mau diproteksi, tambahkan verifyToken middleware di sini)
router.post("/", publicationController.create);
router.put("/:id", publicationController.update);
router.delete("/:id", publicationController.remove);

module.exports = router;