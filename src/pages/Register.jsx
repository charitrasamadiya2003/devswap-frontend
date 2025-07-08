// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/register.scss";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const role = params.get("role") || "developer";

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
        role: role,
      };
      const fakeToken = "sample-access-token";

      login(fakeUser, fakeToken);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  const renderRoleSpecificInfo = () => {
    if (role === "developer") {
      return (
        <>
          <div className="stats">
            <h3>💼 DevSwap Benefits</h3>
            <ul>
              <li>🛠 Hands-on coding tasks</li>
              <li>💰 Earn credits & build portfolio</li>
              <li>🤝 Connect with companies & HRs</li>
            </ul>
          </div>
          <div className="testimonials">
            <blockquote>
              “I gained real-world experience and built my confidence.”
            </blockquote>
            <span>– Aryan, MERN Stack Dev</span>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="stats">
            <h3>📊 Why HRs Join</h3>
            <ul>
              <li>🎯 Outsource technical tasks fast</li>
              <li>⏱ Save hiring & screening time</li>
              <li>📈 Access pre-vetted dev talent</li>
            </ul>
          </div>
          <div className="testimonials">
            <blockquote>
              “DevSwap reduced our task outsourcing time by 70%.”
            </blockquote>
            <span>– Niharika, HR at XoroTech</span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="branding">
          <img src="/logo.png" alt="DevSwap Logo" className="logo" />
          <h1>DevSwap</h1>
          <p className="tagline">Where Devs and HRs Collaborate</p>
        </div>

        <h2>Register as {role === "hr" ? "HR" : "Developer"}</h2>
        <p className="subheading">Create your account and start earning credits.</p>

        <form onSubmit={handleSubmit} className="register-form">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Your name"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>

        <p className="bottom-text">
          Already registered?{" "}
          <Link to={`/login?role=${role}`}>Login as {role === "hr" ? "HR" : "Developer"}</Link>
        </p>
      </div>

      <div className="register-right">
        <div className="illustration">
          <img src="/illustration.svg" alt="Register Illustration" />
        </div>

        {renderRoleSpecificInfo()}

        <div className="footer-note">
          <small>
            Want to switch role?{" "}
            <Link to="/register?role=developer">Developer</Link> |{" "}
            <Link to="/register?role=hr">HR</Link>
          </small>
        </div>
      </div>
    </div>
  );
}
