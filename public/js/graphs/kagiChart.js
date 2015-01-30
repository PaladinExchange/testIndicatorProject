/**
 * Created by danny on 1/29/15.
 */


var pusher = new Pusher('de504dc5763aeef9ff52');
var trades_channel = pusher.subscribe('live_trades');
var i = 0;
var t = 15;
var p;
var priceData = [];


trades_channel.bind('trade', function(data) {

    var table = document.getElementById("trades_table")
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var currentdate = new Date();
    currentTime = currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
    cell1.innerHTML = currentTime;
    cell2.innerHTML = data['amount'];
    cell3.innerHTML = data['price'];
    i++;


    var secondRow = table.rows[2];


    priceData.push({x: i, y: data['price']});
    console.log(priceData);
    price = data['price'];

    if (price < p) {
        row.style.background = "red";
    } else if (price > p) {
        row.style.background = "green";
    } else if (p === undefined) {
        row.style.background = "gray";
    } else if (p === price) {
        row.style.background = secondRow.style.background;
    }

    p = price;
});
