import * as d3 from "d3";
import type { Datum } from "../types/types";

export default function scatter(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: Datum[],
  width: number = 975,
  height: number = 610,
) {
  // Specify the chart’s dimensions.
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  const valueKey: keyof Datum = "non_majors_pollutant_loadings";
  // Create scales.
  const x = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[valueKey]) ?? 0])
    .nice()
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[valueKey]) ?? 0])
    .nice()
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  svg.attr("viewBox", [0, 0, width, height]).property("value", []);

  // Append axes.
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", width - marginRight)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text("Total pollution (lb/year)"),
    );

  const yAxis = svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .select(".tick:last-of-type text")
        .clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Wildfire Incidents"),
    );

  // Append dots.
  const dotsGroup = svg
    .append("g")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5);

  function drawDots(data: Datum[]) {
    const dots = dotsGroup
      .selectAll("circle")
      .data(data, (d) => d[valueKey] as any);

    // Enter + Update
    dots
      .join("circle")
      .transition()
      .duration(750)
      .attr("r", 3)
      .attr("cx", (d) => x(d[valueKey] as number))
      .attr("cy", (d) => y(d[valueKey] as number));
  }

  drawDots(data);

  function update(newData: Datum[]) {
    // Update scales.
    x.domain([0, d3.max(newData, (d) => d[valueKey] as number) ?? 0]).nice();
    y.domain([0, d3.max(newData, (d) => d[valueKey] as number) ?? 0]).nice();

    // Update axes.
    xAxis.transition().duration(750).call(d3.axisBottom(x));
    yAxis.transition().duration(750).call(d3.axisLeft(y));

    // Update dots.
    drawDots(newData);
  }

  return { update };
}
