// setting the margin of the svg bar chart area
var margin = { top: 10, bottom: 150, left: 100, right: 10 }

// setting the height and width of the bar chart
var width = 600 - margin.left - margin.right,
    height = 400 - margin.bottom - margin.top;

var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top +")");

d3.json("data.json").then((data) => {

    console.log("data", data);

    // converting height in numeric value
    data.forEach(d => {
        d.height = +d.height;
    });

    // resizing the width of the bars
    var x = d3.scaleBand()
        .domain(data.map((d) => {
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    // scaling the height of the bars
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d){
            return d.height;
        })])
        .range([0, height]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("tranform", "translate(0", + height + ")")
        .call(xAxisCall)
    .selectAll("text")
        .attr("y", "10")
        .attr("x", "-5")
        .attr("text-anchor", "end")
        .attr("tranform", "rotate(-40)");
    
    var yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat((d) => {
            return d + "m";
        });
    g.append("g")
        .attr("class", "y-axis")
        .call(yAxisCall);
    
    var rects = g.selectAll("rect")
        .data(data);

    rects.enter()
        .append("rect")
            .attr("x", (d, i) => {
                return x(d.name);
            })
            .attr("y", 0)
            .attr("width", x.bandwidth)
            .attr("height", (d) => {
                return y(d.height);
            })
            .attr("fill", "red");


}).catch((err) => {

    console.log("Error", err);

})