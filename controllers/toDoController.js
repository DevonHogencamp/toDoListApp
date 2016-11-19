/*  Control the behavior of our to do list app  */

// Export this for the app.js to call
module.exports = function (app) {
    // User asks for toDo page
    app.get('/toDo', function (req, res) {
        // Render the toDo page ejs
        res.render('toDo');
    });

    // User posts a toDo
    app.post('/toDo', function (req, res) {

    });

    // User deletes a toDo
    app.delete('/toDo', function (req, res) {

    });
};
