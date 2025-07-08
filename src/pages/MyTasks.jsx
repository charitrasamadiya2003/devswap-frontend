// src/pages/MyTasks.jsx
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import "../styles/global.scss";

export default function MyTasks() {
  const [myTasks, setMyTasks] = useState([]);

  useEffect(() => {
    // Simulated tasks user has posted or picked
    setMyTasks([
      { id: 101, title: "Fix form validation bug", credits: 4 },
      { id: 102, title: "Create user avatar UI", credits: 6 },
    ]);
  }, []);

  return (
    <div className="page-container">
      <h2>My Posted/Picked Tasks</h2>
      <div className="task-list">
        {myTasks.length === 0 ? (
          <p>You haven’t posted or picked any tasks yet.</p>
        ) : (
          myTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
