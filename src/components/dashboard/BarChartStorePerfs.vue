<script setup>
import { ref, onMounted } from "vue";
import { useShoeStore } from "src/stores/shoes-store.js";
import { Chart, Grid, Tooltip, Bar } from "vue3-charts";

const shoeStore = useShoeStore();
const width = ref(0);
const axis = ref({
  primary: {
    type: "band",
    tickValues: [" "],
  },
  secondary: {
    domain: ["dataMin", "dataMax + 5"],
    type: "linear",
    ticks: 8,
  },
});

onMounted(() => {
  const element = document.getElementById("chart-wrapper");
  if (element) {
    width.value = element.offsetWidth;
    // console.log("width value", width.value);
  }
});
</script>
<template>
  <div class="full-width" id="chart-wrapper">
    <Chart
      :size="{ width: width, height: 150 }"
      class="full-width"
      :data="shoeStore.ChartStorePerfData"
      :direction="'horizontal'"
      :axis="axis"
    >
      <template #layers>
        <Grid strokeDasharray="2,2" />
        <Bar :dataKeys="['name', 'sales']" :barStyle="{ fill: '#e80d70' }" />
      </template>

      <template #widgets>
        <Tooltip
          borderColor="#e80d70"
          :config="{
            sales: { color: '#e80d70' },
          }"
        />
      </template>
    </Chart>
  </div>
</template>
