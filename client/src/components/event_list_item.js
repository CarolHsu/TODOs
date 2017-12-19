import React from 'react';
import Client from '../Client';

const EventListItem = ({ event }) => {

    const deleteEvent = (event) => {
        Client.destroy(event.id, (event) => {
            console.log(event);
        });
    };

    const WeekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const showEvent = (event) => {
        const startDateString = event.start.date || event.start.dateTime;
        const startDate = new Date(startDateString);
        const FormattedDay = WeekDay[startDate.getDay()];
        const FormattedTime = `${startDate.getHours()}:${startDate.getMinutes()}`;
        return `${FormattedDay} ${FormattedTime}, ${event.summary}`;
    }


    return(
        <li 
        onClick={e => deleteEvent(event)}
        className="list-group-item">
        <a href={event.htmlLink} className="text-primary text-left">{showEvent(event)}</a>
        <button type="button" className="btn btn-outline-warning text-right" onClick={e => deleteEvent(event) }>Done</button>
        </li>
    );
};

export default EventListItem;
