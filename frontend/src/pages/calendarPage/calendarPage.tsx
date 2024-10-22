import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendarPage.css';

const localizer = momentLocalizer(moment);

interface Assignment {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
}

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
}

const AssignmentCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const backendBaseUrl = "https://backend:8443"; // Adjust the backend URL as needed

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch(`${backendBaseUrl}/assignments`);
        const data: Assignment[] = await response.json();

        if (Array.isArray(data)) {
          const calendarEvents = data.map(assignment => ({
            id: assignment.id,
            title: assignment.title,
            start: new Date(assignment.start_date),
            end: new Date(assignment.end_date),
          }));

          setEvents(calendarEvents);
        } else {
          console.error('Expected an array but got:', data);
          setError('Failed to fetch assignment data');
        }
      } catch (err) {
        console.error('Failed to fetch assignments', err);
        setError('Failed to fetch assignment data');
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="fixDisplay">
      <div>
        <h2 className="calHeading">Assignment Calendar</h2>
        {error && <div className="error">{error}</div>}
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="calendar margin-fix"
        />
      </div>
    </div>
  );
};

export default AssignmentCalendar;
