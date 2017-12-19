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
          hasBeenModified: false
      }

      this.loadEvents();
  }

  loadEvents() {
      Client.index(events => {
          this.setState({ events, shouldReload: false });
      });
  }

  forceUpdateHandler() {
      this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <EventInput onNewEventSent={events => this.setState({ events, hasBeenModified: true })} />
        <EventList events={this.state.events} onClick={this.forceUpdateHandler} />
      </div>
    );
  }
}

export default App;
