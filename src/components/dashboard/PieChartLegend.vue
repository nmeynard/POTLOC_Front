<script setup>
import { useShoeStore } from "src/stores/shoes-store.js";
const shoeStore = useShoeStore();
</script>
<template>
  <ol class="text-caption">
    <li
      v-for="(store, idx) in shoeStore.ChartStorePerfData.sort(
        (a, b) => b.sales - a.sales
      ).slice(0, 7)"
      :key="idx"
      class="text-ellipsis"
    >
      {{ store.name }} - {{ store.sales }}
    </li>
  </ol>
</template>
