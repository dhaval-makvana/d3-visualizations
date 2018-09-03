var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", 400)
        .attr("height", 400);

var rectangle = svg.append("rect")
    .attr("x", 20)
    .attr("y", 20)
    .attr("height", 50)
    .attr("width", 80)
    .attr("fill", "yellow");

