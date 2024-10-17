import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import '../styles/Submit.css'; // Import the updated CSS

const Submit = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: null,
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false); // To track authentication status
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    // Check if the user is authenticated by checking for the token
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    
    if (!token) {
      alert('You must be logged in to submit artwork');
      navigate('/login'); // Redirect to login if no token
      return;
    }

    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('description', formData.description);
    submissionData.append('category', formData.category);
    submissionData.append('image', formData.image);

    try {
      await axios.post('/api/submissions', submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` // Include the token in the request headers
        },
      });
      alert('Submission successful!');
      // Optionally redirect to a different page after submission
      navigate('/thank-you'); // Redirect to a thank you or competition page
    } catch (err) {
      console.error(err);
      alert('Submission failed.');
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Optionally show a loading state
  }

  return (
    <div className="submit-container">
      <div className="submit-form-wrapper">
        <h2>Submit Your Artwork</h2>
        <form onSubmit={handleSubmit} className="submit-form">
          <input
            type="text"
            name="title"
            placeholder="Artwork Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Digital Art">Digital Art</option>
            <option value="Traditional Art">Traditional Art</option>
            <option value="Photography">Photography</option>
          </select>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
          <button type="submit">Submit Artwork</button>
        </form>
      </div>
    </div>
  );
};

export default Submit;
