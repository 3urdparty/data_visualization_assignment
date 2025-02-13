<template>
  <div ref="containerEl" />
</template>

<script lang="ts" setup generic="D extends Datum">
import * as d3 from "d3";
import { onMounted, ref, watch } from "vue";
import type { Datum } from "../types/types";
import scatter from "../charts/scatter.ts";

interface Props {
  width: number;
  height: number;
}
const props = withDefaults(defineProps<Props>(), {
  width: 975,
  height: 610,
});

let updateCb: (data: any) => void;
const [data] = defineModel("data", { default: () => [] });

const containerEl = ref<HTMLDivElement | null>();

const svg = ref();

watch(
  data,
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
  const { update } = scatter(svg.value, data.value, props.width, props.height);
  updateCb = update;
});
</script>
