const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.set("port", port);

const routes = require('./routes/todoListRoutes');
routes(app);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

