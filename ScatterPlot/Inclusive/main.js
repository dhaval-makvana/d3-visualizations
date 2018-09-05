var margin = {top: 100, right: 10, bottom: 100, left: 100}, 
    width = 600 - margin.left - margin.right, 
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", width + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// X Label
g.append("text")
    .attr("class", "x axis-label")
    .attr("x", width / 2)
    .attr("y", height + 70)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .text("Readiness");

// Y Label
g.append("text")
    .attr("class", "y axis-label")
    .attr("x", -(height / 2))
    .attr("y", -60)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Needs")

d3.json("data.json").then((data) => {

    // console.log("Data coming in : ", data);

    var refinedData = [];
    let needs = data.NEEDS;
    let readiness = data.READINESS;

    for (let i in needs) {
        // console.log("needs loop", i, needs[i], readiness [i]);
        i = {
            needs: needs[i],
            readiness: readiness[i],
            country: i
        }
        refinedData.push(i);
    }

    console.log("Refined Data", refinedData);

    var tip = d3.tip().attr("class", "d3-tip")
    .html(function(d) {
        var text = "<strong>"+ d.country +"</strong><br/><br/>";
        text += "<span style='color: red'>Needs: "+ d.needs +"</span><br/>";
        text += "<span style='color: green'>Readiness: "+ d.readiness +"</span>"
        return text;
    });

    g.call(tip);

    var x = d3.scaleLinear()
        .domain([-10, 100])
        .range([0, width]);
    
    var xAxisCall = d3.axisBottom(x)
        .ticks(10)
        .tickFormat((d) => {
            if (d === -10) {
                return "";
            }
            return d + "r";
        });
    
    g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, "+ height +")")
        .call(xAxisCall);

    var y = d3.scaleLinear()
        .domain([-10, 100])
        .range([height, 0]);

    var yAxisCall = d3.axisLeft(y)
        .ticks(11)
        .tickFormat((d) => {
            if (d === -10) {
                return "";
            }
            return d + "n";
        })
    
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    var circles = g.selectAll("circle")
        .data(refinedData);
    
    circles.enter()
        .append("circle")
            .attr("cx", (d) => {
                // console.log("cx", d);
                return x(d.readiness);
            })
            .attr("cy", (d) => {
                return y(d.needs);
            })
            .attr("r", 10)
            .attr("fill", (d) => {
                if (d.readiness >= 54.6) {
                    if (d.needs <= 34.3) {
                        return "blue" // advanced economies
                    } else {
                        return "green" // potential inclusive markets
                    }
                } else {
                    if (d.needs <= 34.3) {
                        return "red" // failed state
                    } else {
                        return "yellow" // ?
                    }
                }
            })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)



}).catch((err) => {

    console.log("Error : ", err);
    
})