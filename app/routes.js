 // app/routes.js

// grab the nerd model we just created
//var Nerd = require('./models/nerd');
var Btc = require('./models/btc')
    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes

        // sample api route
        app.get('/api/btc', function(req, res) {
            // use mongoose to get all nerds in the database
            Btc.find({ 'time': { $gte: 1315922016, $lte: 1315990442}}, function(err, btc) {

                // if there is an error retrieving, send the error. 
                                // nothing after res.send(err) will execute
                if (err)
                    res.send(err);
                console.log(btc);
                res.json(btc); // return all nerds in JSON format
            });
        });

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/views/index.html'); // load our public/index.html file
        });

    };



