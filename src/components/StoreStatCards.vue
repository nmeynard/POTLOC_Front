<script setup>
import { computed } from "vue";
import { useShoeStore } from "src/stores/shoes-store";
import StoreStatTable from "./StoreStatTable.vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
const shoeStore = useShoeStore();
const sumSales = computed(() => {
  let results = {};
  for (const store of shoeStore.stores) {
    const sumForStore = Object.entries(
      shoeStore.computedByStores[store]
    ).reduce(
      (accumulator, currentValue) => accumulator + currentValue[1].salesCount,
      0
    );
    results[store] = sumForStore;
  }
  return results;
});
</script>
<template>
  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="(store, idx) in shoeStore.stores" :key="idx">
      <q-card>
        <q-card-section>
          <p class="text-h6 text-accent fw-700 q-my-none">
            {{ store }}
          </p>
          <p class="q-ma-none fw-300 text-primary">
            {{ sumSales[store] }} vente(s)
          </p>
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pa-none">
          <div class="row">
            <div
              class="col-6"
              style="border-right: 1px solid rgba(0, 0, 0, 0.1)"
            >
              <StoreStatTable
                :store-data="
                  Object.entries(shoeStore.computedByStores[store]).slice(0, 10)
                "
              />
            </div>
            <div class="col-6">
              <StoreStatTable
                :store-data="
                  Object.entries(shoeStore.computedByStores[store]).slice(
                    10,
                    20
                  )
                "
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
