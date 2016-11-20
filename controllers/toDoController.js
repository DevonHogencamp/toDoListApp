/*  Control the behavior of our to do list app  */

// Our requires
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
// test and test are username and password in url
mongoose.connect('mongodb://test:test@ds061158.mlab.com:61158/todo');

// Create a schema like a blueprint for our data
var toDoSchema = new mongoose.Schema({
    item: String
});

var ToDo = mongoose.model('ToDo', toDoSchema);

// Set up body parser
var urlEncodedParser = bodyParser.urlencoded({extended: false});

// Export this for the app.js to call
module.exports = function (app) {
    // User asks for toDo page
    app.get('/toDo', function (req, res) {
        // Get data from mongodb and pass it to the view
        // Find all items from the database
        ToDo.find({}, function (err, data) {
            if (err) {
                throw err;
            }
            // Render the toDo page ejs
            res.render('toDo', {toDos: data});
        });
    });

    // User posts a toDo
    app.post('/toDo', urlEncodedParser, function (req, res) {
        // Get data from the view and add it to mongodb
        var newToDo = ToDo(req.body).save(function(err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    // User deletes a toDo
    app.delete('/toDo/:item', function (req, res) {
        // Delete requested item from mongodb
        ToDo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });
};
