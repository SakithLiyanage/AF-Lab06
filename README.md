# 🚀 SocialApp - Social Media Platform (AF Lab 06)

A modern, high-performance Social Media backend and frontend built with **Express.js**, featuring JWT authentication, post management with image uploads, and dynamic Handlebars rendering.

---

## ✨ Key Features

- **🔐 Secure Authentication**: JWT-based user registration and login system with persistent cookie storage.
- **📝 Full Post CRUD**: Create, Read, Update, and Delete your social media posts with ease.
- **🖼️ Image Uploads**: Integrated with `multer` to allow users to attach visuals to their posts.
- **📄 Pagination**: Smooth browsing of posts with 5 items per page limit.
- **📱 Premium Responsive UI**:
  - **Vibrant Design**: Modern aesthetics with a clean Inter font and curated color palette.
  - **🌓 Dark Mode**: Seamlessly switch between light and dark themes (manual & system sync).
  - **Transitions**: Smooth micro-animations for buttons and hover effects.
- **💡 In-Memory Storage**: Using JavaScript variables for fast data handling (as per lab requirements).

---

## 🛠️ Technology Stack

- **Core**: Node.js & Express.js
- **Frontend**: Handlebars (hbs) templating engine
- **Styling**: Vanilla CSS (Custom Variable Design System)
- **Security**: jsonwebtoken (JWT), bcryptjs for password hashing
- **File Handling**: Multer for local image storage
- **Middleware**: cookie-parser, dotenv, express-json

---

## 🏗️ Project Structure

```text
├── public/                 # Static assets
│   ├── css/                # Global stylesheets (style.css)
│   ├── uploads/            # User-uploaded post images
│   └── img/                # UI icons/assets
├── src/                    # Backend logic
│   ├── data/               # db.js (In-memory storage)
│   ├── middleware/         # auth.js (JWT validation)
│   └── routes/             # authRoutes.js & postRoutes.js
├── views/                  # Handlebars Templates
│   ├── layouts/            # main.hbs layout wrapper
│   └── ...                 # Content pages (home, login, etc.)
├── server.js               # Application entry point
├── .env                    # Secret keys & configuration
└── package.json            # Dependencies & Scripts
```

---

## 🚀 Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (installed automatically with Node)

### 2. Installation
Clone the repository (or navigate to the directory) and install dependencies:
```powershell
npm install
```

### 3. Environment Setup
The project requires a `.env` file at the root. (One has already been created for you).
```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

### 4. Running the Application
To start the server:
```powershell
# Production (regular start)
npm start

# Development (with watch mode)
npm run dev
```
Visit the app at **[http://localhost:5000](http://localhost:5000)**.

---

## 📸 Screenshots

- **Timeline**: View all posts with pagination controls.
- **Create Post**: Text + Image attachment support.
- **Edit/Delete**: Full control over your own content.
- **Dark Mode**: High-contrast, easy-on-the-eyes darkness.

---

## ⚖️ Lab Requirements Checklist
- [x] Set up basic Express.js server
- [x] Create RESTful API for creating, reading, updating, and deleting posts
- [x] Use variables to store post data (In-memory storage)
- [x] Use JWT middleware for user authentication
- [x] Protect endpoints for authenticated users
- [x] Use a template engine (Handlebars) to render dynamic HTML pages
- [x] Allow users to upload images to their posts (Multer)
- [x] Implement pagination for displaying posts
