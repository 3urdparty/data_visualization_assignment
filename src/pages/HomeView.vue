<template>
  <div class="bg-white">
    <!-- Header -->

    <main class="isolate">
      <!-- Hero section -->
      <div class="relative pt-14">
        <div
          class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          />
        </div>
        <div class="pt-24 sm:pt-32 lg:pb-40">
          <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
              <h1
                class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
              >
                A story about air pollution in the states, and its relation to
                natural disasters
              </h1>
              <p
                class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8"
              >
                And what that could indicate about our progress towards tackling
                pollution and climate change
              </p>
              <div class="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  class="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >Get started</a
                >
                <a href="#" class="text-sm/6 font-semibold text-gray-900"
                  >View Sources <span aria-hidden="true">→</span></a
                >
              </div>
            </div>

            <div class="mt-16 sm:mt-24">
              <Select
                :options="metrics"
                class="sm:px-10"
                v-model="filters.valueKey"
              />
              <div class="w-full max-w-md mx-auto my-10">
                <label
                  for="slider"
                  class="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Year
                </label>
                <input
                  id="slider"
                  type="range"
                  :min="0"
                  :max="keys?.length - 1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="selectedIndex"
                />
                <div class="flex justify-between text-sm text-gray-500 mt-1">
                  <span v-if="keys">{{ new Date(keys[0]).getFullYear() }}</span>
                  <span v-if="keys">{{
                    new Date(keys[keys?.length - 1]).getFullYear()
                  }}</span>
                </div>
              </div>
              <div class="flow-root mt-6">
                <div
                  class="rounded-xl bg-gray-100/5 ring-1 ring-inset lg:m-10 ring-gray-900/10 lg:rounded-2xl lg:p-4"
                >
                  <div class="w-full flex items-center justify-center">
                    <Chloropleth
                      v-if="grouped && keys"
                      class="w-full"
                      :title="
                        metrics.find((m) => m.value == filters.valueKey).name
                      "
                      :unit="
                        metrics.find((m) => m.value == filters.valueKey)?.unit
                      "
                      v-model:data="grouped[keys[selectedIndex]]"
                      :value-key="filters.valueKey"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style="
              clip-path: polygon(
                74.1% 44.1%,
                100% 61.6%,
                97.5% 26.9%,
                85.5% 0.1%,
                80.7% 2%,
                72.5% 32.5%,
                60.2% 62.4%,
                52.4% 68.1%,
                47.5% 58.3%,
                45.2% 34.5%,
                27.5% 76.7%,
                0.1% 64.9%,
                17.9% 100%,
                27.6% 76.8%,
                76.1% 97.7%,
                74.1% 44.1%
              );
            "
          />
        </div>
      </div>

      <section
        class="px-10 mt-10 grid grid-cols-1 lg:grid-cols-full lg:gap-x-8 lg:gap-y-16"
      >
        <div class="lg:pr-8">
          <h2
            class="text-2xl font-semibold tracking-tight text-pretty text-gray-900"
          >
            Pollution in the States
          </h2>
          <p class="mt-6 text-base/7 text-gray-600">
            For the past decade, the United States has remained a global
            manufacturing powerhouse, leading the world in industrial production
            and technological advancements. From steel mills and chemical plants
            to large-scale automotive and electronics factories, the country has
            played a pivotal role in shaping the modern industrial landscape.
            However, this rapid expansion has often come at an environmental
            cost.
          </p>

          <p class="mt-8 text-base/7 text-gray-600">
            For much of the industrial era, lax pollution regulations allowed
            factories to discharge significant amounts of waste and harmful
            pollutants into the air, water, and soil. We will be visualizing
            this data.
          </p>
        </div>
      </section>

      <section
        class="mt-10 px-10 grid grid-cols-1 lg:grid-cols-full lg:gap-x-8 lg:gap-y-16"
      >
        <div class="lg:pr-8">
          <h2
            class="text-2xl font-semibold tracking-tight text-pretty text-gray-900"
          >
            Our Dataset
          </h2>
          <p>
            For this story, we combined the csv files of pollution data for the
            states for each year since the start of the survey
          </p>
          <ul class="flex items-baseline mt-8">
            <li v-for="idx in [1, 2, 3]" class="flex items-center">
              <img src="../assets/csv.svg" class="w-16 opacity-80" />
              <span class="font-semibold text-2xl">{{
                idx == 3 ? "=" : "+"
              }}</span>
            </li>

            <li class="flex items-center">
              <img src="../assets/csv.svg" class="w-24" />
            </li>
          </ul>
        </div>

        <div class="max-lg:mt-10 lg:col-span-1">
          <p class="text-base/7 font-semibold text-gray-500">The numbers</p>
          <hr class="mt-6 border-t border-gray-200" />
          <dl class="mt-6 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            <div
              class="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4"
            >
              <dt class="text-sm/6 text-gray-600">Megatonnes</dt>
              <dd class="order-first text-6xl font-semibold tracking-tight">
                <span>1123M</span>
              </dd>
            </div>
            <div
              class="flex flex-col gap-y-2 border-b border-dotted border-gray-200 pb-4"
            >
              <dt class="text-sm/6 text-gray-600">
                Since the start of the survey
              </dt>
              <dd class="order-first text-6xl font-semibold tracking-tight">
                <span>20</span>yrs
              </dd>
            </div>
            <div
              class="flex flex-col gap-y-2 max-sm:border-b max-sm:border-dotted max-sm:border-gray-200 max-sm:pb-4"
            >
              <dt class="text-sm/6 text-gray-600">Permits</dt>
              <dd class="order-first text-6xl font-semibold tracking-tight">
                <span>1.5</span>M
              </dd>
            </div>
            <div class="flex flex-col gap-y-2">
              <dt class="text-sm/6 text-gray-600">States</dt>
              <dd class="order-first text-6xl font-semibold tracking-tight">
                <span>50</span>
              </dd>
            </div>
          </dl>
        </div>

        <div class="max-lg:mt-16 lg:col-span-1">
          <p class="text-base/7 font-semibold text-gray-900">Key Metrics</p>
          <p class="text-sm">
            These are metrics used in the dataset for the levels of pollution,
            explained below:
          </p>

          <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="bg-white shadow-md p-4 rounded-lg border border-neutral-300/80"
              v-for="metric in metrics"
            >
              <div class="flex items-center gap-2">
                <component :is="metric.icon" class="text-blue-400 w-5" />
                <h3 class="text-md font-semibold text-neutral-700">
                  {{ metric.name }}
                </h3>
              </div>
              <p class="text-gray-700">
                {{ metric.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-20">
        <div class="sm:flex sm:items-center px-6 -mb-6">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold text-gray-900">Data</h1>
            <p class="mt-2 text-sm text-gray-700">
              Here is a snapshot of the data:
            </p>
          </div>
          <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              class="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Add Data Point
            </button>
          </div>
        </div>
      </div>
      <Table v-model="data" />

      <!-- Feature section -->
      <div class="mx-auto max-w-7xl px-6 lg:px-8 mt-40">
        <div class="mx-auto max-w-2xl lg:text-center">
          <h2 class="text-base/7 font-semibold text-blue-600">Deploy faster</h2>
          <p
            class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"
          >
            Each State's contribution to Pollution
          </p>
          <p class="mt-6 text-pretty text-lg/8 text-gray-600">
            We will be using a pie chart to visualize the contribution of each
            of the states to the Pollution in the states across the
            aforementioned metrics. Using a pie chart here is better than using
            a bar chart for eg, since we want to focus on the contribution of
            each state relative to each other, which is harder to do with a bar
            chart. You can change the visualized metric using the following
            select button, and even filter the countries included in the pie
            chart using the below multiselect input.
          </p>

          <div class="col-span-2 space-y-2 mt-8">
            <Select
              :options="metrics.filter((m) => !m.percent)"
              v-model="filters.valueKey"
            />
            <StateSelect :options="states" v-model="filters.states" />
          </div>
        </div>
        <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl
            class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
          >
            <PieChart
              class="col-span-4"
              :data="data.filter((d) => filters.states.includes(d.name))"
              :value-key="filters.valueKey"
            />

            <div class="py-24 sm:pt-48 col-span-4">
              <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:text-center">
                  <h2 class="text-base/7 font-semibold text-blue-600">
                    Insights
                  </h2>
                  <p
                    class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"
                  >
                    Key Snapshots
                  </p>
                  <p class="mt-6 text-pretty text-lg/8 text-gray-600">
                    Across some metrics like
                    <span class="text-blue-500"
                      >total toxic-weighted pounds (lb-eq/year) for majors</span
                    >,
                    <span class="text-blue-500"
                      >Total Pollutants Pounds for Majors</span
                    >
                    and
                    <span class="text-blue-500"
                      >Total Toxic-Weighted Pounds (lb-eq/year) for
                      Non-Majors</span
                    >, there appears to be some key players:
                    <span class="font-semibold">Louisiana</span> in Majors and
                    <span class="font-semibold">Californa</span> in Non-Majors
                    For Louisiane, this is to be expected. The State is known
                    for its oil production, with hundreds of factories
                    stretching the Mississippi River, polluting the air for
                    years, so much so, that this region was later to be called
                    as <span class="text-red-400">Cancer Alley</span>, one of
                    the most polluted areas in the world. The surprising player
                    here is California, who as a non-major permit holder, is
                    expected to produce much less pollution, especially with the
                    regulation in place to reduce pollution democratic political
                    leanings. That is because even though Californa releases
                    less pollution from its facilities, a bigger propertion of
                    that pollution has toxic materials in it.
                  </p>
                </div>

                <div
                  class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                  <div
                    v-for="(metric, idx) in [
                      'major_toxic_weighted_pounds',
                      'major_pollutants_pounds',
                      'non_major_toxic_weighted_pounds',
                    ]"
                    :class="[
                      idx == 1 ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                      idx == 0 ? 'lg:rounded-r-none' : '',
                      idx == 2 ? 'lg:rounded-l-none' : '',
                      'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
                    ]"
                  >
                    <h1>{{ metric }}</h1>
                    <PieChart
                      class="col-span-4"
                      :data="data"
                      :value-key="metric"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mx-auto max-w-2xl lg:text-center col-span-full">
              <h2 class="text-base/7 font-semibold text-blue-600">Insights</h2>
              <p
                class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"
              >
                Pollution over time
              </p>
              <p class="mt-6 text-pretty text-lg/8 text-gray-600">Over time</p>
            </div>

            <div class="col-span-4 space-y-2">
              <Select
                :options="metrics.filter((m) => !m.percent)"
                v-model="filters.valueKey"
              />
              <StateSelect :options="states" v-model="filters.states" />
            </div>

            <LineChart
              class="col-span-4"
              :data="data"
              :value-key="filters.valueKey"
            />

            <div class="py-24 sm:pt-48 col-span-4">
              <div class="mx-auto max-w-7xl px-6 lg:px-8">
                <div class="mx-auto max-w-2xl lg:text-center">
                  <h2 class="text-base/7 font-semibold text-blue-600">
                    Insights
                  </h2>
                  <p
                    class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"
                  >
                    Key Snapshots
                  </p>
                  <p class="mt-6 text-pretty text-lg/8 text-gray-600">
                    The graph shows a steady increase in total pollutant loading
                    for non-major dischargers from 2008 to around 2020, followed
                    by a sharp decline. This trend could be influenced by
                    several factors: Regulatory Changes: Environmental
                    regulations might have become stricter around 2020, leading
                    to reduced pollutant discharge. Alternatively, reporting
                    requirements might have changed, affecting the data.
                    Economic Impact: The decline around 2020 could be linked to
                    decreased industrial activity during the COVID-19 pandemic.
                    Many industries temporarily halted operations, leading to
                    lower pollution levels. Technological Improvements: Adoption
                    of cleaner technologies or improved wastewater treatment
                    could have contributed to the decrease. Data Reporting
                    Anomalies: The sharp drop could also indicate a change in
                    how data was collected or reported. Would you like to
                    investigate any specific aspects or see correlations with
                    other environmental or economic events?
                  </p>
                </div>
                <div
                  class="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
                >
                  <div
                    v-for="(metric, idx) in [
                      'majors_in_icis_npdes',
                      'major_pollutants_pounds',
                      'non_major_toxic_weighted_pounds',
                    ]"
                    :class="[
                      idx == 1 ? 'lg:z-10 lg:rounded-b-none' : 'lg:mt-8',
                      idx == 0 ? 'lg:rounded-r-none' : '',
                      idx == 2 ? 'lg:rounded-l-none' : '',
                      'flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10',
                    ]"
                  >
                    <LineChart
                      class="col-span-4"
                      :data="data"
                      :value-key="metric"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mx-auto max-w-2xl lg:text-center col-span-full">
              <h2 class="text-base/7 font-semibold text-blue-600">Insights</h2>
              <p
                class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"
              >
                Wildfires incidents in Each State
              </p>
              <p class="mt-6 text-pretty text-lg/8 text-gray-600">
                The graph displays the distribution of wildfires across the
                United States by state, with a significant disparity in the
                number of wildfires among them. The "Grand Total" category is
                overwhelmingly high, suggesting that the combined total of
                wildfires across all states is dominated by a few key
                contributors. Alaska stands out prominently as the state with
                the highest number of wildfires, far exceeding the others. This
                could be due to its vast wilderness areas and susceptibility to
                natural ignition sources. Following Alaska, states in the
                western U.S., such as California, Idaho, and Nevada, show
                relatively high wildfire occurrences. This pattern is consistent
                with the dry climate, extensive forested regions, and weather
                conditions favorable to fire spread in the western part of the
                country. Conversely, states in the eastern and central U.S.,
                including Delaware, Rhode Island, and Vermont, report minimal
                wildfire activity, likely due to differences in climate,
                vegetation types, and land use practices. The distribution
                illustrates a clear west-to-east gradient, with western states
                experiencing significantly more wildfires compared to their
                eastern counterparts. This insight highlights the importance of
                region-specific wildfire management and prevention strategies.
              </p>
            </div>

            <Histogram
              class="col-span-4"
              v-model:data="wildfires"
              valueKey="fire_size"
            />

            <div class="mx-auto max-w-2xl lg:text-center col-span-full">
              <h2 class="text-base/7 font-semibold text-blue-600">Insights</h2>
              <p
                class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"
              >
                Tornado Incidents over time
              </p>
              <p class="mt-6 text-pretty text-lg/8 text-gray-600">
                The line chart illustrates the frequency of tornado incidents
                over time, revealing notable spikes in activity around the
                mid-1970s and early 2010s. These peaks are significantly higher
                than the surrounding years, suggesting periods of unusually high
                tornado occurrence. Apart from these anomalies, the data shows a
                generally consistent pattern of tornado activity with regular
                fluctuations. The consistency in the lower values indicates a
                baseline level of tornado incidents, while the extreme spikes
                may be due to specific meteorological events or improved
                reporting and data collection methods during those periods.
              </p>
            </div>

            <LineChart class="col-span-4" :data="tornadoes" value-key="mag" />

            <div class="mx-auto max-w-2xl lg:text-center col-span-full">
              <h2 class="text-base/7 font-semibold text-blue-600">Pricing</h2>
              <p
                class="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance"
              >
                Pollution on the map, visualized
              </p>
              <p class="mt-6 text-pretty text-lg/8 text-gray-600">
                The map illustrates the distribution of pollution across U.S.
                states, with darker shades indicating higher levels of
                pollutants. Texas stands out as the most polluted state,
                significantly darker than all others, suggesting a concentration
                of industrial activity or population density contributing to
                high pollution levels. Other states with notable pollution
                include California, Pennsylvania, and regions in the Midwest,
                which are known for manufacturing and urbanization. In contrast,
                much of the western and northeastern U.S. exhibits lighter
                shades, indicating relatively lower pollution levels. This
                geographic pattern underscores the impact of industrialization
                and urban centers on pollution distribution.
              </p>

              <div class="space-y-3 mt-8">
                <Select
                  :options="metrics.filter((m) => !m.percent)"
                  v-model="filters.valueKey"
                />
                <StateSelect :options="states" v-model="filters.states" />
              </div>

              <div class="w-full max-w-md mx-auto my-10">
                <label
                  for="slider"
                  class="block text-lg font-semibold text-gray-700 mb-2"
                >
                  Year
                </label>
                <input
                  id="slider"
                  type="range"
                  :min="0"
                  :max="keys?.length - 1"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  v-model="selectedIndex"
                />
                <div class="flex justify-between text-sm text-gray-500 mt-1">
                  <span v-if="keys">{{ new Date(keys[0]).getFullYear() }}</span>
                  <span v-if="keys">{{
                    new Date(keys[keys?.length - 1]).getFullYear()
                  }}</span>
                </div>
              </div>
            </div>

            <Chloropleth
              v-if="grouped && keys"
              class="col-span-4"
              v-model:data="grouped[keys[selectedIndex]]"
              :value-key="filters.valueKey"
            />
          </dl>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { onBeforeMount, reactive } from "vue";
