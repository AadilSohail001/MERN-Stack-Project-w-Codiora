# Internship Registration System

A modern full-stack MERN application developed for internship registration and applicant management.

Built with a clean and professional user interface inspired by the Codiora House (Private) Limited visual identity.

---

## Project Overview

This project allows candidates to submit internship applications through a responsive registration form and stores applicant information securely inside MongoDB.

Submitted records can be viewed through a modern modal interface that displays registered applicants.

---

## Features

### Frontend (React)

* Professional Internship Registration UI
* Responsive design
* Real-time form updates using React Hooks
* Modal-based student records viewer
* Modern corporate styling

### Backend (Node.js + Express.js)

* REST API architecture
* Registration endpoint
* Student records retrieval endpoint
* Error handling

### Database (MongoDB)

* Persistent data storage
* Applicant record management

---

## Technologies Used

### Frontend

* React.js
* CSS3
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Development Tools

* VS Code
* Git
* GitHub

---

## Project Structure

```plaintext
internship-registration/

client/
│
├── src/
│   ├── components/
│   │   ├── Form.js
│   │   ├── Form.css
│   │   ├── Records.js
│   │   └── Records.css
│   │
│   ├── App.js
│   └── index.js
│
server/
│
├── models/
│   └── Student.js
│
├── routes/
│   └── studentRoutes.js
│
├── server.js
├── package.json
└── .env.example
```

---

## Installation Guide

### Clone Repository

```bash
git clone YOUR_REPOSITORY_URL
```

```bash
cd internship-registration
```

---

## Backend Setup

Move into server:

```bash
cd server
```

Install packages:

```bash
npm install
```

Create:

```plaintext
.env
```

Add:

```env
MONGO_URI=mongodb://127.0.0.1:27017/internshipDB
```

Run backend:

```bash
npm run dev
```

Expected:

```plaintext
Server Running
MongoDB Connected
```

---

## Frontend Setup

Open another terminal:

```bash
cd client
```

Install packages:

```bash
npm install
```

Run frontend:

```bash
npm start
```

Open:

```plaintext
http://localhost:3000
```

---

## API Endpoints

### Register Student

```http
POST /api/register
```

Request Body:

```json
{
"name":"John Doe",
"email":"john@gmail.com",
"technology":"MERN"
}
```

---

### Get Registered Students

```http
GET /api/students
```

---

## User Workflow

1. Open registration page
2. Fill:

   * Name
   * Email
   * Technology
3. Submit application
4. Data is stored in MongoDB
5. Open Saved Records modal
6. View all registered applicants

---

## Screenshots

Add screenshots inside:

```plaintext
/client/screenshots
```

Example:

```md
![Homepage](screenshots/home.png)
![Records Modal](screenshots/modal.png)
```

---

## Future Improvements

* Edit / Delete records
* Authentication
* Dashboard analytics
* Search and filtering
* Admin panel
* Cloud deployment

---

## Author

Developed by **Aadil Sohail**

Frontend Engineering • MERN Stack Development

Project Collaboration:
**Codiora House (Private) Limited**

---
