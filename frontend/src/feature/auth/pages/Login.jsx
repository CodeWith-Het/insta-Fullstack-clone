import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  async function submitHandle(e) {
    e.preventDefault();
    setLoading(true)

    const res = await handleLogin(username, password);

    setLoading(false)

    if (res?.token) {
      navigate("/");
    }
    // ❌ Error case
    else {
      alert(res?.message || "Login failed");
    }
  }

  return (
    <div className="auth-container">
      {loading ? (
        <h1>LOADING......</h1>
      ) : (
        <>
          <form onSubmit={submitHandle} className="auth-form">
            <h2>Login</h2>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              name="username"
              placeholder="Enter username"
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Enter Password"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              <button type="button">Register</button>
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
