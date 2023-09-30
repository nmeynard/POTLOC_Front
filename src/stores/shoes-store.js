import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

export const useShoeStore = defineStore("shoe", () => {
  const $q = useQuasar();

  const stores = [
    "ALDO Centre Eaton",
    "ALDO Destiny USA Mall",
    "ALDO Pheasant Lane Mall",
    "ALDO Holyoke Mall",
    "ALDO Maine Mall",
    "ALDO Crossgates Mall",
    "ALDO Burlington Mall",
    "ALDO Solomon Pond Mall",
    "ALDO Auburn Mall",
    "ALDO Waterloo Premium Outlets",
  ];

  const models = [
    "ADERI",
    "MIRIRA",
    "CAELAN",
    "BUTAUD",
    "SCHOOLER",
    "SODANO",
    "MCTYRE",
    "CADAUDIA",
    "RASIEN",
    "WUMA",
    "GRELIDIEN",
    "CADEVEN",
    "SEVIDE",
    "ELOILLAN",
    "BEODA",
    "VENDOGNUS",
    "ABOEN",
    "ALALIWEN",
    "GREG",
    "BOZZA",
  ];

  const computedByStores = computed(() => {
    const results = {};
    for (const store of stores) {
      // apply default values
      results[store] = parseResults(store);
    }
    return results;
  });

  function parseResults(store) {
    const modelTemplate = {};
    for (const model of models) {
      const modelEvents = wsEvents.value.filter(
        (x) => x.store === store && x.model === model
      );
      const lastItem = modelEvents.sort(
        (a, b) => Date.parse(b.receivedAt) - Date.parse(a.receivedAt)
      )[0];
      modelTemplate[model] = {
        salesCount: modelEvents && modelEvents.length ? modelEvents.length : 0,
        qtyLeft: lastItem && lastItem.inventory ? lastItem.inventory : 100,
      };
    }
    return modelTemplate;
  }

  const wsEvents = ref([]);

  // connect to Websocket
  const socket = new WebSocket("ws://127.0.0.1:8080");

  socket.onmessage = function (event) {
    wsEvents.value.push({ receivedAt: Date.now(), ...JSON.parse(event.data) });
    console.log("Msg received", {
      receivedAt: Date.now(),
      ...JSON.parse(event.data),
    });
  };

  socket.onerror = function (error) {
    console.error("WebSocket Error", error);
  };

  const bestPerformerStore = computed(() => {
    let result = { name: "N/A", sales: 0 };
    const storeScoring = {};
    for (const store of stores) {
      storeScoring[store] = wsEvents.value.filter(
        (x) => x.store === store
      ).length;
    }
    const bestPerformer = Object.entries(storeScoring).sort(
      (a, b) => b[1] - a[1]
    )[0];
    result.name = bestPerformer[0];
    result.sales = bestPerformer[1];
    return result;
  });

  const bestPerformerModel = computed(() => {
    let result = { name: "N/A", sales: 0 };
    const modelScoring = {};
    for (const model of models) {
      modelScoring[model] = 0;
    }
    wsEvents.value.map((x) => modelScoring[x.model]++);
    const bestPerformer = Object.entries(modelScoring).sort(
      (a, b) => b[1] - a[1]
    )[0];
    result.name = bestPerformer[0];
    result.sales = bestPerformer[1];
    return result;
  });

  return { wsEvents, computedByStores, bestPerformerStore, bestPerformerModel };
});
