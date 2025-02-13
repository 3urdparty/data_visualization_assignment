import { onBeforeMount, ref } from "vue";
import type { Datum } from "./types/types";
import * as d3 from "d3";

export const groupBy = <T>(
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
export const useData = (path: string = "/src/data/merged.csv") => {
  const data = ref<Datum[]>([]);

  onBeforeMount(async () => {
    data.value = await d3
      .csv(path)
      .then((d) => d.map((d) => ({ ...d, date: new Date(d.date) })));
  });

  return { data };
};
