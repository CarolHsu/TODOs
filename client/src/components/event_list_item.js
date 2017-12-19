import React from 'react';
import Client from '../Client';

const EventListItem = ({ event }) => {

    const deleteEvent = (event) => {
        Client.destroy(event.id, (event) => {
            console.log(event);
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
