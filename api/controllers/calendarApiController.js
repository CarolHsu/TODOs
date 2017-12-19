'use strict';

const path = require('path'),
    appDir = path.dirname(require.main.filename),
    fs = require('fs'),
    readline = require('readline'),
    google = require('googleapis'),
    googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
// Then run again `node build_token.js`
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';



const authorize = (credentials, callback, res, options={}) => {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
            console.log("Build your tokens first, by execute `node build_token.js`");
        } else {
            oauth2Client.credentials = JSON.parse(token);
            return callback(oauth2Client, res, options);
        }
    });
};

// API major part
const listEvents = (auth, res, options) => {
    const TODAY = new Date((new Date()).setHours(0, 0, 0, 0));
    const calendar = google.calendar('v3');
    const condition = {
        auth: auth,
        calendarId: 'primary',
        timeMin: TODAY.toISOString(),
        timeMax: (new Date(TODAY.setDate(TODAY.getDate() + 7)).toISOString()),
        maxResults: 100,
        singleEvents: true,
        orderBy: 'startTime'
    };
    console.log("query condition: ", condition);
    calendar.events.list(condition, (err, response) => {
        if (err) {
            console.log('The API returns an error: ', err);
            res.json({error: err});
        }
        const events = response.items;
        res.json(events);
    });
};

const getEvent = (auth, res, options) => {
    const calendar = google.calendar('v3');
    calendar.events.get({
        auth: auth,
        calendarId: 'primary',
        eventId: options.eventId
    }, (err, response) => {
        if (err) {
            console.log('The API returns an error: ', err)
            res.json({error: err});
        }
        res.json(response);
    });
};

const addEvent = (auth, res, options) => {
    const calendar = google.calendar('v3');
    const summary = options.summary;
    const startTime = options.startTime;
    const endTime = options.endTime;
    const event = {
        summary: summary,
        start: {
            dateTime: startTime
        },
        end: {
            dateTime: endTime
        }
    };
    console.log("add Event: ", event);
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resource: event
    }, (err, response) => {
        if (err) {
            console.log('Error: ', err);
            res.json({ error: err });
        }
        res.json(response);
    });
};

const updateEvent = (auth, res, options) => {
    const calendar = google.calendar('v3');
    calendar.events.update({
        auth: auth,
        calendarId: 'primary',
        eventId: options.eventId,
        resources: options.resources
    }, (err, response) => {
        if (err) {
            console.log('Error: ', err);
            res.json({error: err});
        }
        res.json(response);
    });
};

const removeEvent = (auth, res, options) => {
    const calendar = google.calendar('v3');
    calendar.events.delete({
        auth: auth,
        calendarId: 'primary',
        eventId: options.eventId
    }, (err) => {
        if (err) {
            console.log('Error: ', err);
            res.json({error: err});
        }
        res.json({status: 200, 'message': 'Deleted event successfully'});
    });
};

exports.index = (req, res) => {
    fs.readFile(appDir + '/client_secret.json', (err, content) => {
        if (err) {
            console.log('Get error when loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), listEvents, res);
    });
};

exports.create = (req, res) => {
    const startTime = parseInt(req.params.startTime);
    const endTime = startTime + 1000 * 60 * 30;
    const options = {
        summary: req.params.summary || "No title",
        startTime: (new Date(startTime)).toISOString(),
        endTime: (new Date(endTime)).toISOString()
    };

    fs.readFile(appDir + '/client_secret.json', (err, content) => {
        if (err) {
            console.log('Get error when loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), addEvent, res, options);
    });
};

exports.show = (req, res) => {
    fs.readFile(appDir + '/client_secret.json', (err, content) => {
        if (err) {
            console.log('Get error when loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), getEvent, res, { eventId: req.params.eventId});
    });
};

exports.update = (req, res) => {
};

exports.destroy = (req, res) => {
    fs.readFile(appDir + '/client_secret.json', (err, content) => {
        if (err) {
            console.log('Get error when loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), removeEvent, res, { eventId: req.params.eventId});
    });
};
