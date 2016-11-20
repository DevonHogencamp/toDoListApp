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
var itemOne = ToDo({item: 'Make mongo work'}).save(function (err) {
    if (err) {
        throw err;
    }
    else {
        console.log("Item Saved");
    }
});

// Data we want to send to get put in the todo list
var data = [{item: 'Get Milk'}, {item: 'Walk Dog'}, {item: 'Code a To Do App'}];

// Set up body parser
var urlEncodedParser = bodyParser.urlencoded({extended: false});

// Export this for the app.js to call
module.exports = function (app) {
    // User asks for toDo page
    app.get('/toDo', function (req, res) {
        // Render the toDo page ejs
        res.render('toDo', {toDos: data});
    });

    // User posts a toDo
    app.post('/toDo', urlEncodedParser, function (req, res) {
        data.push(req.body);
        res.json(data);
    });

    // User deletes a toDo
    app.delete('/toDo/:item', function (req, res) {
        data = data.filter(function(toDo) {
            return toDo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });
};
