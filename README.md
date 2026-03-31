# 🌿 C-SERM UNAS Website

<p align="center">
  <a href="https://csermunas.vercel.app/">
    <img src="https://img.shields.io/badge/Live-Demo-00C853?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <img src="https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Style-TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
</p>

---

## 📌 Overview

The **C-SERM UNAS Website** is the official platform of the
**Centre for Sustainable Energy & Resources Management (C-SERM)** — Universitas Nasional.

This project is built to deliver a **modern, scalable, and responsive web experience**
for showcasing:

* Institutional activities
* Research & publications
* Projects & collaborations
* Organizational structure

---

## ✨ Features

### 🌐 Public Website

* Fully responsive modern UI
* Interactive hero slider (Swiper.js)
* News & updates system
* Project showcase
* Publications page
* Team directory
* Contact form

### 🔐 Admin Panel

* Secure authentication system
* Full CMS capabilities:

  * Manage News
  * Manage Projects
  * Manage Publications
  * Manage Teams
  * Edit Homepage Content
* Image upload & storage system

---

## 🧩 Tech Stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Frontend | React.js, Tailwind CSS, Axios, React Router |
| Backend  | Node.js, Express.js                         |
| Upload   | Multer                                      |
| Auth     | JWT (optional)                              |

---

## 📁 Project Structure

```bash id="7h2k3l"
CSERM_UNAS/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── uploads/
│   └── server.js
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
└── README.md
```

---

## 📸 Preview

> 💡 *Tip: Add screenshots of your website here for better presentation*

<img width="1895" height="1022" alt="image" src="https://github.com/user-attachments/assets/f866cdb7-9e80-4401-a46a-ac25a2194ba1" />
<img width="1910" height="1022" alt="image" src="https://github.com/user-attachments/assets/f1a74810-d7eb-4a34-8663-03577e7d7e99" />

---



---

## 🌐 Environment Variables

Create `.env` file in frontend:

```env id="3msl0s"
REACT_APP_API_URL=http://localhost:5000
```

---

## 🖼️ Image Handling

* Upload directory:

```bash id="1ksl20"
/backend/uploads
```

* Access images:

```bash id="1asx09"
http://localhost:5000/uploads/your-image.jpg
```

* Enable static serving in backend:

```js id="10sll2"
app.use("/uploads", express.static("backend/uploads"));
```

---


✔ Ensure:

* API URL is correct
* Backend is publicly accessible
* Uploads folder is configured

---

## 📬 Contact

**Centre for Sustainable Energy & Resources Management (C-SERM)**
Universitas Nasional, Jakarta

🌐 https://cserm.unas.ac.id
📧 [contact@cserm.unas.ac.id](mailto:contact@cserm.unas.ac.id)

---

## 📜 License

MIT License — free for educational and non-commercial use.

---

## ⭐ Support

If you like this project, feel free to **star ⭐ the repository**
and contribute to further development!
