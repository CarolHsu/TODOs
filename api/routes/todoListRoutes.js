'use strict';

module.exports = function(app) {
    var todoList = require('../controllers/todoListController');

    app.route('/tasks')
    .get(todoList.index)
    .post(todoList.create);

    app.route('/tasks/:taskId')
    .get(todoList.show)
    .put(todoList.update)
    .delete(todoList.destroy)
};
