// src/components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Navbar.scss";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <nav className="devswap-navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          DevSwap
        </Link>
        {isLoggedIn && (
          <>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/post">Post Task</NavLink>
            <NavLink to="/my-tasks">My Tasks</NavLink>
            <NavLink to="/dashboard#credits">Earn Credits</NavLink>
          </>
        )}
      </div>

      <div className="navbar-right">
        {isLoggedIn ? (
          <div className="profile">
            <span className="username">Hi, {user?.username}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <>
            <NavLink to="/">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
