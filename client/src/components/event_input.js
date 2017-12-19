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
            Client.create(this.state.summary, (event) => {
                this.setState({
                    newEvent: event.summary,
                    summary: "",
                    hasSent: true
                });
            });
            this.props.onNewEventSent();
        }
    }

    render() {
        const hasSent = this.state.hasSent

        let infoAlert = null;
        if(hasSent) {
                infoAlert = <div className="alert alert-info">New event: {this.state.newEvent}</div>;
        }

        return (
            <div className="container">
            <div className="container">
            <div className="input-group">
                <span className="input-group-addon">New Task</span>
                <input 
                type="text" 
                className="form-control"
                placeholder="Enter your new task and press enter."
                value={this.state.summary} 
                onChange={e => this.typingEvent(e.target.value)} 
                onKeyPress={e => this.onPressEnter(e.key)} />
            </div>
            </div>
            <div className="container">
            {infoAlert}
            </div>
            </div>
        );
    }
}

export default EventInput;
