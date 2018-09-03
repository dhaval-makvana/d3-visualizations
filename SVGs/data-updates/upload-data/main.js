
d3.json("./data.json").then((data) => {

    // console.log("data uploaded", data);

    var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", 400)
        .attr("height", 400)

    var circles = svg.selectAll("circle")
        .data(data);
    
    circles.enter()
        .append("circle")
            .attr("cx", function(d, i){
                return (i*50) + 25;
            })
            .attr("cy", 200)
            .attr("r", function(d) {
                return d.age * 2;
            })
            .attr("fill", (d) => {
                // console.log("fill color", d);
                if (d.name === "Tony") {
                    return "red";
                } else if(d.name === "Jessica") {
                    return "black";
                } else if(d.name === "Andrew") {
                    return "yellow";
                } else if(d.name === "Emily") {
                    return "blue";
                } else {
                    return "green";
                }
            });


}).catch((err) => {
    console.log("Error loading data file", err);
})
