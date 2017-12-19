import React, { Component } from 'react';
import DateTime from 'react-datetime';
import Client from '../Client';

class EventInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            summary: "",
            startTime: "",
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
            const options = {
                summary: this.state.summary,
                startTime: this.state.startTime
            }
            Client.create(options, (event) => {
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
                infoAlert = <div className="alert alert-info">New event: {this.state.newEvent}, time: {this.state.startTime}</div>;
        }

        return (
            <div className="container">
            <div className="row">
            <div className="col-md-3">
            <DateTime onChange={e => this.setState({startTime: new Date(e).toISOString()})} />
            </div>
            <div className="col-md-8">
            <div className="input-group">
                <input 
                type="text" 
                className="form-control"
                placeholder="Enter your new task and press enter."
                value={this.state.summary} 
                onChange={e => this.typingEvent(e.target.value)} 
                onKeyPress={e => this.onPressEnter(e.key)} />
            </div>
            </div>
            </div>
            <div className="row">
            {infoAlert}
            </div>
            </div>
        );
    }
}

export default EventInput;
