import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="home-page">
      <h1>🎓 Student Management System</h1>
      <p>A full CRUD app using React + Firebase Firestore</p>
      <div className="home-actions">
        <Link to="/create" className="btn btn-primary">➕ Add New Student</Link>
        <Link to="/items" className="btn btn-secondary">📋 View All Students</Link>
      </div>
    </div>
  );
}

export default HomePage;