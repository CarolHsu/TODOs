var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

var routes = require('./routes/todoListRoutes');
routes(app);

app.listen(port);

app.set('view engine', 'pug');
app.set('views', './app/views');

console.log('todo list RESTful APIs server started on: ' + port);
