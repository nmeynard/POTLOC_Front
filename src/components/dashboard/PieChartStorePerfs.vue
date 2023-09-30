<script setup>
import { Chart, Responsive, Pie, Tooltip } from "vue3-charts";
import { useShoeStore } from "src/stores/shoes-store.js";
const shoeStore = useShoeStore();
</script>
<template>
  <Responsive class="w-full">
    <template #main>
      <Chart
        direction="circular"
        :size="{ width: 150, height: 150 }"
        :data="shoeStore.ChartStorePerfData"
        :margin="{
          left: 5,
          top: 5,
          right: 5,
          bottom: 5,
        }"
        :config="{ controlHover: false }"
      >
        <template #layers>
          <Pie
            :dataKeys="['name', 'sales']"
            :pie-style="{ innerRadius: 20, padAngle: 0.05 }"
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
