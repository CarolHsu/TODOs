'use strict';

module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    app.route('/events')
    .get(todoList.index)
    .post(todoList.create);

    app.route('/events/:eventId')
    .get(todoList.show)
    .put(todoList.update)
    .delete(todoList.destroy);
};
