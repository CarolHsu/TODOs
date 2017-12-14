'use strict';

module.exports = function(app) {
    var calendarApi = require('../api/controllers/calendarApiController');

    app.route('/events')
    .get(calendarApi.index)
    .post(calendarApi.create);

    app.route('/events/:eventId')
    .get(calendarApi.show)
    .put(calendarApi.update)
    .delete(calendarApi.destroy);

    app.route('/');
};
