<script setup>
import { date } from "quasar";
import { useShoeStore } from "src/stores/shoes-store";
const shoeStore = useShoeStore();
</script>
<template>
  <q-timeline color="accent" layout="loose">
    <q-timeline-entry
      v-for="(event, idx) in shoeStore.wsEvents
        .sort((a, b) => b.receivedAt - a.receivedAt)
        .slice(0, 20)"
      :key="idx"
      :subtitle="
        date.formatDate(new Date(event.receivedAt), 'YYYY/MM/DD HH:mm:ss')
      "
      :side="event.inventory >= shoeStore.stockThreshold ? 'right' : 'left'"
    >
      <div class="q-pa-xs">
        <q-card>
          <q-card-section>
            <b>{{ event.store }}</b> a vendu <b>{{ event.model }}</b
            ><br />
            Stock restant : <b>{{ event.inventory }}</b>
            <q-badge
              label="Stock disponible"
              color="positive"
              class="q-ml-md"
              v-if="event.inventory > 60"
            />
            <q-badge
              label="Stock faible"
              color="warning"
              class="q-ml-md"
              v-if="event.inventory < 21 && event.inventory > 10"
            /><q-badge
              label="Stock très faible"
              color="negative"
              class="q-ml-md"
              v-if="event.inventory < 11"
            />
          </q-card-section>
        </q-card>
      </div>
    </q-timeline-entry>
  </q-timeline>
</template>
