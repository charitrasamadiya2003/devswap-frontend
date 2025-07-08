// src/pages/TaskFeed.jsx
import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard.jsx";
import "../styles/taskfeed.scss";

export default function TaskFeed() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const dummyTasks = [
      { id: 1, title: "Build a React Form", description: "Need a working login/register form.", credits: 20 },
      { id: 2, title: "Fix Navbar Responsiveness", description: "Navbar is breaking on mobile.", credits: 15 },
      { id: 3, title: "Add Animations", description: "Use framer-motion for transitions.", credits: 25 },
      { id: 4, title: "Dark Mode UI", description: "Implement dark mode with toggle.", credits: 18 },
    ];
    setTasks(dummyTasks);
    setFiltered(dummyTasks);
  }, []);

  useEffect(() => {
    const result = tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, tasks]);

  return (
    <div className="taskfeed-container">
      <div className="header">
        <h2>🔍 Browse Available Tasks</h2>
        <p>Find tasks to earn credits and showcase your development skills.</p>
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="task-list">
        {filtered.length === 0 ? (
          <p className="empty-msg">No tasks match your search.</p>
        ) : (
          filtered.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
