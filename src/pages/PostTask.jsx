// src/pages/PostTask.jsx
import { useState } from "react";
import "../styles/posttask.scss";

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

    console.log("Task posted:", formData);
    setMessage("✅ Task posted successfully!");
    setFormData({ title: "", description: "", credits: "" });

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="post-task-container">
      <div className="header">
        <h2>📤 Post a New Task</h2>
        <p>Share a task for developers to pick and collaborate on.</p>
      </div>

      <form onSubmit={handleSubmit} className="task-form">
        <label>Task Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g. Build Landing Page UI"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Description</label>
        <textarea
          name="description"
          placeholder="Provide details, requirements, and any assets or links..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />

        <label>Credits</label>
        <input
          type="number"
          name="credits"
          placeholder="e.g. 10"
          value={formData.credits}
          onChange={handleChange}
          required
        />

        <button type="submit">🚀 Post Task</button>
        {message && <p className="success-message">{message}</p>}
      </form>
    </div>
  );
}
