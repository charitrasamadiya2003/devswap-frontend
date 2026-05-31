// src/pages/MyTasks.jsx
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import "../styles/mytasks.scss";

export default function MyTasks() {
  const [activeTab, setActiveTab] = useState("posted");
  const [postedTasks, setPostedTasks] = useState([]);
  const [pickedTasks, setPickedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch
    setTimeout(() => {
      setPostedTasks([
        { id: 101, title: "Fix form validation bug", credits: 4, status: "open", date: "May 28, 2026" },
        { id: 102, title: "Create user avatar UI", credits: 6, status: "in-progress", date: "May 25, 2026" },
      ]);
      setPickedTasks([
        { id: 201, title: "Integrate payment gateway", credits: 10, status: "in-progress", date: "May 29, 2026" },
      ]);
      setLoading(false);
    }, 400);
  }, []);

  const tasksToShow = activeTab === "posted" ? postedTasks : pickedTasks;

  const statusColor = (s) => {
    if (s === "open") return "status-open";
    if (s === "in-progress") return "status-progress";
    if (s === "done") return "status-done";
    return "";
  };

  const statusLabel = (s) => {
    if (s === "open") return "Open";
    if (s === "in-progress") return "In Progress";
    if (s === "done") return "Completed";
    return s;
  };

  return (
    <div className="mytasks-page">

      {/* Page header */}
      <div className="mytasks-header">
        <div className="header-text">
          <p className="header-eyebrow">Your workspace</p>
          <h1>My Tasks</h1>
          <p className="header-sub">
            Track everything you've posted or picked up across DevSwap.
          </p>
        </div>

        {/* Summary chips */}
        <div className="summary-chips">
          <div className="chip chip-blue">
            <span className="chip-num">{postedTasks.length}</span>
            <span className="chip-label">Posted</span>
          </div>
          <div className="chip chip-purple">
            <span className="chip-num">{pickedTasks.length}</span>
            <span className="chip-label">Picked Up</span>
          </div>
          <div className="chip chip-teal">
            <span className="chip-num">
              {[...postedTasks, ...pickedTasks].reduce((a, t) => a + (t.credits || 0), 0)}
            </span>
            <span className="chip-label">Total Credits</span>
          </div>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="tab-bar">
        <button
          className={`tab-btn ${activeTab === "posted" ? "active" : ""}`}
          onClick={() => setActiveTab("posted")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          Posted Tasks
          <span className="tab-count">{postedTasks.length}</span>
        </button>
        <button
          className={`tab-btn ${activeTab === "picked" ? "active" : ""}`}
          onClick={() => setActiveTab("picked")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
          Picked Tasks
          <span className="tab-count">{pickedTasks.length}</span>
        </button>
        <div className={`tab-indicator ${activeTab === "picked" ? "right" : "left"}`} />
      </div>

      {/* Task list */}
      <div className="task-list-area">
        {loading ? (
          <div className="skeleton-list">
            {[1, 2, 3].map((i) => (
              <div className="skeleton-card" key={i}>
                <div className="skel skel-title" />
                <div className="skel skel-meta" />
              </div>
            ))}
          </div>
        ) : tasksToShow.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              {activeTab === "posted" ? "📌" : "🛠"}
            </div>
            <h3>No {activeTab === "posted" ? "posted" : "picked"} tasks yet</h3>
            <p>
              {activeTab === "posted"
                ? "Share a task with the community and get it done."
                : "Browse open tasks and start earning credits."}
            </p>
            <a
              href={activeTab === "posted" ? "/post" : "/tasks"}
              className="empty-cta"
            >
              {activeTab === "posted" ? "Post a Task" : "Browse Tasks"} →
            </a>
          </div>
        ) : (
          <div className="task-grid">
            {tasksToShow.map((task) => (
              <div className="task-row" key={task.id}>
                {/* If TaskCard is used, pass task. We also add status + meta overlay. */}
                <div className="task-row-inner">
                  <TaskCard task={task} />
                  <div className="task-meta-row">
                    <span className={`status-badge ${statusColor(task.status)}`}>
                      <span className="status-dot" />
                      {statusLabel(task.status)}
                    </span>
                    <span className="task-date">{task.date}</span>
                    <span className="task-credits">
                      <span className="credits-icon">💰</span>
                      {task.credits} credits
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}