import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/sv';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('sv')
const localizer = momentLocalizer(moment);

function MyCalendar() {
  const events = [
    {
      title: 'Lucas m familj, Patrik o Lina',
      start: new Date('2023-09-08'),
      end: new Date('2023-09-19'),
      color: 'red',
    },
    {
      title: 'Lucas kompis',
      start: new Date('2023-08-03'),
      end: new Date('2023-08-10'),
      color: '#DAA520',//Yellow
    },
  ];
  
// Define the eventStyleGetter function
const eventStyleGetter = (event, start, end, isSelected) => {
  let style = {};

  if (event.color) {
    style.backgroundColor = event.color; // Set the background color of the event
  }

  return {
    style: style,
  };
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
    
    <div >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ height: 500 }}
        messages={myMessages}
      />
    </div>
  );
}

export default MyCalendar;
