import React from 'react';
import EventListItem from './event_list_item';

const EventList = ({ events }) => {

    const EventListItems = events.map((event) => {
        return(
            <EventListItem 
            key={event.id}
            event={event} />
        );
    });

    return (
        <ul className="list-group">
            {EventListItems}
        </ul>
    );
};

export default EventList;
