import * as d3 from "d3";
import type { Datum } from "../types/types";

export default function pieChart(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: Datum[],
  width: number,
  height: number,
) {
  const outerRadius = height / 2 - 10;
  const innerRadius = outerRadius * 0.75;
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  svg.attr("viewBox", [-width / 2, -height / 2, width, height]);

  const arc = d3
    .arc<d3.PieArcDatum<Datum>>()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  const pie = d3
    .pie<Datum>()
    .sort(null)
    .value((d) => d.value);

  const tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("background", "white")
    .style("padding", "5px 10px")
    .style("border", "1px solid #ccc")
    .style("border-radius", "4px")
    .style("box-shadow", "0px 0px 5px rgba(0,0,0,0.2)")
    .style("pointer-events", "none")
    .style("opacity", 0);

  let path = svg
    .selectAll("path")
    .data(pie(data))
    .join("path")
    .attr("fill", (_, i) => color(i.toString()))
    .attr("d", arc)
    .each(function (d) {
      (this as any)._current = d;
    })
    .on("mouseover", function (event, d) {
      tooltip.style("opacity", 1).text(`${d.data.name} - ${d.data.value}`);
    })
    .on("mousemove", function (event) {
      tooltip
        .style("left", event.pageX + 10 + "px")
        .style("top", event.pageY + 10 + "px");
    })
    .on("mouseleave", function () {
      tooltip.style("opacity", 0);
    });

  function arcTween(this: any, a: d3.PieArcDatum<Datum>) {
    const i = d3.interpolate(this._current, a);
    this._current = i(1);
    return (t) => arc(i(t))!;
  }

  function update(newData: Datum[]) {
    const newArcs = pie(newData);

    path = path.data(newArcs, (d) => d.data.value);

    path.transition().duration(750).attrTween("d", arcTween);

    path
      .enter()
      .append("path")
      .attr("fill", (_, i) => color(i.toString()))
      .attr("d", arc)
      .style("opacity", 0)
      .each(function (d) {
        (this as any)._current = d;
      })
      .on("mouseover", function (event, d) {
        tooltip.style("opacity", 1).text(`${d.data.name} - ${d.data.value}`);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY + 10 + "px");
      })
      .on("mouseleave", function () {
        tooltip.style("opacity", 0);
      })
      .transition()
      .duration(750)
      .style("opacity", 1)
      .attrTween("d", arcTween);

    path.exit().transition().duration(500).style("opacity", 0).remove();
  }

  return { update };
}
