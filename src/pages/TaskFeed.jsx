// src/pages/TaskFeed.jsx
import TaskCard from "../components/TaskCard.jsx";
import { useEffect, useState } from "react";

export default function TaskFeed() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Simulated fetch
    const dummyTasks = [
      { id: 1, title: "Build a React Form", description: "Need a working login/register form.", credits: 20 },
      { id: 2, title: "Fix Navbar Responsiveness", description: "Navbar is breaking on mobile.", credits: 15 },
      { id: 3, title: "Add Animations", description: "Use framer-motion for transitions.", credits: 25 },
    ];
    setTasks(dummyTasks);
  }, []);

  return (
    <div className="page-container">
      <h2>Available Tasks</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
