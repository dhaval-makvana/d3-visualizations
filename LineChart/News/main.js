var margin = {top: 50, right: 50, bottom: 50, left: 50}
    , width = window.innerWidth - margin.left - margin.right // Use the window's width 
    , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
  
// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number


var articles = d3.json("data.json").then((data) => {

    var Articles = {};
    var ArticlesArray = [];

    data.map((news) => {

        let newsArticle = {}
        let isoDate = new Date(news.published);
        let date = isoDate.toDateString().split(" ");
        let dateString = date[2] + date[1] + date[3];

        if (date[1] === "Jan") {
            date[1] = 1
        } else if (date[1] === "Feb") {
            date[1] = 2
        } else if (date[1] === "Mar") {
            date[1] = 3
        } else if (date[1] === "Apr") {
            date[1] = 4
        } else if (date[1] === "May") {
            date[1] = 5
        } else if (date[1] === "Jun") {
            date[1] = 6
        } else if (date[1] === "Jul") {
            date[1] = 7
        } else if (date[1] === "Aug") {
            date[1] = 8
        } else if (date[1] === "Sep") {
            date[1] = 9
        } else if (date[1] === "Oct") {
            date[1] = 10
        } else if (date[1] === "Nov") {
            date[1] = 11
        } else{ 
            date[1] = 12
        }

        newsArticle.day = date[0];
        newsArticle.date = date[2];
        newsArticle.year = date[3];
        newsArticle.month = date[1];
        newsArticle.isoDate = date[2] + ' ' + date[1] + ' ' + date[3];
        newsArticle.dateString = dateString;
        newsArticle.totalSentiment = news.sentiment;
        newsArticle.averageSentiment = news.sentiment;
        newsArticle.tweets = 1;
        newsArticle.source = news.source;
        newsArticle.indicator = news.indicator;
        newsArticle.published = news.published;

        if (dateString in Articles) {

            let object = Articles[dateString];
            object.totalSentiment = object.totalSentiment + newsArticle.totalSentiment;
            object.tweets = object.tweets + 1;
            object.averageSentiment = object.totalSentiment / object.tweets;

            Articles[dateString] = object;

        } else {
            Articles[dateString] = newsArticle;
        }

    })


    var parseDate = d3.timeFormat("%B %d, %Y");

    //converting object into array
    for (var key in  Articles) {
        ArticlesArray.push(Articles[key]);
    }

    ArticlesArray.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.published) - new Date(a.published);
    });

    // The number of datapoints
    var n = ArticlesArray.length;
    
    // 5. X scale will use the index of our data
    var xScale = d3.scaleLinear()
        .domain([0, n-1]) // input
        .range([0, width]); // output
    
    console.log("date", new Date(2001, 8, 20));

    var xScale = d3.scaleTime()
        .domain(d3.extent(ArticlesArray, (d) => {
            return new Date(+d.year,+d.month,+d.date);
        }))
        .range([0, width]);
    
    var xAxisCall = d3.axisBottom(xScale)
        .ticks(10)
        .tickFormat((d) => {
            return d.date + d.month + d.year;
        });
    
    
    // 6. Y scale will use the randomly generate number 
    var yScale = d3.scaleLinear()
        .domain([-1, 1]) // input 
        .range([height, 0]); // output 

    
    // 7. d3's line generator
    var line = d3.line()
        .x(function(d) { 
            console.log("x axis",d);
            return xScale(d.x); 
        }) // set the x values for the line generator
        .y(function(d) { 
            return yScale(d.y); 
        }) // set the y values for the line generator 
        // .curve(d3.curveMonotoneX) 
        // apply smoothing to the line

    var dataset = ArticlesArray.map(function(d) { 
        return {
            "y": d.averageSentiment,
            "x": new Date(+d.year, +d.month, +d.date)
        } 
    });

    console.log("Articles", ArticlesArray);

    // 1. Add the SVG to the page and employ #2
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 3. Call the x axis in a group tag
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom

    // 4. Call the y axis in a group tag
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft

    // 9. Append the path, bind the data, and call the line generator 
    svg.append("path")
        .datum(dataset) // 10. Binds data to the line 
        .attr("class", "line") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    // 12. Appends a circle for each datapoint 
    svg.selectAll(".dot")
        .data(dataset)
            .enter().append("circle") // Uses the enter().append() method
                .attr("class", "dot") // Assign a class for styling
                .attr("cx", function(d, i) { return xScale(d.x) })
                .attr("cy", function(d) { return yScale(d.y) })
                .attr("r", 5)
                .on("mouseover", function(a, b, c) { 
                    console.log(a) 
                    this.attr('class', 'focus')
                })
                // .on("mouseout", function() { 
                    
                // })





}).catch((err) => {

    console.log("Error: ", err);

});

