// src/components/TaskCard.jsx
import "../styles/TaskCard.scss";

export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div className="task-info">
        <h4>{task.title}</h4>
        <p className="description">{task.description || "No description provided."}</p>
      </div>
      <div className="task-meta">
        <div className="credits">💰 {task.credits} Credits</div>
        {task.tag && <div className="tag">{task.tag}</div>}
      </div>
    </div>
  );
}
