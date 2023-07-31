import React from 'react';
import frontImage from '../images/front.jpg'; 
import '../App.css';

function HomePage() {
  return (
    <div >
      
        <img src={frontImage} className="front-image" alt='imgfront' id='img' />
       
      </div>
  );
}

export default HomePage;