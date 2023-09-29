<script setup>
import { useShoeStore } from "src/stores/shoes-store";
const shoeStore = useShoeStore();
</script>
<template>
  <q-page class="q-pa-md">
    <div class="full-width">
      <CustomSeparator :sep-title="'Activité générale'" />
      <GeneralActivity :ws-events="wsEvents" :key="refreshEvent" />
    </div>
  </q-page>
</template>
