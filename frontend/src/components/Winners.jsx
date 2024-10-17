import React from 'react';
import '../styles/Winners.css'; // Make sure to create this file for styles
const Winners = () => {
  // Sample data for winners
  const winners = [
    {
      name: 'John Doe',
      competition: 'Best Digital Art',
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?fit=crop&w=400&h=400', // Replace with actual image URL or path
    },
    {
      name: 'Jane Smith',
      competition: 'Photography Excellence',
      year: 2023,
      imageUrl: 'https://images.unsplash.com/photo-1531177070166-0578fa82714e?fit=crop&w=400&h=400', // Replace with actual image URL or path
    },
    {
      name: 'Alice Johnson',
      competition: 'Traditional Art Mastery',
      year: 2024,
      imageUrl: 'https://images.unsplash.com/photo-1531874824810-9ffb389e3121?fit=crop&w=400&h=400', // Replace with actual image URL or path
    },
  ];
  return (
    <div className="winners-container">
      <h2>Art Competition Winners</h2>
      <div className="winners-list">
        {winners.map((winner, index) => (
          <div key={index} className="winner-card">
            <img src={winner.imageUrl} alt={winner.name} className="winner-image" />
            <h3>{winner.name}</h3>
            <p>Competition: {winner.competition}</p>
            <p>Year: {winner.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Winners;
