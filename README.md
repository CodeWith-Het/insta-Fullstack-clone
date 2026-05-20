# 📱 Insta-Clone

A full-stack, feature-rich social media application built with the MERN stack (MongoDB, Express.js, React.js, Node.js). This project implements core social networking features like seamless authentication, complex follow/unfollow mechanisms, real-time feed updates, and image handling.

## 🚀 Features Highlights

### 1. 👥 Advanced Follow System
* **Dynamic Follow/Unfollow:** Users can easily follow or unfollow other accounts, automatically updating both `followersCount` and `followingCount` in the database.
* **Follow Request Pipeline:** Complete logic for sending, accepting, and rejecting follow requests (Pending -> Accepted/Rejected states).
* **Self-Follow Protection:** Frontend and Backend validation to prevent users from sending follow requests to their own accounts (UI conditionally renders an "It's You" disabled button).

### 2. 🖼️ Post & Feed Management
* **ImageKit Integration:** Secure and fast image uploading for creating posts using `@imagekit/nodejs`.
* **Interactive Feed:** Fetches a tailored feed of posts, sorting them chronologically.
* **Like/Unlike Toggle:** Users can like and unlike posts. The backend efficiently increments/decrements the `likeCounter` and synchronizes state using Custom React Hooks and Context API.

### 3. 🔐 Authentication & Security
* **JWT & HttpOnly Cookies:** Secure login/registration system utilizing JSON Web Tokens (JWT) stored safely in `HttpOnly`, `secure`, and `SameSite` cookies to prevent XSS attacks.
* **CORS Configured:** Strictly configured Cross-Origin Resource Sharing (CORS) to allow authenticated requests containing credentials between the React frontend and Express backend.

### 4. ⚡ State Management & UI/UX
* **Context API + Custom Hooks:** Clean global state management (e.g., `PostContext`, `useFollow`, `usePost`) to ensure immediate UI updates without needing page reloads.
* **Action-Specific Loading States:** Granular loading indicators (e.g., "Accepting...", "Wait...") to prevent duplicate API calls and enhance user experience.

## 🛠️ Tech Stack

**Frontend:**
* React.js
* Tailwind CSS / SCSS
* Axios (with `withCredentials: true` interceptors)
* Context API

**Backend:**
* Node.js & Express.js
* MongoDB & Mongoose (Optimized using modern `returnDocument: 'after'` syntax)
* JSON Web Tokens (JWT) & bcrypt
* ImageKit (for cloud image storage)

## 💻 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed on your machine.

### Installation

1. Clone the repository:
   ```bashgit
   git clone https://github.com/CodeWith-Het/insta-Fullstack-clone.git


2.Install Backend Dependencies:
cd backend
npm install

3.Install Frontend Dependencies:
cd frontend
npm install

4.Environment Variables Setup:
Create a .env file in the backend directory and add the following:
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key

5.Run the Application:
Start backend: npm run dev (Runs on port 3000)
Start frontend: npm run dev (Runs on port 5173)

🐛 Recent Optimizations
-->CORS Wildcard Issue Resolved: Explicitly defined allowed origins instead of using the wildcard * to securely accept credentials.

-->Mongoose Deprecation Warning Fixed: Replaced legacy { new: true } with { returnDocument: 'after' } in findOneAndUpdate operations.

-->Context Array Nullability Bug Fixed: Ensured initial states for feeds are empty arrays [] rather than null to prevent map/iterable crashes on initial render.
