import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="card not-found-card">
      <h2>404 - Page Not Found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/" className="btn-secondary">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;