import * as d3 from "d3";
import type { Datum } from "../types/types";

export default function histogram(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: Datum[],
  width: number = 975,
  height: number = 610,
) {
  // Specify the chart’s dimensions.
  const marginTop = 20;
  const marginRight = 0;
  const marginBottom = 80; // Increased for rotated labels
  const marginLeft = 40;

  const barColor = "red";
  // Create the SVG container.
  svg
    .attr("viewBox", [0, 0, width, height])
    .attr(
      "style",
      `max-width: ${width}px; height: auto; font: 10px sans-serif; overflow: visible;`,
    );

  const gx = svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`);
  const gy = svg.append("g").attr("transform", `translate(${marginLeft},0)`);

  const barGroup = svg.append("g").attr("fill", barColor);

  // Create the tooltip element
  const tooltip = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("padding", "6px 8px")
    .style("background", "rgba(0, 0, 0, 0.7)")
    .style("color", "#fff")
    .style("border-radius", "4px")
    .style("pointer-events", "none")
    .style("font-size", "12px")
    .style("opacity", 0);

  function update(newData: Datum[]) {
    // Sort data in descending order
    newData.sort((a, b) => b.value - a.value);

    // Declare the x (horizontal position) scale and the corresponding axis generator.
    const x = d3
      .scaleBand()
      .domain(newData.map((d) => d.name))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const xAxis = d3.axisBottom(x).tickSizeOuter(0);

    // Declare the y (vertical position) scale.
    const y = d3
      .scaleLinear()
      .domain([0, 150000000])
      .nice()
      .range([height - marginBottom, marginTop]);

    const yAxis = d3.axisLeft(y);

    // Bind data to bars
    const bars = barGroup.selectAll("rect").data(newData, (d) => d.name);

    bars.join(
      (enter) =>
        enter
          .append("rect")
          .attr("x", (d) => x(d.name)!)
          .attr("y", y(0)) // Start from the bottom
          .attr("height", 0) // Initially no height
          .attr("width", x.bandwidth())
          .attr("fill", barColor)
          .on("mouseover", function (event, d) {
            tooltip.style("opacity", 1);
            d3.select(this).attr("fill", "orange"); // Highlight on hover
          })
          .on("mousemove", function (event, d) {
            tooltip
              .html(`<strong>${d.name}</strong>: ${d.value}`)
              .style("left", event.pageX + 10 + "px")
              .style("top", event.pageY - 28 + "px");
          })
          .on("mouseout", function () {
            tooltip.style("opacity", 0);
            d3.select(this).attr("fill", barColor); // Revert color
          })
          .call((enter) =>
            enter
              .transition()
              .duration(750)
              .attr("y", (d) => y(d.value))
              .attr("height", (d) => y(0) - y(d.value)),
          ),
      (update) =>
        update
          .on("mouseover", function (event, d) {
            tooltip.style("opacity", 1);
            d3.select(this).attr("fill", "orange");
          })
          .on("mousemove", function (event, d) {
            tooltip
              .html(`<strong>${d.name}</strong>: ${d.value}`)
              .style("left", event.pageX + 10 + "px")
              .style("top", event.pageY - 28 + "px");
          })
          .on("mouseout", function () {
            tooltip.style("opacity", 0);
            d3.select(this).attr("fill", barColor);
          })
          .call((update) =>
            update
              .transition()
              .duration(750)
              .attr("x", (d) => x(d.name)!)
              .attr("y", (d) => y(d.value))
              .attr("height", (d) => y(0) - y(d.value))
              .attr("width", x.bandwidth()),
          ),
      (exit) =>
        exit.call((exit) =>
          exit
            .transition()
            .duration(750)
            .attr("y", y(0))
            .attr("height", 0)
            .remove(),
        ),
    );

    // Update the axes.
    gx.transition()
      .duration(750)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -10)
      .attr("y", 0)
      .attr("dy", ".35em")
      .style("text-anchor", "end");

    gy.transition()
      .duration(750)
      .call(yAxis)
      .call((g) => g.select(".domain").remove());
  }

  // Initial draw
  update(data);

  return Object.assign(svg.node(), { update });
}
