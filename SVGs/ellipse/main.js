
var svg = d3.select("#chart-area")
    .append("svg")
        .attr("height", 400)
        .attr("width", 400)

var ellipse = svg.append("ellipse")
    .attr("cx", 200)
    .attr("cy", 200)
    .attr("rx", 100)
    .attr("ry", 50)
    .attr("fill", "red")

