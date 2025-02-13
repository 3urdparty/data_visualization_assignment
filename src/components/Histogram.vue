<template>
  <div ref="containerEl" />
</template>

<script lang="ts" setup generic="D extends Datum">
import * as d3 from "d3";
import { computed, onMounted, ref, watch } from "vue";
import type { Datum } from "../types/types";
import chloroplethMap from "../charts/map";
import histogram from "../charts/histogram";

interface Props {
  width: number;
  height: number;
  valueKey: string;
}
const props = withDefaults(defineProps<Props>(), {
  width: 975,
  height: 610,
  valueKey: "non_majors_pollutant_loadings",
});

let updateCb: (data: any) => void;
const [data] = defineModel("data", { default: () => [] });

const containerEl = ref<HTMLDivElement | null>();

const svg = ref();

const aggregatedData = computed(() =>
  data.value.map(({ name, ...data }) => ({
    name,
    value: data[props.valueKey],
  })),
);
watch(
  aggregatedData,
  (newData) => {
    if (updateCb == undefined) return;
    console.log(newData);
    updateCb(newData);
  },
  { deep: true, immediate: true },
);

onMounted(() => {
  if (!containerEl.value) return;
  svg.value = d3.select(containerEl.value).append("svg");
  const { update } = histogram(
    svg.value,
    data.value,
    props.width,
    props.height,
  );
  updateCb = update;
  updateCb(data.value);
});
</script>
