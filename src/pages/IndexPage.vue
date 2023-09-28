<script setup>
import { ref } from "vue";
import { createConsumer } from "@rails/actioncable";

const wsEvents = ref([]);

const consumer = createConsumer("ws://127.0.0.1:3000/cable");
consumer.subscriptions.create(
  { channel: "WsEventsChannel" },
  {
    received(data) {
      console.log("WsEvents received", data);
    },
  }
);

// const socket = new WebSocket("ws://localhost:3000/cable");

// socket.onopen = (event) => {
//   console.log("socket is open", event);
//   const msg = {
//     command: "subscribe",
//     identifier: JSON.stringify({
//       channel: "ws_events",
//     }),
//   };
//   socket.send(JSON.stringify(msg));
// };

// socket.onmessage = (event) => {
//   const message = JSON.parse(event.data);
//   console.log("New message received", event);
//   wsEvents.value.push(message);
// };
</script>
<template>
  <q-page class="flex flex-center">
    <div>
      <!-- Utilisez wsEvents.value pour accéder aux données dans le template -->
      <div v-for="event in wsEvents" :key="event.id">
        {{ event }}
      </div>
    </div>
  </q-page>
</template>
