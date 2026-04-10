# 🚀 Node.js Authentication API

A simple and scalable backend API built using **Node.js**, **Express**, and **MongoDB**.
This project provides user authentication with **JWT** and secure password hashing using **Bcrypt**.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (via Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Security:** Bcrypt (password hashing)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret_key
```

---

### 4. Run the Server

#### ▶️ Production

```bash
npm start
```

#### 🧪 Development (with nodemon)

```bash
npm run dev
```

---

## 📍 API Endpoints

| Method | Endpoint         | Description                          |
| ------ | ---------------- | ------------------------------------ |
| POST   | /api/auth/signup | Register a new user                  |
| POST   | /api/auth/login  | Authenticate user & return JWT token |

---

## 🔐 Authentication Flow

1. User signs up with email & password
2. Password is hashed using **Bcrypt**
3. User logs in
4. Server validates credentials
5. JWT token is generated and returned
6. Token is used for accessing protected routes

---

## 📦 Features

* User registration & login
* Secure password hashing
* JWT-based authentication
* Clean and scalable structure
