/**
 * Created by danny on 1/29/15.
 */
var min;
var max;

function genHighLowBubs(){
    min = Number(document.getElementById("min").value);
    max = Number(document.getElementById("max").value);

}


function genBubbles(dataPoints) {
    //var min = dataPoints[39]['y'] - .25;
    //var max = dataPoints[19]['y'] + .25;

    var chart = new CanvasJS.Chart("chartContainer",
        {
            backgroundColor: "#000000",
            zoomEnabled: true,
            animationEnabled: false,
            title:{

            },

            axisX: {
                gridColor: "orange",
                labelFontColor: "orange",
                lineColor: "orange",
                tickColor: "orange"
            },
            axisY: {
                maximum: max,
                minimum: min,
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
                    //indexLabel: "{name}",
                    //indexLabelFontSize: 12,
                    //indexLabelFontColor: "black",
                    //indexLabelPlacement: "outside",
                    toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong>Queue</strong> {x}<br/> <strong>Price</strong> {y}<br/> <strong>Size</strong> {z}",
                    dataPoints: dataPoints
                }
            ]


        });

    chart.render();
}


var pusher = new Pusher('de504dc5763aeef9ff52');
var order_book_channel = pusher.subscribe('order_book');
var dataPoints = [39];

order_book_channel.bind('data', function(data) {
    var bids = data['bids'];
    var asks = data['asks'];
    for(i = 0; i < asks.length ;i++) {
        var yvar = Number(asks[i][0]);
        var zLong = Number(asks[i][1]);
        var nameBids = Math.round(zLong * 100) / 100;
        var pushI = { 	x: i,
            y: yvar,
            z: nameBids,
            name: nameBids
        };
        dataPoints[i] = pushI;
    }

    for(i = 0; i < bids.length ;i++) {
        rI = 19 - i;
        var yHolder = Number(bids[i][0]);
        var zLong = Number(bids[i][1]);
        var nameAsks = Math.round(zLong * 100) / 100
        var pushI = { 	x: i,
            y: yHolder,
            z: nameAsks,
            name: nameAsks
        };
        dataPoints[i + 20] = pushI;
    }

    genBubbles(dataPoints);

});
