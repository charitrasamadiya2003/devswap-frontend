// src/pages/MyTasks.jsx
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import "../styles/global.scss";
import "../styles/mytasks.scss"; // New custom styles

export default function MyTasks() {
  const [activeTab, setActiveTab] = useState("posted");
  const [postedTasks, setPostedTasks] = useState([]);
  const [pickedTasks, setPickedTasks] = useState([]);

  useEffect(() => {
    // Simulate data fetch
    setPostedTasks([
      { id: 101, title: "Fix form validation bug", credits: 4 },
      { id: 102, title: "Create user avatar UI", credits: 6 },
    ]);

    setPickedTasks([
      { id: 201, title: "Integrate payment gateway", credits: 10 },
    ]);
  }, []);

  const tasksToShow = activeTab === "posted" ? postedTasks : pickedTasks;

  return (
    <div className="page-container mytasks-page">
      <div className="mytasks-header">
        <h2>My Tasks</h2>
        <div className="tabs">
          <button
            className={activeTab === "posted" ? "active" : ""}
            onClick={() => setActiveTab("posted")}
          >
            Posted Tasks
          </button>
          <button
            className={activeTab === "picked" ? "active" : ""}
            onClick={() => setActiveTab("picked")}
          >
            Picked Tasks
          </button>
        </div>
      </div>

      <div className="task-list">
        {tasksToShow.length === 0 ? (
          <p className="empty-msg">No tasks found in this section.</p>
        ) : (
          tasksToShow.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
