<template>
  <div ref="containerEl" />
</template>

<script lang="ts" setup generic="D extends Datum">
import * as d3 from "d3";
import { computed, onMounted, ref, watch } from "vue";
import type { Datum } from "../types/types";
import chloroplethMap from "../charts/map";

interface Props {
  width: number;
  height: number;
  aggregate: "mean" | "sum";
  valueKey: keyof Datum;
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: 1000,
  height: 610,
  aggregate: "sum",
  valueKey: "major_pollutants_pounds",
  title: "The States",
});

let updateCb: (data: any, title: string) => void;
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
    console.log(newData);
    updateCb(newData, props.title);
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  if (!containerEl.value) return;
  svg.value = d3.select(containerEl.value).append("svg");
  const { update } = chloroplethMap(
    svg.value,
    aggregatedData.value,
    props.width,
    props.height,
  );
  updateCb = update;
  const { title, unit } = props;
  const options = { title, unit };
  updateCb(aggregatedData.value, options);
});
</script>
