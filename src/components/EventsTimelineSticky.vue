<script setup>
import { useShoeStore } from "src/stores/shoes-store";

const shoeStore = useShoeStore();
</script>
<template>
  <q-card class="bg-grey-1 sticky-card">
    <q-card-section>
      <p class="text-body1">
        <q-icon size="sm" name="info" color="accent" class="q-mr-xs" />À gauche,
        les événements pour lesquels le stock est inférieur au seuil. Ajustez le
        seuil avec le curseur ci-dessous.
      </p>
      <q-slider
        v-model="shoeStore.stockThreshold"
        :min="0"
        :step="10"
        :max="100"
      />
      <p class="text-body1">
        Actuellement, le seuil est fixé à
        <span class="text-h5 fw-800 text-accent">{{
          shoeStore.stockThreshold
        }}</span>
      </p>
    </q-card-section>
  </q-card>
</template>
<style scoped>
.sticky-card {
  position: sticky;
  top: 85px;
}
</style>
