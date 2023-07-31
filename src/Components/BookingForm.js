import React, { useState } from 'react';

const BookingForm = ({ selectedDates }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the booking submission here
    // For this example, we'll just log the data
    const bookingData = {
      name,
      email,
      phone,
      selectedDates,
    };

    console.log('Booking Data:', bookingData);

    // Reset the form after submission
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div>
      <h3>Skicka Förfrågan:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;