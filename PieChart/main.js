var width = 650,
    height = 450,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(radius - 70);

var pie = d3.pie()
    .sort(null)
    .value(function(d) {
        // console.log("pie chart data",d);
        return d.value;
     });

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", width)
        .attr("height", height)
    .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("data.json").then((data) => {
    
    // filter data based on the dropdown
    const selectedData = data.All;
    let selectedDataArray = [];

    for (key in selectedData) {
        let individualObject = {};
        individualObject.key = key;
        individualObject.value = selectedData[key];
        selectedDataArray.push(individualObject);
    }

    var g = svg.selectAll(".arc")
      .data(pie(selectedDataArray))
    .enter().append("g")
      .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            // console.log("d fill path", d);
            return color(d.data.key);
         });

    g.append("text")
        .attr("transform", function(d) {
            // console.log("data text", d);
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function(d) {
            // console.log("data in text", d);
            return d.data.key;
        });

}).catch((error) => {

    console.log("Error: ", error);

})