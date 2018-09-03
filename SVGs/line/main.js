
var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", 400)
        .attr("height", 400)


var line = svg.append("line")
    .attr("x1", 100)
    .attr("y1", 100)
    .attr("x2", 300)
    .attr("y2", 300)
    .attr("stroke", "blue")
    .attr("stroke-width", 5);