/**
 * Created by danny on 1/30/15.
 */
// public/js/controllers/BtcCtrl.js
angular.module('BtcCtrl', []).controller('BtcController', function($scope, $http) {

    $http.get('/api/btc')
        .success(function(data){
            $scope.tagline = data;
        })
        .error(function(){
            console.log('Error: ' + data);

        });


});

