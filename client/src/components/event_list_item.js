import React from 'react';

const EventListItem = ({ event }) => {
    return(
        <li>
        {`${event.start.date || event.start.dateTime}: ${event.summary}`}
        </li>
    );
};

export default EventListItem;
