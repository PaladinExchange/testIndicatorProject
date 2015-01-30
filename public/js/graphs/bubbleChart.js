/**
 * Created by danny on 1/29/15.
 */


function genBubbles(dataPoints) {
    var min = dataPoints[39]['y'] - .25;
    var max = dataPoints[19]['y'] + .25;

    var chart = new CanvasJS.Chart("chartContainer",
        {
            zoomEnabled: true,
            animationEnabled: false,
            height: 800,
            title:{

            },

            axisX: {
                title:"Queue",
                titleFontSize: 20,
                labelFontSize: 15
            },
            axisY: {
                title:"Price",
                maximum: max,
                minimum: min,
                titleFontSize: 20,
                labelFontSize: 15

            },

            legend:{


            },
            data: [
                {
                    type: "bubble",
                    indexLabel: "{z}",
                    indexLabelFontSize: 10,
                    indexLabelFontColor: "black",
                    indexLabelPlacement: "outside",
                    showInLegend: true,
                    legendMarkerType: "circle",
                    legendMarkerColor: "grey",
                    toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong>Queue</strong> {x}<br/> <strong>Price</strong> {y}<br/> <strong>Size</strong> {z}",

                    dataPoints: dataPoints
                }
            ]


        });

    chart.render();
}



var bids_placeholder = document.getElementById("bids_placeholder")
var asks_placeholder = document.getElementById("asks_placeholder")
var pusher = new Pusher('de504dc5763aeef9ff52');
var order_book_channel = pusher.subscribe('order_book');
var dataPoints = new Array(39);


order_book_channel.bind('data', function(data) {
    var d = data['bids'];
    var asks = data['asks'];
    for(i = 0; i < asks.length ;i++) {
        var yHolder = Number(asks[i][0]);
        var zHolder = Number(asks[i][1]);
        var pushI = { 	x: i,
            y: yHolder,
            z: zHolder,
            name: asks[i][0]
        };
        dataPoints[i] = pushI;
    }

    for(i = 0; i < d.length ;i++) {
        rI = 19 - i;
        var yHolder = Number(d[i][0]);
        var zHolder = Number(d[i][1]);

        var pushI = { 	x: i,
            y: yHolder,
            z: zHolder,
            name: d[i][0]
        };
        dataPoints[i + 20] = pushI;
    }
    genBubbles(dataPoints);

});
