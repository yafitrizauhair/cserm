
# 🌿 C-SERM UNAS Website

🔗 **Live Demo:** https://csermunas.vercel.app/

Official website of **Centre for Sustainable Energy & Resources Management (C-SERM)**  
Built with **React.js (Frontend)** and **Node.js + Express (Backend)**.

---

## 🚀 Features

### 🏠 Public Website
- Modern responsive UI (Tailwind CSS)
- Hero slider with smooth animation (Swiper.js)
- News & updates system
- Project showcase
- Publications page
- Team members page
- Contact form

### 🔐 Admin Panel
- Login authentication
- Manage:
  - News
  - Projects
  - Publications
  - Teams
  - Homepage content
- Image upload system

---

## 🧩 Tech Stack

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios
- Swiper.js

### Backend
- Node.js
- Express.js
- Multer (file upload)
- JWT (optional authentication)

---

## 📁 Project Structure

```bash
CSERM_UNAS/
│
├── backend/                 # Backend (Node.js + Express)
│   ├── config/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── homepageController.js
│   │   ├── newsController.js
│   │   ├── projectController.js
│   │   ├── publicationController.js
│   │   └── teamController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── upload.js
│   │   └── uploadTeam.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── contentRoutes.js
│   │   ├── homepageRoutes.js
│   │   ├── newsRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── publicationRoutes.js
│   │   └── teamRoutes.js
│   │
│   ├── uploads/             # Uploaded images storage
│   └── server.js
│
├── src/                     # Frontend (React)
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
````

---

## 📸 Image Storage

All uploaded images are stored in:

```
/backend/uploads
```

### Important Backend Config

Make sure you add this in `server.js`:

```js
import express from "express";
import path from "path";

const app = express();

// Serve images
app.use("/uploads", express.static(path.join(process.cwd(), "backend/uploads")));
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/yourusername/cserm.git
cd cserm
```

---

### 2. Install Frontend

```bash
npm install
npm run dev
```

---

### 3. Install Backend

```bash
cd backend
npm install
node server.js
```

---

## 🌐 API Base URL

```env
REACT_APP_API_URL=http://localhost:5000
```

---

## 🚀 Deployment

* **Frontend:** Vercel / Netlify
* **Backend:** Railway / Render / VPS

---

## 🧠 Notes

* Images must use correct URL:

  ```js
  http://localhost:5000/uploads/your-image.jpg
  ```
* Always check:

  * backend running
  * uploads folder exists
  * correct API URL

---

## 📬 Contact

**C-SERM UNAS**
Universitas Nasional, Jakarta
🌐 [https://cserm.unas.ac.id](https://cserm.unas.ac.id)
📧 [contact@cserm.unas.ac.id](mailto:contact@cserm.unas.ac.id)

---

## 📜 License

MIT License — free to use for educational purposes.
