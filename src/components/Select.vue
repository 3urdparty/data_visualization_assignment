<template>
  <div>
    <div class="mt-2 grid grid-cols-1">
      <select
        :id="id"
        :name="name"
        class="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-orange-600 sm:text-sm/6"
        v-model="modelValue"
      >
        <option v-for="option in options" :value="option.value">
          {{ option.name }}
        </option>
      </select>
      <ChevronDown
        class="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-400 sm:size-4"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

export type Option = {
  name: string;
  value: string;
};

interface Props {
  options: Option[];
  name: string;
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  options: () => [
    {
      name: "Option",
      value: "option",
    },
  ],
  name: "Select",
  id: "id",
});

const [modelValue] = defineModel("modelValue", {});
</script>
