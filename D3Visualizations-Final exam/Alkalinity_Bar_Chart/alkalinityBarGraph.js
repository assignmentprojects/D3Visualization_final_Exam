/*******************************************************************************
Author: Solimo Rajab
File: alkalinityBarGraph.js
*******************************************************************************/

var margin = {top: 20, right: 10, bottom: 100, left:50},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;



var svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");


// define x and y scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);

// define x axis and y axis
var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");


d3.csv("totalalkalinity.csv", function(error,data) {
  if(error) console.log("Error: data not loaded!");


  data.forEach(function(d) {
    d.district = d.district;
    d.total_alkalinity = +d.total_alkalinity;     
    console.log(d.total_alkalinity);   // use console.log to confirm
  });

  // sort the gdp values
  data.sort(function(a,b) {
    return b.total_alkalinity - a.total_alkalinity;
  });

  // Specify the domains of the x and y scales
  xScale.domain(data.map(function(d) { return d.district; }) );
  yScale.domain([0, d3.max(data, function(d) { return d.total_alkalinity; } ) ]);

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr("height", 0)
    .attr("y", height)
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
    // attributes can be also combined under one .attr
    .attr({
      "x": function(d) { return xScale(d.district); },
      "y": function(d) { return yScale(d.total_alkalinity); },
      "width": xScale.rangeBand(),
      "height": function(d) { return  height - yScale(d.total_alkalinity); }
    })
    .style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});


        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')



            .text(function(d){
                return d.total_alkalinity;
            })
            .attr({
                "x": function(d){ return xScale(d.district) +  xScale.rangeBand()/2; },
                "y": function(d){ return yScale(d.total_alkalinity)+ 12; },
                "font-family": 'sans-serif',
                "font-size": '13px',
                "font-weight": 'bold',
                "fill": 'white',
                "text-anchor": 'middle'
            });

    // Draw xAxis and position the label
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
        .attr("dx", "-.8em")
        .attr("dy", ".25em")
        .attr("transform", "rotate(-60)" )
        .style("text-anchor", "end")
        .attr("font-size", "10px");


    // Draw yAxis and postion the label
    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height/2)
        .attr("dy", "-3em")
        .style("text-anchor", "middle")
        .text("Toal Alkalinity per district");
});
