# 🚀 AbleSpace – Collaborative Task Manager (Frontend)

A modern, responsive, real-time collaborative task management dashboard built with **React**, **TypeScript**, and **Tailwind CSS**.  
This frontend consumes a REST API backend and uses **Socket.io** for live updates and in-app notifications.

---

## ✨ Features

- 🔐 Authentication (Register / Login)
- 📋 Task Management (Create, Update, Delete)
- 👥 Task Assignment to specific users
- ⚡ Real-time updates using Socket.io
- 🔔 Instant in-app notification on task assignment
- 📊 Dashboard with task statistics
  - Assigned tasks
  - Created tasks
  - Overdue tasks
- 🔎 Filter tasks (All / Assigned / Created / Overdue)
- 💎 Premium SaaS-style UI (Glassmorphism + Gradient)
- 📱 Fully responsive (Mobile / Tablet / Desktop)

---

## 🛠️ Tech Stack

- **Frontend Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** React Context
- **Data Fetching:** TanStack React Query
- **Forms:** React Hook Form
- **Real-Time:** Socket.io Client
- **HTTP Client:** Axios
- **Notifications:** React Toastify

---

## 📁 Project Structure

src/
├── api/ # Axios instance
├── auth/ # Auth context
├── components/ # Reusable UI components
│ ├── Navbar.tsx
│ ├── TaskCard.tsx
│ └── TaskForm.tsx
├── hooks/ # Custom hooks
│ ├── useAuth.ts
│ └── useSocket.ts
├── pages/
│ ├── Login.tsx
│ ├── Register.tsx
│ └── Dashboard.tsx
├── routes/
│ └── PrivateRoute.tsx
├── App.tsx
└── main.tsx


---

## ⚙️ Prerequisites

Make sure you have the following installed:

- Node.js **v18+**
- npm or yarn
- Backend server running (AbleSpace Backend)

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ablespace-frontend.git
cd ablespace-frontend

