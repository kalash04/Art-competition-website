import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ArtSlider from '../components/ArtSlider';
import '../styles/Home.css'; // Import the styles
const Home = () => {
  const [competitions, setCompetitions] = useState(["wer","werw","ewrwe"]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/competitions')
      .then(res => setCompetitions(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div className="home-container">
      {/* Navbar */}
      <Navbar />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Creative Designs Art Competitions 2024</h1>
          <p>Where creativity meets opportunity. Showcase your best artwork and win amazing prizes!</p>
          <Link to="/submit" className="cta-button">Submit Your Art</Link>
        </div>
      </section>
      {/* Blog Section */}
      <section className="blog-section">
        <div className="blog-content">
          <h2>Welcome to Creative Designs 2024: A Hub for Artistic Talent</h2>
          <p>
            Ready to showcase your creativity and artistic skills? Creative Designs 2024 is the perfect platform for you! 
            Participate in exciting art competitions and be a part of our vibrant community of artists.
          </p>
          <p>
            Our platform is more than just a competition hub; it’s a vibrant community where art enthusiasts and professionals 
            can collaborate, get inspired, and push their creative boundaries.
          </p>
          <h3>Follow Us on Instagram</h3>
          <p>
            Stay updated with the latest news, competitions, and features by following our 
            <a href="https://www.instagram.com/creativedesigns2k24" target="_blank" rel="noopener noreferrer"> official Instagram page</a>: Creative Designs Instagram. 
            Our Instagram is packed with exciting announcements, art showcases, and tips from industry experts. 
            Plus, you'll get an exclusive sneak peek into upcoming contests and events.
          </p>
          <p>
            Our Instagram feed is where art lovers gather to explore stunning pieces from artists across the globe, 
            so don’t forget to tag us using <strong>#CreativeDesigns2k24</strong> for a chance to be featured!
          </p>
        </div>
      </section>
      {/* Art Slider Section */}
      <section className="art-slider-section">
        <h2>Explore Some of Our Art Works</h2>
        <ArtSlider />
      </section>
      {/* Competitions Section */}
      <section className="competitions-section">
        <h2>Current Competitions</h2>
        <div className="competitions-grid">
          {competitions.length > 0 ? (
            competitions.map((competition) => (
              <div key={competition._id} className="competition-card">
                <img src={competition.imageUrl || "/images/default-art.jpg"} alt={competition.name} className="competition-image" />
                <div className="competition-info">
                  <h3>{competition.name}</h3>
                  <p>{competition.description}</p>
                  <Link to={`/competition/${competition._id}`} className="details-link">View Details</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No competitions are currently available.</p>
          )}
        </div>
      </section>
      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>For more information, feel free to reach out to us!</p>
        <div className="contact-links">
          <a href="mailto:support@creativedesigns.com">Email Us</a>
          <a href="https://www.instagram.com/creativedesigns2k24" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
          <a href="https://www.facebook.com/creativedesigns2k24" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i> Facebook
          </a>
        </div>
      </section>
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Creative Designs. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/about">About Us</Link> | <Link to="/contact">Contact</Link>
        </div>
        <div className="social-media">
          <a href="https://www.instagram.com/creativedesigns2k24" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com/creativedesigns2k24" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
        </div>
      </footer>
    </div>
  );
};
export default Home;