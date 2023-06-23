const data = [
    { name: 'Jinja', score: 1423 },
    { name: 'Bugiri', score: 2193 },
    { name: 'Iganga', score: 448 },
    { name: 'Mukono', score: 105.4 },
    { name: 'Luweero', score: 1002 },
    { name: 'Nakaseke', score: 1120 },
    { name: 'Nakasongola', score: 934 },
    { name: 'Buikwe', score: 450 },
    { name: 'Kamuli', score: 1217 },
    { name: 'Kayunga', score: 1489 },
    { name: 'Lamwo', score:12012 },
    { name: 'Mubende', score: 193 },
    { name: 'Bugweri', score: 202 },
    { name: 'Wakiso', score: 201.6 },
  ];

  
  const width = 1200;
  const height = 600;
  const margin = { top: 50, bottom: 50, left: 50, right: 50 };
  
  const svg = d3.select('#d3-container')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
  
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLinear()
    .domain([0, 13000])
    .range([height - margin.bottom, margin.top])
  
  svg
    .append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data.sort((a, b) => d3.descending(a.score, b.score)))
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.score))
      .attr('title', (d) => d.score)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.score))
      .attr("width", x.bandwidth());
  
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }
  
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '20px')
  }
  
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();