import PieChart from "@/components/PieChart.vue";
import LineChart from "@/components/LineChart.vue";
import ScatterPlot from "@/components/ScatterPlot.vue";
import Histogram from "@/components/Histogram.vue";
import Chloropleth from "@/components/Chloropleth.vue";
import Select from "@/components/Select.vue";
import StateSelect from "@/components/StateSelect.vue";
import Table from "../components/Table.vue";
import { groupBy, useData } from "../data";
import {
  Biohazard,
  Calendar,
  Hash,
  Map,
  Percent,
  Trash,
} from "lucide-vue-next";
import { count, group } from "d3";
import type { Datum } from "../types/types";

const selectedIndex = ref(0);

const { data } = useData("/src/data/merged.csv");
const { data: tornadoes } = useData("/src/data/tornadoes.csv");
const { data: wildfires } = useData("/src/data/wildfires.csv");

const keys = computed(() => Object.keys(grouped.value));
const grouped = computed(() => groupBy(data.value, (d: Datum) => d["date"]));

const form = reactive({ name: "string", value: 0 });

const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District Of Columbia",
  "Florida",
  "Georgia",
  "Guam",
  "Gulf Of Mexico",
  "Gulf Of Mexico East",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Mariana Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Islands",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const filters = reactive({
  valueKey: "major_pollutant_loadings_percentage",
  states: states,
});
const metrics = [
  {
    name: "Number of Majors in ICIS-NPDES",
    description:
      "The number of individual NPDES permits (permit type = individual) with major designations.",
    icon: Hash,
    value: "majors_in_icis_npdes",
  },
  {
    name: "Number of Non-Majors in ICIS-NPDES",
    description:
      "The number of individual NPDES permits with non-major designations.",
    icon: Hash,
    value: "non_majors_in_icis_npdes",
  },
  {
    name: "Percent of Majors with Pollutant Loadings",
    description:
      "The percent of individual NPDES permits with major designations in a state with pollutant loadings greater than zero.",
    icon: Percent,
    value: "major_pollutant_loadings_percentage",
    unit: "%",
    percent: true,
  },
  {
    name: "Percent of Non-Majors with Pollutant Loadings",
    description:
      "The percent of individual NPDES permits with non-major designations in a state with pollutant loadings greater than zero.",
    icon: Biohazard,
    value: "non_majors_pollutant_loadings",

    unit: "%",

    percent: true,
  },
  {
    name: "Total Pollutant Loading (lb/year) for Majors",
    description:
      "The total calculated pollutant loadings, in pounds per year, for individual NPDES permits with major designations.",
    icon: Trash,
    value: "major_pollutant_loadings",
    unit: "lb",
  },
  {
    name: "Total Pollutant Loading (lb/year) for Non-Majors",
    description:
      "The total calculated pollutant loadings, in pounds per year, for individual NPDES permits with non-major designations.",
    icon: Trash,
    value: "non_major_pollutant_loadings",

    unit: "lb",
  },
  {
    name: "Total Toxic-Weighted Pounds (lb-eq/year) for Majors",
    description:
      "The total calculated relative toxicities of pollutant loadings, as toxic-weighted pound equivalents per year, for individual NPDES permits with major designations.",
    icon: Trash,
    value: "major_toxic_weighted_pounds",

    unit: "lb",
  },
  {
    name: "Total Toxic-Weighted Pounds (lb-eq/year) for Non-Majors",
    description:
      "The total calculated relative toxicities of pollutant loadings, as toxic-weighted pound equivalents per year, for individual NPDES permits with non-major designations.",
    icon: Trash,
    value: "non_major_toxic_weighted_pounds",

    unit: "lb",
  },
  {
    name: "Total Pollutants Pounds for Majors",
    description:
      "The total weight of all pollutants, in pounds, for individual NPDES permits with major designations.",
    icon: Trash,
    value: "major_pollutants_pounds",

    unit: "lb",
  },
  {
    name: "Total Pollutants Pounds for Non-Majors",
    description:
      "The total weight of all pollutants, in pounds, for individual NPDES permits with non-major designations.",
    icon: Trash,
    value: "non_major_total_pollutants_pounds",

    unit: "lb",
  },
];
</script>
