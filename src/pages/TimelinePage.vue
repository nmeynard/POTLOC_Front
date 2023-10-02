<script setup>
import CustomSeparator from "src/components/CustomSeparator.vue";
import Last6Events from "src/components/Last6Events.vue";
import EventsTimeline from "src/components/EventsTimeline.vue";
import EventsTimelineSticky from "src/components/EventsTimelineSticky.vue";
import { useShoeStore } from "src/stores/shoes-store";
const shoeStore = useShoeStore();
</script>
<template>
  <q-page class="q-pa-md">
    <CustomSeparator
      :sep-title="`6 dernières ventes (total : ${shoeStore.wsEvents.length})`"
      class="q-mb-md"
    />
    <Last6Events />
    <CustomSeparator
      :sep-title="'Historique des stocks (20 derniers)'"
      class="q-my-md"
    />
    <div class="row q-col-gutter-md">
      <div class="col-8">
        <EventsTimeline />
      </div>
      <div class="col-4">
        <div class="fit">
          <EventsTimelineSticky />
        </div>
      </div>
    </div>
  </q-page>
</template>
