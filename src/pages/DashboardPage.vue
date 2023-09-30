<script setup>
import { useShoeStore } from "src/stores/shoes-store";
import CustomSeparator from "src/components/CustomSeparator.vue";
import GeneralActivity from "src/components/GeneralActivity.vue";
const shoeStore = useShoeStore();
</script>
<template>
  <q-page class="q-pa-md">
    <div class="full-width">
      <CustomSeparator :sep-title="'Activité générale'" />
      <GeneralActivity :ws-events="shoeStore.wsEvents" />
      <pre>
        {{ shoeStore.computedByStores }}
      </pre>
    </div>
  </q-page>
</template>
