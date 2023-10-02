<script setup>
import { computed } from "vue";
const props = defineProps({ storeData: Object });

function colorLine(qtyLeft) {
  if (qtyLeft > 60) {
    return "bg-positive text-white";
  } else if (qtyLeft < 21 && qtyLeft > 10) {
    return "bg-warning";
  } else if (qtyLeft < 11) {
    return "bg-negative text-white";
  } else {
    return "bg-grey-1";
  }
}
</script>
<template>
  <q-markup-table dense flat square class="full-width">
    <thead>
      <tr class="bg-primary text-white text-left fw-700">
        <th>Modele</th>
        <th>V.</th>
        <th>S.</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(model, idx) in storeData"
        :key="idx"
        :class="colorLine(model[1].qtyLeft)"
      >
        <td>{{ model[0] }}</td>
        <td>{{ model[1].salesCount }}</td>
        <td>{{ model[1].qtyLeft }}</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
