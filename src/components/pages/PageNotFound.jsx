import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found">
      <h2>404 — Page Not Found</h2>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
}

export default PageNotFound;