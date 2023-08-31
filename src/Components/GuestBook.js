import React, { useState, useEffect } from 'react';
import db from '../services/firebase';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import './../styles/GuestBook.css';

function GuestBook() {
  const [guestBookData, setGuestBookData] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  const [newRating, setNewRating] = useState(3);
  const [name, setName] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    // Hämta befintliga inlägg från Firebase när komponenten laddas
    const unsubscribe = onSnapshot(collection(db, 'guestbook'), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGuestBookData(data);
    });

    // Avsluta prenumerationen när komponenten avmonteras för att undvika minnesläckor
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newEntry.trim() === '' || name.trim() === '' || fromDate.trim() === '' || toDate.trim() === '') {
      return; // Ignorera tomma inlägg
    }

    try {
      // Lägg till ett nytt dokument i Firebase-samlingen med det nya inlägget och betyget
      await addDoc(collection(db, 'guestbook'), {
        name,
        fromDate,
        toDate,
        log: newEntry,
        rating: newRating,
      });

      // Återställ formuläret efter att inlägget har lagts till
      setNewEntry('');
      setNewRating(1);
      setName('');
      setFromDate('');
      setToDate('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  
  return (
    <div>
      <div className="guestbook-container">
        <h3>Lämna gärna ett inlägg om hur ni haft det</h3>
        <form onSubmit={handleSubmit}>
          <label style={{ fontFamily: "'Dancing Script', cursive" }}>
            Namn
            <input 
                className="input-field" 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                
                />
          </label>
          <label style={{ fontFamily: "'Dancing Script', cursive" }}>
            Ankomst
            <input 
                className="input-field" 
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                required 
                />
          </label>
          <label style={{ fontFamily: "'Dancing Script', cursive" }}>
            Avgång
            <input
                className="input-field" 
                type="date" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)} 
                required 
                />
          </label>
          <label>
  <div className="star-rating">
    <span className={`star ${newRating >= 1 ? 'filled' : ''}`} onClick={() => setNewRating(1)}>&#9733;</span>
    <span className={`star ${newRating >= 2 ? 'filled' : ''}`} onClick={() => setNewRating(2)}>&#9733;</span>
    <span className={`star ${newRating >= 3 ? 'filled' : ''}`} onClick={() => setNewRating(3)}>&#9733;</span>
    <span className={`star ${newRating >= 4 ? 'filled' : ''}`} onClick={() => setNewRating(4)}>&#9733;</span>
    <span className={`star ${newRating >= 5 ? 'filled' : ''}`} onClick={() => setNewRating(5)}>&#9733;</span>
  </div>
</label>
          <label>
            <textarea 
                placeholder='Skriv lite om hur ni haft det. Någonstans man kanske borde äta på, nått ställe man bara inte kan missa? Förbättringsförslag? ' 
                value={newEntry} 
                onChange={(e) => setNewEntry(e.target.value)}
                style={{ height: '150px', width: '350px'}}
                required
             />
          </label>
          <button type="submit">Skicka</button>
        </form>
      </div>
      <div className="guestbook-entries">
  <h3>Tidigare Besökare:</h3>
  <ul>
    {guestBookData.map((entry) => (
      <li key={entry.id} className="guestbook-entry">
        <div className="guestbook-content">
          <div className="star-rating">
            {[...Array(entry.rating)].map((_, index) => (
              <span key={index} className="star filled">&#9733;</span>
            ))}
            {[...Array(5 - entry.rating)].map((_, index) => (
              <span key={index} className="star">&#9733;</span>
            ))}
          </div>
          <p className="fromdate">{formatDate(entry.fromDate)}</p>
          <p className="todate"> {formatDate(entry.toDate)}</p>
          <p className="log">{entry.log}</p>
          <p className="name">/{entry.name}</p>
        </div>
      </li>
    ))}
  </ul>
</div>
    </div>
  );
}

export default GuestBook;
