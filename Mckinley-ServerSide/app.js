var express = require('express');
var cors = require('cors');
var routes = require("./routes/index");

var app = express();

app.use(cors({ credentials: true }));

// handle routes
app.get("/", routes);

module.exports = app;