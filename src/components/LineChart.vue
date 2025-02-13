<template>
  <div ref="containerEl" />
</template>

<script lang="ts" setup>
import * as d3 from "d3";
import { computed, onMounted, ref, watch } from "vue";
import type { Datum } from "../types/types";
import linechart from "../charts/linechart.ts";

interface Props {
  width: number;
  height: number;
  aggregate: "mean" | "sum";
  valueKey: keyof Datum;
}
const props = withDefaults(defineProps<Props>(), {
  width: 975,
  height: 610,
  aggregate: "sum",
  valueKey: "major_pollutants_pounds",
});

let updateCb: (data: any) => void;
const [data] = defineModel<Datum[]>("data", { default: () => [] });

const aggregatedData = computed(() => {
  const agg = d3[props.aggregate];
  return Array.from(
    d3.rollup(
      data.value,
      (D) => agg(D, (d) => d[props.valueKey]),
      (d) => new Date(d.date),
    ),
    ([name, value]) => ({
      name,
      value,
    }),
  );
});

const containerEl = ref<HTMLDivElement | null>();

const svg = ref();

watch(
  aggregatedData,
  (newData) => {
    console.log("update", data.value);
    if (updateCb == undefined) return;
    console.log(newData);
    updateCb(newData);
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  if (!containerEl.value) return;
  svg.value = d3.select(containerEl.value).append("svg");
  console.log("mount", data.value);
  const { update } = linechart(
    svg.value,
    aggregatedData.value,
    props.width,
    props.height,
  );
  updateCb = update;
});
</script>
