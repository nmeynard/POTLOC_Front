import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export const useShoeStore = defineStore("shoe", () => {
  const $q = useQuasar();

  const wsEvents = computed();

  // Connect to Websocket
  const socket = new WebSocket("ws://127.0.0.1:8080");

  socket.onmessage = function (event) {
    var receivedData = event.data;
    console.log("Msg received", receivedData);
  };

  socket.onerror = function (error) {
    console.error("WebSocket Error", error);
  };
});
