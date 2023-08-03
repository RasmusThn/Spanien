import React, { useState, useEffect } from 'react';
import frontImage from '../images/front.jpg';
import rosorImage from '../images/rosor.jpg';
import tennisImage from '../images/tennisbana.jpg';
import poolImage from '../images/poolen.jpg';
import './../styles/HomePage.css';

const images = [frontImage, rosorImage, tennisImage, poolImage];
const intervalDuration = 3000; // Time in milliseconds for each slide

function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to switch to the next image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    // Set up the interval to switch images automatically
    const intervalId = setInterval(goToNextImage, intervalDuration);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
<p className='rubriker'>Välkommen</p>
    <div className="slideshow">
      {images.map((image, index) => (
        <img
        key={index}
        src={image}
        className={`front-image ${index === currentImageIndex ? 'active' : ''}`}
        alt={`img${index}`}
        />
        ))}
    </div>
     <div className="links-container">
     <p className='rubriker'>Länkar</p>
     <h3>Hitta på</h3>
     <h4><a href='https://www.spain.info/en/destination/alicante-alacant/' target="_blank" rel="noreferrer">Visit Alicante</a></h4>
     <h3>Mat</h3>
     <h4><a href='https://en.patagoniagranalacant.com/' target="_blank" rel="noreferrer">Patagonia Steak House</a></h4>
     <h3>Shopping</h3>
     <h4><a href='http://ccgranalacant.com/' target="_blank" rel="noreferrer">Gran Alacant Shopping Mall</a></h4>
   </div>
        </div>
    
  );
}

export default HomePage;
