

LINK LIVE DEMO:https://csermunas.vercel.app/


 🌿 C-SERM Website

> Centre for Sustainable Energy & Resources Management (C-SERM) — Official website built using React.js & Tailwind CSS.
> The website aims to present C-SERM’s vision, mission, projects, publications, and contact information in an elegant, modern, and responsive design.

---

 🚀 Features

 🏠 Home Page

 Smooth hero section slider with overlay and fade transitions (Swiper.js).
 Responsive layout optimized for all devices.
 Clear navigation with anchored sections.

 🎯 Main Sections

1. Profile Section — Introduction and overview of C-SERM.
2. C-SERM’s Aims — Cards highlighting the main goals and initiatives.
3. Vision & Mission — Split layout combining text and image with professional styling.
4. Projects — Dynamic section showcasing current C-SERM projects.
5. Publications — Research outputs and academic works.
6. Our Team — Members, researchers, and contributors.
7. News & Updates — Latest C-SERM activities and announcements.
8. Contact Us — Integrated contact form and background image section.

 💫 Animations & UI

 Swiper Slider with smooth fade and autoplay.
 Overlay effect for readability on hero images.
 Hover animations for cards and buttons.
 Tailwind CSS for modern, responsive styling.

---

 🧩 Tech Stack

| Technology                       | Description                                         |
| -------------------------------- | --------------------------------------------------- |
| React.js                     | Frontend library used for UI components and routing |
| Tailwind CSS                 | Utility-first CSS framework for styling             |
| Swiper.js                    | For responsive and smooth image carousel            |
| Vite                         | Fast build tool and development server              |
| Node.js & Express (optional) | Backend API connection (if added later)             |

---

 🗂️ Folder Structure

```
C-SERM/
│
├── src/
│   ├── assets/               Image & media files
│   ├── components/           Reusable components (Navbar, Footer, etc.)
│   ├── pages/                Each main page (HomePage, ProjectPage, etc.)
│   ├── App.jsx               Main app file
│   ├── index.jsx             Entry point
│   └── styles/               Global or custom styles (if any)
│
├── public/
│   └── images/               Public-access images
│
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

 ⚙️ Installation & Setup

 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/cserm-website.git
cd cserm-website
```

 2️⃣ Install Dependencies

```bash
npm install
```

 3️⃣ Run Development Server

```bash
npm run dev
```

 4️⃣ Build for Production

```bash
npm run build
```

---

 🧠 Development Notes

 Hero Section Slider:

   Uses `Swiper` with `EffectFade`, `Autoplay`, and smooth transitions (`speed: 2500`).
   Includes dark overlay to enhance text readability.
 Responsive Design:

   Fully optimized for desktop, tablet, and mobile.
   Uses Tailwind utility classes for quick adjustments.
 Image Optimization:

   Store hero images in `/src/assets/`.
   Use `.jpg` or `.webp` for better performance.

---

 🌐 Deployment

You can deploy easily using:

 Vercel → automatic from GitHub
 Netlify → drag-and-drop build folder
 GitHub Pages → via `npm run build` + deploy script

---

 📸 Preview

![Hero Section](./src/assets/herobaru.jpg)
Smooth fade hero slider with overlay background.

---

 💬 Contact

Centre for Sustainable Energy & Resources Management (C-SERM)
📍 Universitas Nasional, Jakarta, Indonesia
🌐 [https://cserm.unas.ac.id](https://cserm.unas.ac.id)
📧 [contact@cserm.unas.ac.id](mailto:contact@cserm.unas.ac.id)

---

 📜 License

This project is licensed under the MIT License — feel free to use and modify for educational or institutional purposes.




NOTE

untuk contact us ganti dibagian
buka file googleScript.js copy semua ke google apps script
  


setelah itu buka google spreedsheet ganti id cari bagian
    const sheet = SpreadsheetApp.openById("ganti id google spreedsheet anda")
      .getSheetByName("Sheet1");




  
