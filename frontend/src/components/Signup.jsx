import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";  // Reusing the same CSS for consistent design

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      alert("Signup successful!");
    } catch (err) {
      if (err.response) {
        // Handle specific error from the server
        if (err.response.data.message) {
          alert(`Signup failed: ${err.response.data.message}`);
        } else {
          alert(`Signup failed with status code: ${err.response.status}`);
        }
      } else if (err.request) {
        // Handle error if no response from server
        alert("No response from the server. Please try again.");
      } else {
        // Handle other unknown errors
        alert("Signup failed due to an unknown error.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="login-btn">Signup</button>
        </form>
        <p className="signup-prompt">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
