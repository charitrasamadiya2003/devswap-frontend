// src/components/TaskCard.jsx
import "../styles/TaskCard.scss";

export default function TaskCard({ task }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <span className="credits">💰 {task.credits} credits</span>
    </div>
  );
}
