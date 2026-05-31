// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/devswap-logo.png";
import "../styles/register.scss";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialRole = params.get("role") || "developer";

  const [role, setRole] = useState(initialRole);
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fakeUser = { username: formData.username, email: formData.email, role };
      login(fakeUser, "sample-access-token");
      navigate("/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    }
  };

  const renderRightPanel = () => {
    if (role === "developer") {
      return (
        <div className="info-panel" key="dev">
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Developers</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">9,200</span>
              <span className="stat-label">Tasks Done</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">28K+</span>
              <span className="stat-label">Credits Earned</span>
            </div>
          </div>

          <div className="features-list">
            <h3>DevSwap Benefits</h3>
            <ul>
              <li><span className="feature-icon">🛠</span><span>Hands-on real coding tasks</span></li>
              <li><span className="feature-icon">💰</span><span>Earn credits & build portfolio</span></li>
              <li><span className="feature-icon">🤝</span><span>Connect with companies & HRs</span></li>
              <li><span className="feature-icon">📈</span><span>Grow your career visibility</span></li>
            </ul>
          </div>

          <blockquote className="testimonial">
            <p>"I gained real-world experience and built my confidence."</p>
            <cite>— Aryan, MERN Stack Developer</cite>
          </blockquote>
        </div>
      );
    }

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
            <span className="stat-number">70%</span>
            <span className="stat-label">Time Saved</span>
          </div>
        </div>

        <div className="features-list">
          <h3>Why HRs Join DevSwap</h3>
          <ul>
            <li><span className="feature-icon">🎯</span><span>Outsource technical tasks fast</span></li>
            <li><span className="feature-icon">⏱</span><span>Save hiring & screening time</span></li>
            <li><span className="feature-icon">📊</span><span>Access pre-vetted dev talent</span></li>
            <li><span className="feature-icon">📬</span><span>Track task completion live</span></li>
          </ul>
        </div>

        <blockquote className="testimonial">
          <p>"DevSwap reduced our task outsourcing time by 70%."</p>
          <cite>— Niharika, HR at XoroTech</cite>
        </blockquote>
      </div>
    );
  };

  return (
    <div className="register-page">
      {/* Left — Form */}
      <div className="register-left">
        <div className="branding">
          <img src={logo} alt="DevSwap Logo" className="logo" />
          <p className="tagline">Collaborate. Earn. Grow.</p>
        </div>

        <div className="form-wrapper">
          <h2 className="form-title">Create your account</h2>
          <p className="form-sub">
            Join as a{" "}
            <span className="role-highlight">
              {role === "hr" ? "HR / Recruiter" : "Developer"}
            </span>
            {" "}and start today.
          </p>

          {/* Role toggle */}
          <div className="role-switcher">
            <button
              type="button"
              className={`role-option ${role === "developer" ? "active" : ""}`}
              onClick={() => setRole("developer")}
            >
              <span className="role-icon">👨‍💻</span>
              Developer
            </button>
            <button
              type="button"
              className={`role-option ${role === "hr" ? "active" : ""}`}
              onClick={() => setRole("hr")}
            >
              <span className="role-icon">🧑‍💼</span>
              HR / Recruiter
            </button>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="yourname"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-wrap">
                <input
                  id="password"
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="toggle-pass"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label="Toggle password"
                >
                  {showPass ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">
              Create Account
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>

          <p className="login-link-text">
            Already have an account?{" "}
            <Link to={`/?role=${role}`}>Login as {role === "hr" ? "HR" : "Developer"}</Link>
          </p>
        </div>
      </div>

      {/* Right — Info panel */}
      <div className="register-right">
        <div className="right-inner">
          <div className="right-header">
            <div className="right-badge">
              {role === "developer" ? "For Developers" : "For Recruiters"}
            </div>
            <h2 className="right-title">
              {role === "developer"
                ? "Start building. Start earning."
                : "Find talent. Ship faster."}
            </h2>
            <p className="right-subtitle">
              {role === "developer"
                ? "Real tasks, real credits, real career growth — all in one platform."
                : "Post tasks, assess developers, and build your dream team effortlessly."}
            </p>
          </div>

          {renderRightPanel()}

          <div className="right-footer">
            Switch role?{" "}
            <Link to="/register?role=developer">Developer</Link>
            {" "}·{" "}
            <Link to="/register?role=hr">HR / Recruiter</Link>
          </div>
        </div>

        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
    </div>
  );
}