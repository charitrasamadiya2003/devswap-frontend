// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/login.scss";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulated login success
      const fakeUser = { username: "DevUser", email: formData.email };
      const fakeToken = "sample-access-token";

      login(fakeUser, fakeToken);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login to DevSwap</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
        <p>Don’t have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
}
