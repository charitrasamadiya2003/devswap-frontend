// src/pages/PostTask.jsx
import { useState } from "react";
import "../styles/global.scss";

export default function PostTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credits: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate posting
    console.log("Task posted:", formData);
    setMessage("Task posted successfully!");
    setFormData({ title: "", description: "", credits: "" });
  };

  return (
    <div className="page-container">
      <h2>Post a New Task</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />

        <input
          type="number"
          name="credits"
          placeholder="Credits"
          value={formData.credits}
          onChange={handleChange}
          required
        />

        <button type="submit">Post Task</button>
      </form>

      {message && <p style={{ color: "green", marginTop: "1rem" }}>{message}</p>}
    </div>
  );
}
