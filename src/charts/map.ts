import * as topojson from "topojson-client";
import * as d3 from "d3";
import { Legend } from "./legend";
import us from "@/data/counties-albers-10m.json";

type USMap = {
  type: string;
  objects: {
    states: {
      type: string;
      geometries: {
        type: string;
        properties: { name: string };
        id: string;
      }[];
    };
    counties: {
      type: string;
      geometries: any[];
    };
  };
  arcs: any;
  transform: any;
};

export default function createChoroplethMap(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  data: { name: string; value: number }[],
  width: number = 975,
  height: number = 610,
) {
  const namemap = new Map(
    us.objects.states.geometries.map((d) => [d.properties.name, d.id]),
  );

  const path = d3.geoPath();
  const valuemap = new Map<string, number>();
  const states = topojson.feature(us, us.objects.states);

  svg
    .attr("viewBox", `0 0 ${width} ${height}`)
    .attr("style", "width:100%; height:100%; max-width: 100%; height: auto;")
    .on("click", reset);

  const g = svg.append("g");

  function clicked(
    event: d3.D3ZoomEvent<SVGPathElement, GeoJSON.Feature>,
    d: GeoJSON.Feature,
  ) {
    if (!d) return;

    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    svgStates.transition().style("fill", null);
    d3.select(event.target).transition().style("fill", "blue");

    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform as any,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)),
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node() as Element),
      );
  }

  function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
    const { transform } = event;
    g.attr("transform", transform.toString());
    g.attr("stroke-width", 1 / transform.k);
  }

  function update(
    newData: { name: string; value: number }[],
    { title, unit }: { title: string; unit?: string },
  ) {
    const min = Math.floor(Math.min(...newData.map((d) => d.value)) / 10) * 10;
    const max = Math.ceil(Math.max(...newData.map((d) => d.value)) / 10) * 10;
    console.log("chloro update", min, max);

    const color = d3
      .scaleQuantize<number, string>()
      .domain([min, max])
      .range(d3.schemeGreys[4] as Iterable<number, any>);

    // Update the value map with the new data
    newData.forEach((d) => {
      const stateId = namemap.get(d.name);
      if (stateId) {
        valuemap.set(stateId, d.value);
      }
    });

    // Update the colors of the states based on the new values
    svgStates
      .transition()
      .duration(750)
      .attr("fill", (d) => color(valuemap.get(d.id as string) || 0));

    svg.select(".legend").remove();
    svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", "translate(610,20)")
      .append(() =>
        Legend(d3.scaleSequential([min, max], d3.interpolateGreys), {
          title,
          width: 260,
        }),
      );
  }

  const svgStates = g
    .append("g")
    .attr("fill", "#444")
    .attr("cursor", "pointer")
    .selectAll<
      SVGPathElement,
      GeoJSON.Feature<GeoJSON.GeometryObject, { name: string }>
    >("path")
    .data(states.features)
    .join("path")
    .on("click", clicked)
    .attr("d", path);

  svgStates.append("title").text((d) => d.properties?.name || "");

  g.append("path")
    .attr("fill", "none")
    .attr("stroke", "white")
    .attr("stroke-linejoin", "round")
    .attr(
      "d",
      path(topojson.mesh(us, us.objects.states, (a, b) => a !== b) as any) ||
        "",
    );

  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

  svg.call(zoom);

  function reset() {
    svgStates.transition().style("fill", null);
    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform as any,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node() as Element).invert([width / 2, height / 2]),
      );
  }

  return { update };
}
