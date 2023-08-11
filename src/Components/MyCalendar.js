import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/sv';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './../styles/MyCalendar.css';
import db from './../services/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import CalendarBookingForm from './CalendarBookingForm';

moment.locale('sv');
const localizer = momentLocalizer(moment);

function MyCalendar({ isAdminMode }) {
  const [events, setEvents] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(isAdminMode);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'calendar'), (snapshot) => {
      const fetchedEvents = [];
      snapshot.forEach((doc) => {
        const eventData = doc.data();
        fetchedEvents.push({
          id: doc.id, // Include the ID of the document
          title: eventData.Name,
          start: eventData.fromDate.toDate(),
          end: eventData.toDate.toDate(),
          color: eventData.booked ? '#900000' : '#FFC107',
        });
      });
      setEvents(fetchedEvents);
    });

    return () => unsubscribe();
  }, []);

  const eventStyleGetter = (event, start, end, isSelected) => {
    let style = {};

    if (event.color) {
      style.backgroundColor = event.color;
    }

    return {
      style: style,
    };
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event); // Store the selected event details
    setShowBookingForm(true); // Show the booking form
  };

  const myMessages = {
    today: 'Idag',
    previous: 'Tidigare',
    next: 'Nästa',
    month: 'Månad',
    week: 'Vecka',
    day: 'Dag',
    agenda: 'Agenda',
    date: 'Datum',
    time: 'Tid',
    event: 'Händelse',
  };

  return (
    <div>

    <div className="my-calendar-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
        messages={myMessages}
        />
      <div className="legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#900000' }}></div>
          <p>Bokad</p>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#FFC107' }}></div>
          <p>Preliminärt</p>
        </div>
      </div>
    
    </div>
    {isAdminMode && showBookingForm && (
        <CalendarBookingForm
          event={selectedEvent} // Pass the selected event to the booking form
          onClose={() => {
            setSelectedEvent(null); // Reset selected event
            setShowBookingForm(false);
          }}
        />
      )}
    </div>
  );
}

export default MyCalendar;