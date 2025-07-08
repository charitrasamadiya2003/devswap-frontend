// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/register.scss";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Simulate successful registration
      const fakeUser = {
        username: formData.username,
        email: formData.email,
      };
      const fakeToken = "sample-access-token";

      login(fakeUser, fakeToken);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register for DevSwap</h2>
        {error && <p className="error">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

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

        <button type="submit">Register</button>
        <p>Already have an account? <a href="/">Login</a></p>
      </form>
    </div>
  );
}
