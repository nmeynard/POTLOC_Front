<script setup>
import { useShoeStore } from "src/stores/shoes-store";
import { date } from "quasar";
const shoeStore = useShoeStore();
</script>
<template>
  <div class="row q-col-gutter-md">
    <div
      class="col-2"
      v-for="(event, idx) in shoeStore.wsEvents
        .sort((a, b) => b.receivedAt - a.receivedAt)
        .slice(0, 6)"
      :key="idx"
    >
      <q-card>
        <q-card-section>
          <p class="text-overline q-my-none">
            {{
              date.formatDate(new Date(event.receivedAt), "YYYY/MM/DD HH:mm:ss")
            }}
          </p>
          <p class="text-body1 q-my-none lhn text-accent">
            {{ event.store }}
          </p>
          <p class="text-h6 q-my-none lhn text-primary fw-900">
            {{ event.model }}
          </p>
          <span
            class="absolute-position absolute-bottom-right q-ma-md text-caption"
          >
            {{ event.inventory }} restant(s)
          </span>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
