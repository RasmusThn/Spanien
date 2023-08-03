import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './BookingForm.css';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import sv from 'date-fns/locale/sv'; // Import the Swedish locale
import { useForm } from '@formspree/react';

registerLocale('sv', sv); // Register the Swedish locale
setDefaultLocale('sv'); // Set the Swedish locale as the default

const BookingForm = ({ selectedDates }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [dateError, setDateError] = useState('');
  const [notes, setNotes] = useState('');
  const today = new Date(); // Get the current date
  const [state] = useForm('xvojzazv');



  const handleFromDateChange = (date) => {
    setFromDate(date);
    if (toDate && date > toDate) {
      // If the toDate was set and the fromDate is after it, update the toDate to match the fromDate.
      setToDate(date);
    }
    setDateError(''); // Reset the date error when fromDate changes
  };

  const handleToDateChange = (date) => {
    setToDate(date);
    if (fromDate && date && fromDate > date) {
      setDateError('Från datum kan inte vara senare än till datum');
    } else {
      setDateError('');
    }
  };

  const handleInputChange = (setState, value) => {
    setState(value);
  };
if(state.succeeded ){
    return <div className="success-message">Tack! Din förfrågan har skickats.</div>;
}
  return (
    <div className="booking-form">
      <h3>Skicka Förfrågan:</h3>
      {/* {formSubmitted && <div className="success-message">Tack! Din förfrågan har skickats.</div>} */}
      <div className="necessary-text">* Nödvändig</div>
      <form action="https://formspree.io/f/xvojzazv" method="POST" >
        <div>
          <label htmlFor="name" className={name ? '' : 'required-label'}>
            Namn:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleInputChange(setName, e.target.value)}
            required
            name='Name'
          />
        </div>
        <div>
          <label htmlFor="email" className={email ? '' : 'required-label'}>
            E-post:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleInputChange(setEmail, e.target.value)}
            required
            name='Email'
          />
        </div>
        <div>
          <label htmlFor="phone" className={phone ? '' : 'required-label'}>
            Telefon:
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => handleInputChange(setPhone, e.target.value)}
            required
            name='Tele'
          />
        </div>
        <div>
          <label htmlFor="fromDate" className={fromDate ? '' : 'required-label'}>
            Från Datum:
          </label>
          <DatePicker
            id="fromDate"
            selected={fromDate}
            onChange={handleFromDateChange}
            dateFormat="dd/MM/yyyy"
            required
            name='FromDate'
            minDate={today} // Set the minimum date to today's date
          />
        </div>
        <div>
          <label htmlFor="toDate" className={toDate ? '' : 'required-label'}>
            Till Datum:
          </label>
          <DatePicker
            id="toDate"
            selected={toDate}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            required
            name='ToDate'
            minDate={fromDate} // Set the minimum date to today's date
          />
        </div>
        <div className="label-on-top">
          <label htmlFor="notes">Övrigt/Frågor:</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => handleInputChange(setNotes, e.target.value)}
            rows="5" 
            name='Notes'
          />
        </div>
        {dateError && <div className="error-message">{dateError}</div>}
        <button type="submit" disabled={state.submitting}>Skicka Bokning</button>
      </form>
    </div>
  );
};

export default BookingForm;
