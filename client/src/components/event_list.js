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
        <div className="container">
        <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
        <ul className="list-group">
            {EventListItems}
        </ul>
        </div>
        <div className="col-md-3"></div>
        </div>
        </div>
    );
};

export default EventList;
