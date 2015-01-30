/**
 * Created by danny on 1/30/15.
 */
// public/js/services/BtcService.js
angular.module('BtcService', []).factory('Btc', ['$http', function($http) {

    return {
        // call to get all btc
        get : function() {
            return $http.get('/api/btc');
        },


        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(btcData) {
            return $http.post('/api/btc', btcData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/btc/' + id);
        }
    }

}]);
