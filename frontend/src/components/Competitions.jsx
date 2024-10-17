import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Competition.css'; // Ensure this CSS file exists

const Competition = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch artworks from the backend
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('/api/submissions'); // Adjust the route if necessary
        setArtworks(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  const handleVote = async (artworkId) => {
    const token = localStorage.getItem('token'); // Assuming the JWT token is stored in localStorage
    
    if (!token) {
      alert('You need to be logged in to vote!');
      return;
    }

    try {
      await axios.post(`/api/submissions/${artworkId}/vote`, {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the headers
        },
      });

      alert('Thanks for your vote!');
      
      // Update the votes count locally without refetching all artworks
      setArtworks((prevArtworks) =>
        prevArtworks.map((artwork) =>
          artwork._id === artworkId ? { ...artwork, votes: artwork.votes + 1 } : artwork
        )
      );
    } catch (error) {
      console.error('Error voting:', error);
      alert('Voting failed.');
    }
  };

  if (loading) {
    return <div className="loading">Loading competition entries...</div>;
  }

  return (
    <div className="competition-container">
      <h2>Vote for Your Favorite Artwork in the Competition</h2>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <div key={artwork._id} className="artwork-card">
            <img 
              className="artwork-image" 
              src={`http://localhost:5000/${artwork.image}`} 
              alt={artwork.title} 
            />
            <h3 className="artwork-title">{artwork.title}</h3>
            <p className="artwork-description">{artwork.description}</p>
            <p className="artwork-category">Category: {artwork.category}</p>
            <button className="vote-btn" onClick={() => handleVote(artwork._id)}>
              Vote {artwork.votes} {/* Display vote count on the button */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Competition;
