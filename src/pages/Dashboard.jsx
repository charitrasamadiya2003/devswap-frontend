// src/pages/Dashboard.jsx
import "../styles/dashboard.scss";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: "Credits Earned", value: user?.credits || 120, icon: "💰", color: "stat-blue" },
    { label: "Tasks Completed", value: user?.tasksCompleted || 8, icon: "✅", color: "stat-green" },
    { label: "Tasks Posted", value: user?.tasksPosted || 3, icon: "📌", color: "stat-purple" },
  ];

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="profile-card">
          <div className="avatar-ring">
            <div className="avatar">{user?.username?.[0]?.toUpperCase() || "D"}</div>
          </div>
          <h3 className="profile-name">{user?.username || "Developer"}</h3>
          <span className="role-badge">
            {user?.role === "hr" ? "🧑‍💼 HR / Recruiter" : "👨‍💻 Full Stack Developer"}
          </span>

          <div className="credit-pill">
            <span className="credit-dot" />
            <span className="credit-label">Credits</span>
            <strong className="credit-value">{user?.credits || 120}</strong>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-link active">
            <span className="sidebar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </span>
            Dashboard
          </Link>
          <Link to="/tasks" className="sidebar-link">
            <span className="sidebar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </span>
            Browse Tasks
          </Link>
          <Link to="/post" className="sidebar-link">
            <span className="sidebar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </span>
            Post a Task
          </Link>
          <Link to="/my-tasks" className="sidebar-link">
            <span className="sidebar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </span>
            My Tasks
          </Link>
          <Link to="/dashboard#credits" className="sidebar-link credits-nav">
            <span className="sidebar-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </span>
            Earn Credits
            <span className="nav-dot" />
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Welcome banner */}
        <div className="welcome-banner">
          <div className="welcome-text">
            <p className="welcome-eyebrow">Good to see you back 👋</p>
            <h1>
              Welcome, <span className="brand-name">{user?.username || "Developer"}</span>
            </h1>
            <p className="welcome-sub">
              Collaborate, contribute, and earn credits to build your dream projects.
            </p>
          </div>
          <div className="banner-blobs">
            <div className="b1" /><div className="b2" /><div className="b3" />
          </div>
        </div>

        {/* Stats row */}
        <div className="stats-row">
          {stats.map((s) => (
            <div className={`stat-card ${s.color}`} key={s.label}>
              <span className="stat-icon">{s.icon}</span>
              <div>
                <p className="stat-value">{s.value}</p>
                <p className="stat-label">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="section-header">
          <h2>Quick Actions</h2>
        </div>
        <div className="actions-grid">
          <Link to="/post" className="action-card">
            <div className="action-icon-wrap blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
            </div>
            <div>
              <h3>Post a Task</h3>
              <p>Share what you need done</p>
            </div>
            <span className="action-arrow">→</span>
          </Link>

          <Link to="/tasks" className="action-card">
            <div className="action-icon-wrap purple">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <div>
              <h3>Pick a Task</h3>
              <p>Browse open contributions</p>
            </div>
            <span className="action-arrow">→</span>
          </Link>

          <Link to="/my-tasks" className="action-card">
            <div className="action-icon-wrap teal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
            </div>
            <div>
              <h3>My Tasks</h3>
              <p>Track your progress</p>
            </div>
            <span className="action-arrow">→</span>
          </Link>
        </div>

        {/* Earn credits section */}
        <div className="earn-section" id="credits">
          <div className="earn-content">
            <div className="earn-badge">💼 Earn Credits</div>
            <h2>Turn your skills into currency</h2>
            <p>
              Pick tasks from the feed and get rewarded with credits.
              More credits means more flexibility to post your own projects and unlock opportunities.
            </p>
            <Link to="/tasks" className="earn-btn">
              Explore Open Tasks
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
          <div className="earn-visual">
            <div className="credit-ring">
              <div className="ring r1" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="ring-core">
                <span>💰</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}