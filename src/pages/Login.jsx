// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/AuthService";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/devswap-logo.png";
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
        <div className="info-panel" key="developer">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Developers Joined</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">9,200</span>
              <span className="stat-label">Tasks Completed</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">28K+</span>
              <span className="stat-label">Credits Earned</span>
            </div>
          </div>

          <div className="features-list">
            <h3>Why Developers Love DevSwap</h3>
            <ul>
              <li><span className="feature-icon">🛠</span><span>Real-world freelance tasks</span></li>
              <li><span className="feature-icon">📈</span><span>Grow your portfolio & resume</span></li>
              <li><span className="feature-icon">🎯</span><span>Earn credits for every task</span></li>
              <li><span className="feature-icon">🤝</span><span>Connect with tech recruiters</span></li>
            </ul>
          </div>

          <blockquote className="testimonial">
            <p>"DevSwap gave me confidence through real projects."</p>
            <cite>— Aarya, React Developer</cite>
          </blockquote>
        </div>
      );
    } else {
      return (
        <div className="info-panel" key="hr">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">800+</span>
              <span className="stat-label">HRs Onboarded</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">12K+</span>
              <span className="stat-label">Tasks Posted</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">28K+</span>
              <span className="stat-label">Credits Circulated</span>
            </div>
          </div>

          <div className="features-list">
            <h3>Why HRs Trust DevSwap</h3>
            <ul>
              <li><span className="feature-icon">🎯</span><span>Post tech tasks for assessment</span></li>
              <li><span className="feature-icon">⚡</span><span>Instant access to dev talent</span></li>
              <li><span className="feature-icon">📝</span><span>Track task completion live</span></li>
              <li><span className="feature-icon">📬</span><span>Connect with top contributors</span></li>
            </ul>
          </div>

          <blockquote className="testimonial">
            <p>"I tested 15 devs in one day without interviews."</p>
            <cite>— Riya, HR at TechCore</cite>
          </blockquote>
        </div>
      );
    }
  };

  return (
    <div className="login-page">
      {/* Left Panel — Form */}
      <div className="login-left">
        <div className="branding">
          <img src={logo} alt="DevSwap Logo" className="logo" />
          <p className="tagline">Collaborate. Earn. Grow.</p>
        </div>

        <div className="form-wrapper">
          <h2 className="welcome-title">Welcome back</h2>
          <p className="welcome-sub">Log in to your DevSwap account</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="role-switcher">
              <label
                className={`role-option ${role === "developer" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="role"
                  value="developer"
                  checked={role === "developer"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="role-icon">👨‍💻</span>
                <span>Developer</span>
              </label>
              <label
                className={`role-option ${role === "hr" ? "active" : ""}`}
              >
                <input
                  type="radio"
                  name="role"
                  value="hr"
                  checked={role === "hr"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <span className="role-icon">🧑‍💼</span>
                <span>HR / Recruiter</span>
              </label>
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">
              <span>Login</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>

          <p className="register-links">
            Don't have an account?{" "}
            <Link to="/register?role=developer">Register as Developer</Link>
            {" "}or{" "}
            <Link to="/register?role=hr">Register as HR</Link>
          </p>
        </div>
      </div>

      {/* Right Panel — Info */}
      <div className="login-right">
        <div className="right-inner">
          <div className="right-header">
            <div className="right-badge">
              {role === "developer" ? "For Developers" : "For Recruiters"}
            </div>
            <h2 className="right-title">
              {role === "developer"
                ? "Build. Ship. Get Noticed."
                : "Find. Test. Hire Faster."}
            </h2>
            <p className="right-subtitle">
              {role === "developer"
                ? "Complete real tasks, earn credits, and land your next opportunity."
                : "Post assessments, evaluate talent, and shortlist the best — all in one place."}
            </p>
          </div>

          {renderRoleSpecificInfo()}

          <div className="right-footer">
            New to DevSwap?{" "}
            <Link to="/register">Start building today →</Link>
          </div>
        </div>

        {/* Decorative blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
    </div>
  );
}