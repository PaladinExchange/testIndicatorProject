var maxK;
var minK;

function genHighLowKagi() {
    minK = Number(document.getElementById("min").value);
    maxK = Number(document.getElementById("max").value);

}

function generateKagiGraph() {

    var chart = new CanvasJS.Chart("chartContainer2",
        {
            backgroundColor: "#000000",
            zoomEnabled: false,
            animationEnabled: false,

            axisX: {
                labelFontSize: 10,
                gridColor: "orange",
                labelFontColor: "orange",
                tickColor: "orange",
                lineColor: "orange"
            },
            axisY: {
                maximum: maxK,
                minimum: minK,
                labelFontSize: 10,
                gridColor: "orange",
                labelFontColor: "orange",
                tickColor: "orange",
                lineColor: "orange"


            },

            legend:{


            },
            data: [
                {
                    type: "bubble",
                    fillOpacity:.7,
                    toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong>Queue</strong> {x}<br/> <strong>Price</strong> {y}<br/> <strong>Size</strong> {z}",

                    dataPoints: priceData
                }
            ]


        });

    chart.render();
}

var pusher = new Pusher('de504dc5763aeef9ff52');
var trades_channel = pusher.subscribe('live_trades');
var j = 0;
var t = 15;
var p;
var priceData = [];

trades_channel.bind('trade', function(data){
    var table = document.getElementById("trades_table")
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var currentDate = new Date();
    var currentTime = currentDate.getHours() + ":"
    + currentDate.getMinutes() + ":"
    + currentDate.getSeconds();
    cell1.innerHTML = currentTime;
    cell2.innerHTML = data['amount'];
    cell3.innerHTML = data['price'];
    j++;


    var secondRow = table.rows[2];


    priceData.push({x: j, y: data['price'], z: data['amount']});
    var price = data['price'];

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
    generateKagiGraph();
});

