'use strict';

var path = require('path'),
    appDir = path.dirname(require.main.filename),
    fs = require('fs'),
    readline = require('readline'),
    google = require('googleapis'),
    googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/calendar-nodejs-quickstart.json
var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'calendar-nodejs-quickstart.json';


function authorize(credentials, callback, res, options) {
    var clientSecret = credentials.installed.client_secret;
    var clientId = credentials.installed.client_id;
    var redirectUrl = credentials.installed.redirect_uris[0];
    var auth = new googleAuth();
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    fs.readFile(TOKEN_PATH, function (err, token) {
        if (err) {
            getNewToken(oauth2Client, callback);
        } else {
            oauth2Client.credentials = JSON.parse(token);
            return callback(oauth2Client, res, options);
        }
    });
}

function getNewToken(oauth2Client, callback) {
    var authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl)
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.question('Enter the code from the page here: ', function(code) {
        rl.close();
        oauth2Client.getToken(code, function (err, token) {
            if (err) {
                console.log('Error while trying to retrieve access token,', err);
                return;
            }
            oauth2Client.credentials = token;
            storeToken(token);
            callback(oauth2Client, res);
        });
    });
}

function storeToken(token) {
    try {
        fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
        if (err.code != 'EEXIST') {
            throw err;
        }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to: ', TOKEN_PATH);
}

// API major part
function listEvents(auth, res, options={}) {
    var calendar = google.calendar('v3');
    calendar.events.list({
        auth: auth,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    }, function (err, response) {
        if (err) {
            console.log('The API returns an error: ', err)
            return;
        }
        var events = response.items;
        if (events.length == 0) {
            console.log('No upcoming events found.');
        } else {
            console.log('Upcoming 10 events');
            for (var i = 0, len = events.length; i < len; i++) {
                var event = events[i];
                var start = event.start.dateTime || event.start.date;
                console.log('%s - %s', start, event.summary);
            }
            res.json(events);
        }
    });
}

function getEvent(auth, res, options) {
    var calendar = google.calendar('v3');
    calendar.events.get({
        auth: auth,
        calendarId: 'primary',
        eventId: options.eventId
    }, function(err, response) {
        if (err) {
            console.log('The API returns an error: ', err)
            return;
        }
        res.json(response);
    });
}

function addEvent(auth, res, options) {
    var calendar = google.calendar('v3');
    calendar.events.insert({
        auth: auth,
        calendarId: 'primary',
        resources: options.resources
    }, function(err, response){
        if (err) {
            console.log('Error: ', err);
            return;
        }
        res.json(response);
    });
}

function updateEvent(auth, res, options) {
    var calendar = google.calendar('v3');
    calendar.events.update({
        auth: auth,
        calendarId: 'primary',
        eventId: options.eventId,
        resources: options.resources
    }, function(err, response) {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        res.json(response);
    });
}

function removeEvent(auth, res, options) {
    var calendar = google.calendar('v3');
    calendar.events.delete({
        auth: auth,
        calendarId: 'primary',
        eventId: options.eventId
    }, function (err) {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        res.json({'message': 'Deleted event successfully'});
    });
}

exports.index = function (req, res) {
    fs.readFile(appDir + '/client_secret.json', function processClientSecrets (err, content) {
        if (err) {
            console.log('Get error when loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), listEvents, res);
    });
};

exports.create = function (req, res) {
};

exports.show = function (req, res) {
    fs.readFile(appDir + '/client_secret.json', function processClientSecrets (err, content) {
        if (err) {
            console.log('Get error when loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), getEvent, res, { eventId: req.params.eventId});
    });
};

exports.update = function (req, res) {
};

exports.destroy = function (req, res) {
    fs.readFile(appDir + '/client_secret.json', function processClientSecrets (err, content) {
        if (err) {
            console.log('Get error when loading client secret file: ' + err);
            return;
        }
        authorize(JSON.parse(content), removeEvent, res, { eventId: req.params.eventId});
    });
};
