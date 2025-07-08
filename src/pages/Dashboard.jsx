// src/pages/Dashboard.jsx
import "../styles/dashboard.scss";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="profile-box">
          <div className="avatar">{user?.username?.[0] || "D"}</div>
          <h3>{user?.username || "Developer"}</h3>
          <p>🚀 Full Stack Developer</p>
          <div className="credit-stats">
            <span>💰 Credits</span>
            <strong>{user?.credits || 120}</strong>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="banner">
          <h1>Welcome to <span className="brand">DevSwap</span> 👋</h1>
          <p>Collaborate, contribute, and earn credits to build your dream projects.</p>
        </div>

        <div className="actions-grid">
          <Link to="/post" className="action-box">➕ Post a Task</Link>
          <Link to="/tasks" className="action-box">🛠 Pick a Task</Link>
          <Link to="/my-tasks" className="action-box">📋 My Tasks</Link>
        </div>

        <div className="earn-section" id="credits">
          <h2>💼 Earn Credits</h2>
          <p>Pick tasks from the feed and get rewarded. More credits = more flexibility to post your own.</p>
          <Link to="/tasks" className="earn-btn">Explore Open Tasks</Link>
        </div>
      </main>
    </div>
  );
}
