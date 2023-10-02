<script setup>
import { useShoeStore } from "src/stores/shoes-store";
import CustomSeparator from "src/components/CustomSeparator.vue";
import StoreStatCards from "src/components/StoreStatCards.vue";
const shoeStore = useShoeStore();
</script>
<template>
  <q-page class="q-pa-md">
    <CustomSeparator
      :sep-title="'État des stocks par magasin'"
      class="q-mb-md"
    />
    <StoreStatCards />
  </q-page>
</template>
