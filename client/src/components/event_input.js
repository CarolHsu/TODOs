import React, { Component } from 'react';
import Client from '../Client';

class EventInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            summary: "",
            hasSent: false,
            newEvent: ""
        }
    }

    typingEvent(summary) {
        this.setState({ 
            summary, 
            hasSent: false 
        });
    }

    onPressEnter(key) {
        if(key === "Enter") {
            // TODO: post this.state = { summary }
            Client.create(this.state.summary, (event) => {
                this.setState({
                    newEvent: event.summary,
                    summary: "",
                    hasSent: true
                });
            });
        }
    }

    render() {
        return (
            <div>
                <h1>Enter your new event</h1>
                    <input 
                    type="text" 
                    value={this.state.summary} 
                    onChange={e => this.typingEvent(e.target.value)} 
                    onKeyPress={e => this.onPressEnter(e.key)} />
                <h3>New event {this.state.summary}</h3>
                <p>{this.state.hasSent ? `new Event ${this.state.newEvent} has been Added!` : ""}</p>
            </div>
        );
    }
}

export default EventInput;
