import React from 'react';
import Client from '../Client';

const EventListItem = ({ event }) => {

    const deleteEvent = (event) => {
        console.log(event);
        Client.destroy(event.id, (event) => {
        });
    };

    return(
        <li 
        onClick={e => deleteEvent(event)}
        className="list-group-item">
        {`${event.start.date || event.start.dateTime}: ${event.summary}`}
        </li>
    );
};

export default EventListItem;
