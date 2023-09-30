<script setup>
import { useShoeStore } from "src/stores/shoes-store";
const shoeStore = useShoeStore();
</script>
<template>
  <div class="row q-col-gutter-md">
    <div
      class="col-4"
      v-for="(store, idx) in shoeStore.storesOrderedBySales.slice(0, 3)"
      :key="idx"
    >
      <q-card>
        <q-item
          :class="idx > 0 ? 'bg-white text-primary' : 'bg-accent text-white'"
        >
          <q-item-section avatar>
            <q-avatar
              class="text-white"
              :class="idx > 0 ? 'bg-accent' : 'bg-primary'"
            >
              {{ idx + 1 }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <p class="text-h6 fw-900 q-my-none">{{ store[0] }}</p>
          </q-item-section>
          <q-item-section side>
            <p
              class="text-h6 q-my-none"
              :class="idx > 0 ? 'text-dark' : 'text-white'"
            >
              {{ store[1] }}
            </p>
          </q-item-section>
        </q-item>
      </q-card>
    </div>
  </div>
</template>
