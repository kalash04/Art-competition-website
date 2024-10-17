import React, { useState, useEffect, useRef } from 'react';
import '../styles/ArtSlider.css'; // Import the CSS for the slider
import image1 from '../assets/images/img1.jpg';
import image2 from '../assets/images/img2.jpg';
import image3 from '../assets/images/img3.jpg';
import image4 from '../assets/images/img4.jpg';
import image5 from '../assets/images/img5.jpg';

const ArtSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const artImages = [image1, image2, image3, image4, image5];
  const intervalDuration = 3000;

  // Use ref to store the interval ID
  const sliderInterval = useRef(null);

  const startAutoSlide = () => {
    sliderInterval.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === artImages.length - 1 ? 0 : prevIndex + 1
      );
    }, intervalDuration);
  };

  const handleNext = () => {
    clearInterval(sliderInterval.current); // Stop auto-slide on user interaction
    setCurrentIndex((prevIndex) =>
      prevIndex === artImages.length - 1 ? 0 : prevIndex + 1
    );
    startAutoSlide(); // Restart the auto-slide after the interaction
  };

  const handlePrev = () => {
    clearInterval(sliderInterval.current); // Stop auto-slide on user interaction
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? artImages.length - 1 : prevIndex - 1
    );
    startAutoSlide(); // Restart the auto-slide after the interaction
  };

  const goToSlide = (index) => {
    clearInterval(sliderInterval.current); // Stop auto-slide on user interaction
    setCurrentIndex(index);
    startAutoSlide(); // Restart the auto-slide after the interaction
  };

  useEffect(() => {
    startAutoSlide(); // Start auto-slide when component mounts
    return () => clearInterval(sliderInterval.current); // Cleanup on unmount
  }, []);

  return (
    <div className="art-slider-container">
      <button className="slider-arrow left" onClick={handlePrev}>
        &#10094;
      </button>
      <div className="art-slider">
        <img
          src={artImages[currentIndex]}
          alt={`Art ${currentIndex + 1}`}
          className="art-image"
        />
      </div>
      <button className="slider-arrow right" onClick={handleNext}>
        &#10095;
      </button>
      <div className="art-dots">
        {artImages.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ArtSlider;
