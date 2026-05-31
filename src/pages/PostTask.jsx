// src/pages/PostTask.jsx
import { useState } from "react";
import "../styles/posttask.scss";

const CATEGORIES = ["Frontend", "Backend", "Full Stack", "UI/UX", "DevOps", "Mobile", "Other"];
const DIFFICULTY = ["Beginner", "Intermediate", "Advanced"];

export default function PostTask() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    credits: "",
    category: "",
    difficulty: "",
    deadline: "",
  });
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      // Simulate API call
      await new Promise((res) => setTimeout(res, 800));
      console.log("Task posted:", formData);
      setStatus("success");
      setFormData({ title: "", description: "", credits: "", category: "", difficulty: "", deadline: "" });
      setTimeout(() => setStatus(null), 4000);
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  const charCount = formData.description.length;

  return (
    <div className="posttask-page">

      {/* Page header */}
      <div className="posttask-header">
        <p className="header-eyebrow">Share with the community</p>
        <h1>Post a New Task</h1>
        <p className="header-sub">
          Describe what needs doing, set a credit reward, and let developers pick it up.
        </p>
      </div>

      <div className="posttask-layout">
        {/* Form card */}
        <div className="form-card">
          <form onSubmit={handleSubmit} className="task-form">

            {/* Title */}
            <div className="field">
              <label htmlFor="title">
                Task Title
                <span className="required">*</span>
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="e.g. Build a Landing Page UI"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category + Difficulty row */}
            <div className="field-row">
              <div className="field">
                <label htmlFor="category">Category</label>
                <div className="select-wrap">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>

              <div className="field">
                <label htmlFor="difficulty">Difficulty</label>
                <div className="select-wrap">
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                  >
                    <option value="" disabled>Select difficulty</option>
                    {DIFFICULTY.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  <svg className="select-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="field">
              <label htmlFor="description">
                Description
                <span className="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe requirements, tech stack, assets, links, or anything a developer needs to get started..."
                value={formData.description}
                onChange={handleChange}
                rows={6}
                required
              />
              <span className={`char-count ${charCount > 800 ? "warn" : ""}`}>
                {charCount} / 1000
              </span>
            </div>

            {/* Credits + Deadline row */}
            <div className="field-row">
              <div className="field">
                <label htmlFor="credits">
                  Credits Reward
                  <span className="required">*</span>
                </label>
                <div className="credits-input-wrap">
                  <span className="credits-prefix">💰</span>
                  <input
                    id="credits"
                    type="number"
                    name="credits"
                    placeholder="e.g. 10"
                    min="1"
                    max="500"
                    value={formData.credits}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="deadline">Deadline (optional)</label>
                <input
                  id="deadline"
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Status messages */}
            {status === "success" && (
              <div className="alert alert-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Task posted successfully! Developers can now pick it up.
              </div>
            )}
            {status === "error" && (
              <div className="alert alert-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Something went wrong. Please try again.
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner" />
                  Posting...
                </>
              ) : (
                <>
                  Post Task
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Tips sidebar */}
        <aside className="tips-sidebar">
          <div className="tips-card">
            <h3 className="tips-title">
              <span>💡</span> Tips for a great post
            </h3>
            <ul className="tips-list">
              <li>
                <span className="tip-icon">🎯</span>
                <span>Be specific about the deliverable — vague tasks get fewer takers.</span>
              </li>
              <li>
                <span className="tip-icon">🛠</span>
                <span>Mention the tech stack or tools the developer should use.</span>
              </li>
              <li>
                <span className="tip-icon">💰</span>
                <span>Fair credits attract better contributors. Consider the effort involved.</span>
              </li>
              <li>
                <span className="tip-icon">📎</span>
                <span>Add links to designs, repos, or reference docs in the description.</span>
              </li>
              <li>
                <span className="tip-icon">📅</span>
                <span>Set a realistic deadline so developers can plan their time.</span>
              </li>
            </ul>
          </div>

          <div className="stats-mini">
            <div className="mini-stat">
              <span className="mini-num">9,200+</span>
              <span className="mini-label">Tasks Completed</span>
            </div>
            <div className="mini-stat">
              <span className="mini-num">2,500+</span>
              <span className="mini-label">Active Developers</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}