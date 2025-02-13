<template>
  <div ref="containerEl" />
</template>

<script lang="ts" setup generic="D extends Datum">
import * as d3 from "d3";
import { computed, onMounted, ref, watch } from "vue";
import type { Datum } from "../types/types";
import piechart from "../charts/piechart.ts";

// Defining Props
interface Props {
  width: number;
  height: number;
  nameKey: keyof Datum;
  valueKey: keyof Datum;
  aggregate: "mean" | "sum";
}

const props = withDefaults(defineProps<Props>(), {
  width: 975,
  height: 610,
  aggregate: "sum",
  valueKey: "non_major_total_pollutants_pounds",
});

let updateCb: (data: any) => void;

// Raw Data
const [data] = defineModel<Datum[]>("data", { default: () => [] });

const aggregatedData = computed(() => {
  const agg = d3[props.aggregate];
  return Array.from(
    d3.rollup(
      data.value,
      (D) => agg(D, (d) => d[props.valueKey]),
      (d) => d.name,
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
    if (updateCb == undefined) return;
    updateCb(newData);
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  if (!containerEl.value) return;
  svg.value = d3.select(containerEl.value).append("svg");
  const { update } = piechart(
    svg.value,
    aggregatedData.value,
    props.width,
    props.height,
  );
  updateCb = update;
});
</script>
