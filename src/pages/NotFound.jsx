// src/pages/NotFound.jsx
import { Link } from "react-router-dom";
import "../styles/global.scss";

export default function NotFound() {
  return (
    <div className="page-container" style={{ textAlign: "center", paddingTop: "4rem" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" style={{ color: "#00d8ff", textDecoration: "underline" }}>
        Go to Home
      </Link>
    </div>
  );
}
