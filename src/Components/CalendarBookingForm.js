import React, { useState } from 'react';
import { addDoc, collection,doc,updateDoc, deleteDoc } from 'firebase/firestore';
import db from '../services/firebase';
import DateTimePicker  from 'react-datepicker';
import '../styles/CalendarBookingForm.css';

function CalendarBookingForm({ event, onClose }) {
    const [bookingDetails, setBookingDetails] = useState({
      Name: event ? event.title : '',
      fromDate: event ? event.start : new Date(),
      toDate: event ? event.end : new Date(),
      booked: event ? (event.color === '#900000') : false,
    });
    const handleSaveBooking = async () => {
        try {
          if (event && event.id) {
            // If the event has an ID, it means we're editing an existing event
            const eventRef = doc(db, 'calendar', event.id);
            await updateDoc(eventRef, {
              Name: bookingDetails.Name,
              fromDate: bookingDetails.fromDate,
              toDate: bookingDetails.toDate,
              booked: bookingDetails.booked,
            });
            console.log('Event updated with ID: ', event.id);
          } else {
            // If the event doesn't have an ID, it means we're creating a new event
            const bookingRef = await addDoc(collection(db, 'calendar'), bookingDetails);
            console.log('Booking added with ID: ', bookingRef.id);
          }
        } catch (error) {
          console.error('Error saving booking: ', error);
        }
        onClose(); // Close the booking form after saving
      };
const handleDeleteBooking = async () => {
        try {
          if (event && event.id) {
            const eventRef = doc(db, 'calendar', event.id);
            await deleteDoc(eventRef);
            console.log('Event deleted with ID: ', event.id);
          }
          onClose(); // Close the booking form after deleting
        } catch (error) {
          console.error('Error deleting event: ', error);
        }
      };

  return (
    <div className="calendar-booking-form">
    <h2>{event ? 'Redigera Bokning' : 'Skapa Bokning'}</h2>
      <label>
        Namn
      <br/>
        <input
          type="text"
          value={bookingDetails.Name}
          onChange={(e) => setBookingDetails({ ...bookingDetails, Name: e.target.value })}
        />
      </label>
      <label>
        <br/>
        Från
        <DateTimePicker
          selected={bookingDetails.fromDate}
          onChange={(date) => setBookingDetails({ ...bookingDetails, fromDate: date })}
          dateFormat="dd/MM/yyyy"
        />
      </label>
      <label>
        Till
        <DateTimePicker
          selected={bookingDetails.toDate}
          onChange={(date) => setBookingDetails({ ...bookingDetails, toDate: date })}
          dateFormat="dd/MM/yyyy"
        />
      </label>
      <label>
        <br/>
        Bokad
        <input
          type="checkbox"
          checked={bookingDetails.booked}
          onChange={(e) => setBookingDetails({ ...bookingDetails, booked: e.target.checked })}
        />
      </label>
      <br/>
      <br/>
      <button onClick={handleSaveBooking}>Spara</button>
      <button className="delete-button" onClick={handleDeleteBooking}>
        Ta bort
      </button>
      <button onClick={onClose}>Avbryt</button>
    </div>
  );
}

export default CalendarBookingForm;
