<template>
  <div>
    <div>
      <input :min="0" :max="keys.length" type="range" v-model="selectedIndex" />
      <Histogram class="w-80 h-80" :data="grouped[keys[selectedIndex]]" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { Datum } from "../types/types";
import Chloropleth from "./Chloropleth.vue";
import Histogram from "./Histogram.vue";

const [selectedIndex] = defineModel<number>("index", { default: 0 });
const [data] = defineModel<Datum[]>("data", { default: () => [] });

interface Props {
  groupBy: keyof Datum;
}
const props = withDefaults(defineProps<Props>(), {
  groupBy: "date",
});

const groupBy = <T,>(
  array: T[],
  predicate: (value: T, index: number, array: T[]) => string,
) =>
  array.reduce(
    (acc, value, index, array) => {
      (acc[predicate(value, index, array)] ||= []).push(value);
      return acc;
    },
    {} as { [key: string]: T[] },
  );
const grouped = computed(() =>
  groupBy(data.value, (d: Datum) => d[props.groupBy]),
);

const keys = computed(() => Object.keys(grouped.value));
</script>
