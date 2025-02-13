<template>
  <div class="mt-8 flow-root">
    <div class="-my-2 scrollbar-none overflow-x-auto lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <slot name="header">
              <tr>
                <th
                  scope="col"
                  class="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  v-for="(value, key) in modelValue[0]"
                >
                  {{ key }}
                </th>
                <th scope="col" class="relative py-3.5 pr-4 pl-3 sm:pr-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </slot>
          </thead>
          <tbody class="bg-white">
            <tr
              v-for="row in modelValue.slice(0, 10)"
              :key="row.email"
              class="even:bg-gray-50"
            >
              <td
                v-for="(value, key) in row"
                class="py-4 pr-3 pl-4 text-sm whitespace-nowrap text-gray-900 sm:pl-3"
              >
                {{ value }}
              </td>
              <td
                class="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-3"
              >
                <a href="#" class="text-blue-600 hover:text-blue-900"
                  >Edit<span class="sr-only">, {{ row.name }}</span></a
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends TableRow">
export type TableRow = { [key: string]: any };
const modelValue = defineModel<TableRow[]>("modelValue", {
  default: () => [{ name: "Mustafa" }],
});
</script>
