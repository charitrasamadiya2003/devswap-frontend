// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import "../styles/login.scss";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("developer");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken, user } = await loginUser({ email, password, role });
      localStorage.setItem("accessToken", accessToken);
      login(user, accessToken);
      navigate("/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const renderRoleSpecificInfo = () => {
    if (role === "developer") {
      return (
        <>
          <div className="stats">
            <h3>🌍 Platform Impact</h3>
            <ul>
              <li>👥 2,500+ Developers Joined</li>
              <li>✅ 9,200 Tasks Completed</li>
              <li>💰 28,000+ Credits Earned</li>
            </ul>
          </div>

          <div className="features">
            <h3>👨‍💻 Why Developers Love DevSwap?</h3>
            <ul>
              <li>🛠 Real-world freelance tasks</li>
              <li>📈 Grow portfolio & resume</li>
              <li>🎯 Earn credits for tasks</li>
              <li>🤝 Connect with tech recruiters</li>
            </ul>
          </div>

          <div className="testimonials">
            <blockquote>
              “DevSwap gave me confidence through real projects.”
            </blockquote>
            <span>– Aarya, React Developer</span>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="stats">
            <h3>📊 HR Usage Highlights</h3>
            <ul>
              <li>🏢 800+ HRs Onboarded</li>
              <li>📌 12,000+ Tasks Posted</li>
              <li>💰 28,000+ Credits Circulated</li>
            </ul>
          </div>

          <div className="features">
            <h3>🧑‍💼 Why HRs Trust DevSwap?</h3>
            <ul>
              <li>🎯 Post tech tasks for assessment</li>
              <li>⚡ Instant access to dev talent</li>
              <li>📝 Track task completion</li>
              <li>📬 Connect with contributors</li>
            </ul>
          </div>

          <div className="testimonials">
            <blockquote>
              “I tested 15 devs in one day without interviews.”
            </blockquote>
            <span>– Riya, HR at TechCore</span>
          </div>
        </>
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="branding">
          <img src="/logo.png" alt="DevSwap Logo" className="logo" />
          <h1>DevSwap</h1>
          <p className="tagline">Collaborate. Earn. Grow.</p>
        </div>

        <h2>Login to DevSwap</h2>
        <p className="subheading">Tailored for Developers & HRs working together.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>Your Role</label>
          <div className="custom-role-options">
            <label className={`role-option ${role === "developer" ? "active" : ""}`}>
              <input
                type="radio"
                name="role"
                value="developer"
                checked={role === "developer"}
                onChange={(e) => setRole(e.target.value)}
              />
              👨‍💻 I am a Developer
            </label>
            <label className={`role-option ${role === "hr" ? "active" : ""}`}>
              <input
                type="radio"
                name="role"
                value="hr"
                checked={role === "hr"}
                onChange={(e) => setRole(e.target.value)}
              />
              🧑‍💼 I am an HR / Recruiter
            </label>
          </div>

          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>

        <p className="bottom-text">
          Don’t have an account? <Link to="/register?role=developer">Register as Developer</Link> | <Link to="/register?role=hr">Register as HR</Link>
        </p>
      </div>

      <div className="login-right">
        <div className="illustration">
          <img src="/illustration.svg" alt="Login Visual" />
        </div>

        {renderRoleSpecificInfo()}

        <div className="footer-note">
          <small>New to DevSwap? <Link to="/register">Start building today</Link></small>
        </div>
      </div>
    </div>
  );
}
