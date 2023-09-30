<script setup>
import { Chart, Responsive, Pie, Tooltip } from "vue3-charts";
const testData = [
  {
    name: "blabla",
    sales: 120,
  },
  {
    name: "blibli",
    sales: 100,
  },
];
</script>
<template>
  <Responsive class="w-full">
    <template #main>
      <Chart
        direction="circular"
        :data="data"
        :margin="{
          left: Math.round((width - 360) / 2),
          top: 20,
          right: 0,
          bottom: 20,
        }"
        :config="{ controlHover: false }"
      >
        <template #layers>
          <Pie
            :dataKeys="['name', 'sales']"
            :pie-style="{ innerRadius: 100, padAngle: 0.05 }"
          />
        </template>
        <template #widgets>
          <Tooltip
            :config="{
              name: {},
              sales: { label: 'Ventes' },
            }"
            hideLine
          />
        </template>
      </Chart>
    </template>
  </Responsive>
</template>
