/**
 * Created by danny on 1/30/15.
 */
// grab the mongoose module
var mongoose = require('mongoose');
mongoose.connect('mongodb://@localhost:27017/btctestdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log('You are connected!');
});
//creates a schema identical to testData
var schema = new mongoose.Schema({
    time: Number,
    price: Number,
    size: Number
});
// define our nerd model
// module.exports allows us to pass this to other files when it is called
var Btc = mongoose.model('Btc', schema);

module.exports = Btc;
