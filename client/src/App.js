import React, { Component } from 'react';
import './App.css';
import Client from './Client';

import EventList from './components/event_list';
import EventInput from './components/event_input';

class App extends Component {
  constructor(props) {
      super(props);

      this.loadEvents = this.loadEvents.bind(this);

      this.state = {
          events: []
      }

      this.loadEvents();
  }

  loadEvents() {
      Client.index(events => {
          this.setState({ events });
      });
  }

  render() {
    return (
      <div className="App">
        <EventInput onNewEventSent={this.loadEvents} />
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
