var data = [25, 20, 10, 15, 5];

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", 400)
        .attr("height", 400);

var circles = svg.selectAll("circle")
    .data(data);

circles.enter()
    .append("circle")
        .attr("cx", function(d, i){
            // console.log("data", d);
            // console.log("index", i);

            return (i*50) + 25;
        })
        .attr("cy", 200)
        .attr("r", function(d){
            // console.log("radius data", d)
            return d;
        })
        .attr("fill", "red");
