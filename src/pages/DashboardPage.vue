<script setup>
import { useShoeStore } from "src/stores/shoes-store";
import CustomSeparator from "src/components/CustomSeparator.vue";
import GeneralActivity from "src/components/GeneralActivity.vue";
import GeneralShopActivity from "src/components/GeneralShopActivity.vue";
import GeneralTop3Stores from "src/components/GeneralTop3Stores.vue";
const shoeStore = useShoeStore();
</script>
<template>
  <q-page class="q-pa-md">
    <div class="full-width">
      <CustomSeparator :sep-title="'Activité générale'" />
      <GeneralActivity :ws-events="shoeStore.wsEvents" />
      <CustomSeparator :sep-title="'Vue générale par magasin'" />
      <GeneralShopActivity />
      <CustomSeparator :sep-title="'TOP 3 des magasins'" class="q-my-md" />
      <GeneralTop3Stores />
      <!-- <pre>
        {{ shoeStore.bestModelByStores }}
      </pre> -->
    </div>
  </q-page>
</template>
