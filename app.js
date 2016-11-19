/*  Main app for to do list app  */

// Require all neccesary packages and modules
var express = require('express');
var toDoController = require('./controllers/toDoController');

// Start the express app
var app = express();

// Set up template engine
app.set('view engine', 'ejs');

// Static Files
app.use(express.static('./public'));

// Fire the controllers
toDoController(app);

// Listen for the 3000 port
app.listen(3000);

// Let us know which port the server is running on
console.log('Server running on port 3000');
