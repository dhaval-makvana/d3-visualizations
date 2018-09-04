
d3.json("data.json").then((data) => {

    console.log("Data", data);

}).catch((err) => {
    console.log("Error: ", err);
})