
d3.json("buildings.json").then((data) => {

    console.log("data", data);

    var svg = d3.select("#chart-area")
        .append("svg")
            .attr("width", 400)
            .attr("height", 400);
    
    var buildings = svg.selectAll("rect")
        .data(data);
    
    buildings.enter()
        .append("rect")
            .attr("x", function(d, i) {
                return (i*50) + 25;
            })
            .attr("y", 50)
            .attr("width", 25)
            .attr("height", function(d) {
                return d.height;
            })
            .attr("fill", "red");

}).catch((err) => {
    console.log("Error", err);
})