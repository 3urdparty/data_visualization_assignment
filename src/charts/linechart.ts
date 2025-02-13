import * as d3 from "d3";
import type { Datum } from "../types/types";

export default function linechart(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: Datum[],
  width: number = 975,
  height: number = 610,
) {
  const marginTop = 20;
  const marginRight = 30;
  const marginBottom = 30;
  const marginLeft = 40;

  // Scales
  const x = d3
    .scaleUtc()
    .domain(d3.extent(data, (d) => new Date(d.name)) as [Date, Date])
    .range([marginLeft, width - marginRight]);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value) ?? 0])
    .range([height - marginBottom, marginTop]);

  // Line generator
  const line = d3
    .line<Datum>()
    .x((d) => x(new Date(d.name)))
    .y((d) => y(d.value));

  // Create the SVG container.
  svg
    .attr("viewBox", [0, 0, width, height])
    .attr("width", width)
    .attr("height", height)
    .attr(
      "style",
      "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;",
    )
    .style("-webkit-tap-highlight-color", "transparent")
    .style("overflow", "visible")
    .on("pointerenter pointermove", pointermoved)
    .on("pointerleave", pointerleft)
    .on("touchstart", (event) => event.preventDefault());

  // Axes
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0),
    );

  const yAxis = svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y).ticks(height / 40))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .selectAll(".tick line")
        .clone()
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1),
    )
    .call((g) =>
      g
        .append("text")
        .attr("x", -marginLeft)
        .attr("y", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text("↑ Pollutants (lbs)"),
    );

  // Line path
  const path = svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line(data));

  // Tooltip
  const tooltip = svg.append("g").style("display", "none");

  function formatValue(value: number) {
    return value.toLocaleString("en");
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC",
    });
  }

  const bisect = d3.bisector<Datum, Date>((d) => new Date(d.name)).center;

  function pointermoved(event: PointerEvent) {
    const i = bisect(data, x.invert(d3.pointer(event, svg.node())[0]));
    if (!data[i]) return;
    tooltip.style("display", null);
    tooltip.attr(
      "transform",
      `translate(${x(new Date(data[i].name))},${y(data[i].value)})`,
    );

    const path = tooltip
      .selectAll("path")
      .data([,])
      .join("path")
      .attr("fill", "white")
      .attr("stroke", "black");

    const text = tooltip
      .selectAll("text")
      .data([,])
      .join("text")
      .call((text) =>
        text
          .selectAll("tspan")
          .data([formatDate(data[i].name), formatValue(data[i].value)])
          .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => (i ? null : "bold"))
          .text((d) => d),
      );

    size(text, path);
  }

  function pointerleft() {
    tooltip.style("display", "none");
  }

  function size(
    text: d3.Selection<SVGTextElement, unknown, null, undefined>,
    path: d3.Selection<SVGPathElement, unknown, null, undefined>,
  ) {
    const { x, y, width: w, height: h } = text.node()!.getBBox();
    text.attr("transform", `translate(${-w / 2},${15 - y})`);
    path.attr(
      "d",
      `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`,
    );
  }

  function update(newData: Datum[]) {
    // Update scales
    x.domain(d3.extent(newData, (d) => new Date(d.name)) as [Date, Date]);
    y.domain([0, d3.max(newData, (d) => d.value) ?? 0]);

    // Update line path
    path.transition().duration(750).attr("d", line(newData));

    // Update axes
    xAxis
      .transition()
      .duration(750)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0),
      );
    yAxis
      .transition()
      .duration(750)
      .call(d3.axisLeft(y).ticks(height / 40));

    // Update event listeners
    data = newData;
  }

  return { update };
}
