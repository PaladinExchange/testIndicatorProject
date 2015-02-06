 // app/routes.js

// grab the nerd model we just created
//var Nerd = require('./models/nerd');




    //module.exports = function(app) {
    //
    //    // server routes ===========================================================
    //    // handle things like api calls
    //    // authentication routes
    //
    //    // sample api route
    //    app.get('/api/btc', function(req, res) {
    //        // use mongoose to get all nerds in the database
    //        Btc.find({ 'time': { $gte: 1315922016, $lte: 1315990442}}, function(err, btc) {
    //
    //            // if there is an error retrieving, send the error.
    //                            // nothing after res.send(err) will execute
    //            if (err)
    //                res.send(err);
    //            console.log(btc);
    //            res.json(btc); // return all nerds in JSON format
    //        });
    //    })
    //
    //    // route to handle creating goes here (app.post)
    //    // route to handle delete goes here (app.delete)
    //
    //
    //    // route to get the bitstamp data back
    //    app.get('/api/start', function(){
    //        var http = require('http');
    //
    //        var options = {
    //            host: "www.bitstamp.net",
    //            path: "/api/transactions/",
    //            method: 'GET'
    //        };
    //
    //
    //        http.get(options, function(res){
    //
    //        });
    //    })
    //
    //    // frontend routes =========================================================
    //    // route to handle all angular requests
    //    app.get('*', function(req, res) {
    //        res.sendfile('./public/index.html'); // load our public/index.html file
    //    });
    //
    //};


 module.exports = function(app, passport) {
     // server routes ===========================================================
     // handle things like api calls
     // authentication routes

     // sample api route
     //app.get('/api/btc', function(req, res) {
     //    // use mongoose to get all nerds in the database
     //    Btc.find({ 'time': { $gte: 1315922016, $lte: 1315990442}}, function(err, btc) {
     //
     //        // if there is an error retrieving, send the error.
     //        // nothing after res.send(err) will execute
     //        if (err)
     //            res.send(err);
     //        console.log(btc);
     //        res.json(btc); // return all nerds in JSON format
     //    });
     //})

     // route to handle creating goes here (app.post)
     // route to handle delete goes here (app.delete)


     // route to get the bitstamp data back
     //app.get('/api/start', function(){
     //    var http = require('http');
     //
     //    var options = {
     //        host: "www.bitstamp.net",
     //        path: "/api/transactions/",
     //        method: 'GET'
     //    };
     //
     //
     //    http.get(options, function(res){
     //
     //    });
     //})

     // frontend routes =========================================================
     // route to handle all angular requests
     app.get('/index', isLoggedIn,function(req, res) {
         res.sendfile('./public/views/index.html'); // load our public/index.html file
     });
// normal routes ===============================================================

     // show the home page (will also have our login links)
     app.get('/', function (req, res) {
         res.render('../public/index.ejs');
     });

     // PROFILE SECTION =========================
     app.get('/profile', isLoggedIn, function (req, res) {
         res.render('./public/views/profile.ejs', {
             user: req.user
         });
     });

     // LOGOUT ==============================
     app.get('/logout', function (req, res) {
         req.logout();
         res.redirect('/');
     });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

     // locally --------------------------------
     // LOGIN ===============================
     // show the login form
     app.get('/login', function (req, res) {
         res.render('../public/views/login.ejs', {message: req.flash('loginMessage')});
     });

     // process the login form
     app.post('/login', passport.authenticate('local-login', {
         successRedirect: '/index', // redirect to the secure profile section
         failureRedirect: '/login', // redirect back to the signup page if there is an error
         failureFlash: true // allow flash messages
     }));

     // SIGNUP =================================
     // show the signup form
     app.get('/signup', isLoggedIn, function (req, res) {
         res.render('../public/views/signup.ejs', {message: req.flash('signupMessage')});
     });

     // process the signup form
     app.post('/signup', isLoggedIn, passport.authenticate('local-signup', {
         successRedirect: '/profile', // redirect to the secure profile section
         failureRedirect: '/signup', // redirect back to the signup page if there is an error
         failureFlash: true // allow flash messages
     }));


// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

     // locally --------------------------------
     app.get('/connect/local', function (req, res) {
         res.render('connect-local.ejs', {message: req.flash('loginMessage')});
     });
     app.post('/connect/local', passport.authenticate('local-signup', {
         successRedirect: '/profile', // redirect to the secure profile section
         failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
         failureFlash: true // allow flash messages
     }));


// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

     // local -----------------------------------
     app.get('/unlink/local', isLoggedIn, function (req, res) {
         var user = req.user;
         user.local.email = undefined;
         user.local.password = undefined;
         user.save(function (err) {
             res.redirect('../public/views/profile');
         });
     });


// route middleware to ensure user is logged in
     function isLoggedIn(req, res, next) {
         if (req.isAuthenticated())
             return next();

         res.redirect('/');
     }
 }


