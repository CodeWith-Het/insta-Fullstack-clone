import React, { useState }  from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss"

const Login = () => {

  const [username, setUsername] = useState(" ")
  const [password, setPassword] = useState(" ")

  async function submitHandle(e) {
   e.preventDefault();
    
   
  }
 
  return (
    <div className="auth-container">
      <form onSubmit={submitHandle} className="auth-form">
        <h2>Login</h2>

        <input
          onInput={(e)=>{setUsername(e.target.value)}}
          type="username"
          name="username"
          placeholder="Enter username"
        />

        <input
          onInput={(e)=>{setPassword(e.target.value)}}
          type="password"
          name="password"
          placeholder="Enter Password"
          
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have account
        <Link to="/register">
          <button>Register</button>
        </Link>
      </p>
    </div>
  );
};

export default Login;
