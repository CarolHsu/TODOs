var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

var routes = require('./api/routes/todoListRoutes');
routes(app);

app.listen(port);

console.log('todo list RESTful APIs server started on: ' + port);
