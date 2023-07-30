import React from 'react';
import './Meny.css';

function Meny() {
  return (
    <nav>
      <ul className='Menu'>
        <li><a href="/">Hem</a></li>
        <li><a title='Kolla lediga datum!' href="/calender">Kalender</a></li>
        <li><a href="/pictures">Bilder</a></li>
        <li><a href="/contact">Kontakt</a></li>
        <li><a href="/information">Information</a></li>
      </ul>
    </nav>
  );
}

export default Meny;

