<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { createConsumer } from "@rails/actioncable";
import CustomSeparator from "src/components/CustomSeparator.vue";
import GeneralActivity from "src/components/GeneralActivity.vue";
import GeneralShopActivity from "src/components/GeneralShopActivity.vue";
import GeneralShoeActivity from "src/components/GeneralShoeActivity.vue";

const $q = useQuasar();
const wsEvents = computed({
  get() {
    return $q.localStorage.getItem("wsEvents") || [];
  },
  set(data) {
    $q.localStorage.set("wsEvents", data);
  },
});

const consumer = createConsumer("ws://127.0.0.1:3000/cable");
consumer.subscriptions.create(
  { channel: "WsEventsChannel" },
  {
    received(data) {
      console.log("WsEvents received", data);
      wsEvents.value.push(data);
    },
  }
);
</script>
<template>
  <q-page class="q-pa-md">
    <div class="full-width">
      <CustomSeparator :sep-title="'Activité générale'" />
      <GeneralActivity :ws-events="wsEvents" />
      <CustomSeparator :sep-title="'Vue générale par magasin'" />
      <GeneralShopActivity />
      <CustomSeparator
        :sep-title="'Vue générale par modèle de chaussure'"
        class="q-mt-md"
      />
      <GeneralShoeActivity />
    </div>
  </q-page>
</template>
