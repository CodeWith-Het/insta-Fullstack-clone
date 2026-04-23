import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./feature/auth/pages/Login";
import Register from "./feature/auth/pages/Register";
import Feed from "./feature/post/pages/Feed";
import CreatePost from "./feature/post/components/CreatePost";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;