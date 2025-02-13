import * as d3 from "d3";

interface LegendOptions {
  title?: string;
  tickSize?: number;
  width?: number;
  height?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  ticks?: number;
  tickFormat?: string | ((d: number) => string);
  tickValues?: number[];
}

export function Legend(
  color:
    | d3.ScaleSequential<string>
    | d3.ScaleQuantize<number, string>
    | d3.ScaleThreshold<number, string>
    | d3.ScaleOrdinal<string, string>,
  options: LegendOptions = {},
) {
  const {
    title = "",
    tickSize = 6,
    width = 320,
    height = 44 + tickSize,
    marginTop = 18,
    marginRight = 0,
    marginBottom = 16 + tickSize,
    marginLeft = 0,
    ticks = width / 100, // Reduced number of ticks
    tickFormat,
    tickValues,
  } = options;

  function ramp(colorFn: (t: number) => string, n = 256): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = n;
    canvas.height = 1;
    const context = canvas.getContext("2d");
    if (!context) return canvas;
    for (let i = 0; i < n; ++i) {
      context.fillStyle = colorFn(i / (n - 1));
      context.fillRect(i, 0, 1, 1);
    }
    return canvas;
  }

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height])
    .style("overflow", "visible")
    .style("display", "block");

  let x: d3.ScaleLinear<number, number> | d3.ScaleBand<string>;
  let tickAdjust = (g: d3.Selection<SVGGElement, unknown, null, undefined>) =>
    g.selectAll(".tick line").attr("y1", marginTop + marginBottom - height);

  if ("interpolator" in color) {
    const [min, max] = color.domain();
    x = d3
      .scaleLinear()
      .domain([min, max])
      .range([marginLeft, width - marginRight]);
    svg
      .append("image")
      .attr("x", marginLeft)
      .attr("y", marginTop)
      .attr("width", width - marginLeft - marginRight)
      .attr("height", height - marginTop - marginBottom)
      .attr("preserveAspectRatio", "none")
      .attr("xlink:href", ramp(color.interpolator()).toDataURL());
  } else if ("invertExtent" in color) {
    const thresholds = color.thresholds ? color.thresholds() : color.domain();
    x = d3
      .scaleLinear()
      .domain([Math.min(...thresholds), Math.max(...thresholds)])
      .range([marginLeft, width - marginRight]);
    svg
      .append("g")
      .selectAll("rect")
      .data(color.range())
      .join("rect")
      .attr("x", (_, i) => x(thresholds[i - 1] ?? thresholds[0]))
      .attr("y", marginTop)
      .attr(
        "width",
        (_, i) =>
          x(thresholds[i] ?? thresholds[thresholds.length - 1]) -
          x(thresholds[i - 1] ?? thresholds[0]),
      )
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", (d) => d);
  } else {
    x = d3
      .scaleBand()
      .domain(color.domain() as string[])
      .range([marginLeft, width - marginRight]);
    svg
      .append("g")
      .selectAll("rect")
      .data(color.domain())
      .join("rect")
      .attr("x", x)
      .attr("y", marginTop)
      .attr("width", x.bandwidth())
      .attr("height", height - marginTop - marginBottom)
      .attr("fill", color);
  }

  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .tickSize(tickSize)
        .ticks(ticks)
        .tickFormat((d) => {
          let val = d;
          if (typeof d === "number") {
            val = d >= 1000 ? `${(d / 1000).toFixed(0)}k` : d.toFixed(0);
          }
          if (tickFormat != undefined && typeof tickFormat != "string") {
            val = tickFormat(val);
          }
          return val;
        })
        .tickValues(tickValues),
    )
    .call(tickAdjust)
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", marginLeft)
        .attr("y", marginTop + marginBottom - height - 6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(title),
    );

  return svg.node();
}
