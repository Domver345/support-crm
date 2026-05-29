# Support CRM System

A modern full-stack customer support ticket management system built with React, Node.js, Express, and SQLite.

This project was developed as part of a technical assignment for a Data Analyst / Technical role. The application allows users to create, manage, search, filter, update, and track customer support tickets through a clean and responsive dashboard interface.

---

# Live Demo

Frontend:
https://your-frontend-url.vercel.app

Backend API:
https://your-backend-url.onrender.com

---

# Features

## Ticket Management

- Create new support tickets
- View all tickets
- View ticket details
- Update ticket status
- Add notes/comments to tickets
- Delete tickets

## Search & Filtering

- Search tickets by:

  - Ticket ID
  - Customer name
  - Customer email
  - Subject
  - Description

- Filter tickets by status:

  - Open
  - In Progress
  - Closed

## UI Features

- Responsive modern dashboard UI
- Clean reusable component architecture
- Loading states
- Empty states
- Status badges
- Professional layout using Tailwind CSS

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- SQLite

## Deployment

- Vercel (Frontend)
- Render (Backend)

---

# Project Structure

```bash
SUPPORT-CRM/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── database.js
│   ├── server.js
│   └── support_crm.db
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

# Database Schema

## Tickets Table

| Column         | Type    |
| -------------- | ------- |
| id             | INTEGER |
| ticket_id      | TEXT    |
| customer_name  | TEXT    |
| customer_email | TEXT    |
| subject        | TEXT    |
| description    | TEXT    |
| status         | TEXT    |
| created_at     | TEXT    |
| updated_at     | TEXT    |

## Notes Table

| Column     | Type    |
| ---------- | ------- |
| id         | INTEGER |
| ticket_id  | TEXT    |
| note_text  | TEXT    |
| created_at | TEXT    |

---

# API Endpoints

## Create Ticket

```http
POST /api/tickets
```

## Get All Tickets

```http
GET /api/tickets
```

Supports query parameters:

```http
/api/tickets?status=Open
/api/tickets?search=john
```

## Get Single Ticket

```http
GET /api/tickets/:ticket_id
```

## Update Ticket

```http
PUT /api/tickets/:ticket_id
```

## Delete Ticket

```http
DELETE /api/tickets/:ticket_id
```

---

# Local Setup Instructions

## Clone Repository

```bash
git clone https://github.com/yourusername/support-crm.git
```

---

# Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Environment Notes

The frontend and backend run separately during development.

The frontend communicates with the backend API using Axios.

Example:

```javascript
baseURL: "http://localhost:5000/api";
```

---

# Challenges Faced

- Handling frontend and backend communication correctly
- Configuring CORS between React and Express
- Managing SQLite integration
- Implementing dynamic filtering and searching
- Deploying frontend and backend separately

---

# Future Improvements

- User authentication
- Admin dashboard
- Pagination
- Email notifications
- Real-time ticket updates
- Cloud database integration (PostgreSQL/MySQL)
- Role-based access control

---

# Screenshots

(Add screenshots here after deployment)

---

# Author

Suman Das

GitHub:
https://github.com/yourusername

---
