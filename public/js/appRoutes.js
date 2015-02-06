// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider


        // home page
        .when('/', {
            templateUrl: '/index.ejs'
        })

        .when('/home', isLoggedIn, {
            templateUrl: 'views/index.html',
            controller: 'MainController'
        })


        // nerds page that will use the NerdController
        .when('/nerds', isLoggedIn, {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        });

    $locationProvider.html5Mode(true);

}]);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}


