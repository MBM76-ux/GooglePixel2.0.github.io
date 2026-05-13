import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">📚 Student Manager</Link>
      <ul className="nav-links">
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/items">All Students</NavLink></li>
        <li><NavLink to="/create">Add Student</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;