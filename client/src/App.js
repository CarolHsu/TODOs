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
          events: [],
          shouldReload: false
      }

      this.loadEvents();
  }

  loadEvents() {
      Client.index(events => {
          this.setState({ events, shouldReload: false });
      });
  }


  render() {
    return (
      <div className="App">
        <EventInput onNewEventSent={events => this.setState({ events })} />
        <EventList events={this.state.events}/>
      </div>
    );
  }
}

export default App;
