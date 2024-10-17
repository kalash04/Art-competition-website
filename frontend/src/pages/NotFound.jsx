import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; // Create this CSS file to style the NotFound page
const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="go-home-btn">
        Go back to Home
      </Link>
    </div>
  );
};
export default NotFound;