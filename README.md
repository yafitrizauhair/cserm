🌿 C-SERM UNAS Website

🔗 Live Demo: https://csermunas.vercel.app/

Official website of the Centre for Sustainable Energy & Resources Management (C-SERM), Universitas Nasional.
This platform provides institutional information, research outputs, projects, and news in a modern, responsive, and user-friendly interface.

🚀 Features

🏠 Public Website

Fully responsive modern UI (React + Tailwind CSS)
Hero slider with smooth transitions (Swiper.js)
Dynamic content sections:
News & Updates
Projects
Publications
Team Members
News detail page with sidebar (news portal style)
Contact page with integrated form

🔐 Admin Panel

Secure authentication system
Manage content dynamically:
News (CRUD + image upload + publish/draft)
Projects
Publications
Teams
Homepage content
File upload system (stored in backend /uploads)

🧩 Tech Stack

Frontend
Technology	Description
React.js	Frontend library for building UI
Tailwind CSS	Utility-first CSS framework
React Router	Client-side routing
Swiper.js	Image slider
Axios / Fetch	API communication
Backend
Technology	Description
Node.js	JavaScript runtime
Express.js	Backend framework
Multer	File upload handling
JWT (optional)	Authentication

📁 Project Structure

CSERM_UNAS/
│
├── backend/                # Backend (Node.js + Express)
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
│   ├── uploads/            # Uploaded images
│   └── server.js           # Backend entry point
│
├── src/                    # Frontend (React)
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


Images are stored in:

/backend/uploads
✅ Backend Configuration

Ensure this is added in your server.js:

import express from "express";
import path from "path";

const app = express();

// Serve uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
✅ Image URL Example

If stored in database:

image: "news-123.jpg"

Then accessible via:

http://localhost:5000/uploads/news-123.jpg
✅ Frontend Helper Function
const getImageUrl = (img) => {
  if (!img) return "https://via.placeholder.com/400x200";

  if (img.startsWith("http")) return img;

  return `http://localhost:5000/uploads/${img}`;
};
🧠 Development Notes
News System
Supports publish & draft status
Image upload using Multer
News detail page with sidebar (latest news)
UI/UX
Inspired by modern news portals (Detik / Kompas style)
Clean layout with responsive grid
Optimized for all screen sizes
Performance
Efficient API calls
Optimized image rendering
Tailwind-based styling

📸 Preview
https://csermunas.vercel.app/

💬 Contact

Centre for Sustainable Energy & Resources Management (C-SERM)
Universitas Nasional, Jakarta, Indonesia
🌐 https://cserm.unas.ac.id

📧 contact@cserm.unas.ac.id

📜 License

This project is licensed under the MIT License.
You are free to use and modify it for educational or institutional purposes.

✨ Highlights
Clean and professional structure
Fullstack (React + Express)
Dynamic CMS-style admin panel
Production-ready architecture
Optimized for scalability
🚀 Future Improvements
SEO optimization (React Helmet)
Social share buttons (WhatsApp, Facebook)
Analytics integration (Google Analytics)
Role-based access control
Skeleton loading & lazy loading
