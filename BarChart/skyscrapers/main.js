var margin = { left:100, right:10, top:10, bottom:140 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

//X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 140)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("The world's tallest buildings");

//Y Label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Height (m)")

d3.json("data.json").then((data) => {

    console.log("Data", data);

    data.forEach(d => {
        d.height = +d.height;
    });

    // Band width of the bars based on number of bars
    var x = d3.scaleBand()
        .domain(data.map((d) => {
            return d.name;
        }))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    // Linear Scale for height of the buildings
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {
            return d.height;
        })])
        .range([height, 0]);

    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text")
            .attr("y", "10")
            .attr("x", "-5")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");

    var yAxisCall = d3.axisLeft(y)
        .ticks(3)
        .tickFormat((d) => {
            return d + "m";
        });

    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    var rects = g.selectAll("rect")
        .data(data)
    
    rects.enter()
        .append("rect")
            .attr("y", (d) => {
                return y(d.height);
            })
            .attr("x", (d, i) => {
                return x(d.name);
            })
            .attr("width", x.bandwidth)
            .attr("height", (d) => {
                return (height - y(d.height));
            })
            .attr("fill", (d) => {
                return "grey";
            });


}).catch((err) => {

    console.log("Error: ", err);

})