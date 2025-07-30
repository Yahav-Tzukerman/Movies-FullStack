# 🎬 Movies & Subscriptions Management – Fullstack Final Project

## 🌐 Live Demo

🔗 **Production Site:** [movies-full-stack.vercel.app](https://movies-full-stack.vercel.app/)

## 📚 Table of Contents

- [About](#about)
- [Architecture & System Components](#architecture--system-components)
- [Live Demos & Swagger Docs](#live-demos--swagger-docs)
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Test Users](#test-users)
- [Tech Stack](#tech-stack)
- [Development Notes](#development-notes)
- [License](#license)

---

## About

This is a **fullstack web application** for managing movies, members, and subscriptions for a cinema.  
The project was developed as a final assignment for a Fullstack course, featuring a robust backend with two Node.js REST APIs, a modern React+Redux frontend, strong permissions/auth, and production-grade deployment.

---

## Architecture & System Components

**System Overview:**

- **React + Redux Frontend:**  
  User-friendly SPA for admins and users, including authentication, dashboard, and CRUD for movies, members, subscriptions, and users.
- **Cinema WS:**  
  Node.js REST API for user management, authentication, movies, and subscriptions. Handles users/permissions logic and mediates all data access for the UI.
- **Subscriptions WS:**  
  Node.js REST API managing movies, members, and subscriptions in a MongoDB database.
- **Data Sources:**
  - MongoDB for persistent storage
  - External APIs for initial data (TVmaze for movies, JSONPlaceholder for members)
  - Local JSON files for user and permissions management

**Flow:**

- All actions are validated by the Cinema WS according to user permissions.
- Subscriptions WS manages subscriptions, movies, and members in MongoDB.

---

## Live Demos & Swagger Docs

- **Frontend Production:**  
  👉 [movies-full-stack.vercel.app](https://movies-full-stack.vercel.app/)
- **Cinema WS (API Gateway) – Swagger Docs:**  
  👉 [cinema-ws-sibl.onrender.com/api-docs](https://cinema-ws-sibl.onrender.com/api-docs)
- **Subscriptions WS – Swagger Docs:**  
  👉 [movies-fullstack.onrender.com/api-docs](https://movies-fullstack.onrender.com/api-docs)

> **Both backends are hosted on Render (can sleep after inactivity – see “waking up servers” in UX)!**

---

## Features

- **JWT Authentication & Authorization** – login, account creation, session management, password security.
- **Role & Permission-Based Access** – dynamic UI and API-level restrictions (admin, standard user).
- **Modern Dashboard** – visual cards for movies, members, subscriptions, users (admin only).
- **CRUD Operations** for:
  - Movies (with genres, images, premiered date, edit/delete)
  - Members (name, email, city)
  - Subscriptions (track which member watched which movie and when)
  - Users & Permissions (admin only)
- **Responsive Design** – full mobile/tablet support.
- **Theme Switching** – dark/light mode.
- **Popups & Notifications** – beautiful UX for errors, confirmations, and success states.
- **Server “Wake-up” Mechanism** – automatic ping to both APIs to ensure fast UX after idle.
- **API Documentation** – full Swagger for both Cinema and Subscriptions WS.

---

## Installation & Setup

**To run locally:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Yahav-Tzukerman/Movies-Full-Stack.git
   cd Movies-Full-Stack
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # and for client:
   cd client
   npm install
   ```
3. **Environment variables:**  
   Create a `.env` file for each server (Cinema WS, Subscriptions WS), set:
   ```bash
   MONGO_URI=your-mongo-uri
   JWT_SECRET=your-secret
   PORT=8002 # (or 8001 for Subscriptions WS)
   ```
4. **Start backends locally:**
   ```bash
   npm run dev   # for Cinema WS
   # in a separate terminal
   npm run dev   # for Subscriptions WS
   ```
5. **Start the frontend:**
   ```bash
   cd client
   npm start
   # or
   npm run dev
   ```

**Production:**

- Deployed via Vercel (frontend), Render.com (both APIs), MongoDB Atlas.

---

## Test Users

| Role  | Username | Password |
| ----- | -------- | -------- |
| Admin | admin    | admin123 |

- New users must be created by admin, then set their password via "Create Account".

---

## Tech Stack

- **Frontend:** React, Redux Toolkit, Material UI (MUI), Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Swagger, dotenv
- **DevOps:** Vercel (frontend), Render.com (APIs), MongoDB Atlas
- **Other:** ESlint, Prettier, Responsive Design, Full error handling

---

## Development Notes

- Both APIs use modular structure (service/repository/controller/route).
- Permissions are managed both in JSON (users/permissions) and DB for full compatibility with requirements.
- Extensive server-side and client-side validation with clear UX/UI error reporting.
- UX: “Wake-up” request to Render servers to eliminate user wait time.

---

## License

This project is licensed under the MIT License.

---

### **Made with ❤️ by Yahav Tzukerman for Fullstack Final Project**
