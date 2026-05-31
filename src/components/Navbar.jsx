// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import logo from "../assets/devswap-logo.png";
import "../styles/Navbar.scss";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className={`devswap-navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Subtle top accent line */}
      <div className="navbar-accent-line" />

      <div className="navbar-inner">
        {/* Left — Logo + Nav links */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand" onClick={handleNavClick}>
            <img src={logo} alt="DevSwap Logo" className="navbar-logo" />
          </Link>

          {isLoggedIn && (
            <div className="nav-links">
              <NavLink to="/dashboard" onClick={handleNavClick}>Dashboard</NavLink>
              <NavLink to="/tasks" onClick={handleNavClick}>Tasks</NavLink>
              <NavLink to="/post" onClick={handleNavClick}>Post Task</NavLink>
              <NavLink to="/my-tasks" onClick={handleNavClick}>My Tasks</NavLink>
              <NavLink to="/dashboard#credits" className="credits-link" onClick={handleNavClick}>
                <span className="credits-dot" />
                Earn Credits
              </NavLink>
            </div>
          )}
        </div>

        {/* Right — Auth actions */}
        <div className="navbar-right">
          {isLoggedIn ? (
            <div className="profile">
              <div className="user-chip">
                <div className="avatar">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="username">Hi, {user?.username}</span>
              </div>
              <button className="logout-btn" onClick={logout}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <NavLink to="/" className="login-link">Login</NavLink>
              <NavLink to="/register" className="register-btn">Get Started</NavLink>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="mobile-menu">
          {isLoggedIn ? (
            <>
              <div className="mobile-user">
                <div className="avatar">{user?.username?.[0]?.toUpperCase() || "U"}</div>
                <span>Hi, {user?.username}</span>
              </div>
              <NavLink to="/dashboard" onClick={handleNavClick}>Dashboard</NavLink>
              <NavLink to="/tasks" onClick={handleNavClick}>Tasks</NavLink>
              <NavLink to="/post" onClick={handleNavClick}>Post Task</NavLink>
              <NavLink to="/my-tasks" onClick={handleNavClick}>My Tasks</NavLink>
              <NavLink to="/dashboard#credits" onClick={handleNavClick}>Earn Credits</NavLink>
              <button className="mobile-logout" onClick={() => { logout(); handleNavClick(); }}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/" onClick={handleNavClick}>Login</NavLink>
              <NavLink to="/register" onClick={handleNavClick}>Register</NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}