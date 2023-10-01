import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useQuasar } from "quasar";

export const useShoeStore = defineStore("shoe", () => {
  const $q = useQuasar();

  const stockThreshold = ref(30);

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

  const wsEvents = ref([]);

  // connect to Websocket
  const socket = new WebSocket("ws://127.0.0.1:8080");

  socket.onmessage = function (event) {
    wsEvents.value.push({ receivedAt: Date.now(), ...JSON.parse(event.data) });
    $q.localStorage.set("ws-events", wsEvents.value);
  };

  socket.onerror = function (error) {
    console.error("WebSocket Error", error);
  };

  // computed functions for frontend

  const computedByStores = computed(() => {
    const results = {};
    for (const store of stores) {
      // apply default values
      results[store] = parseResults(store);
    }
    return results;
  });

  const bestModelByStores = computed(() => {
    let results = {};
    for (const store of stores) {
      const inventory = computedByStores.value[store];
      if (inventory) {
        const bestModel = Object.entries(inventory)
          .map((x) => {
            return { name: x[0], ...x[1] };
          })
          .sort((a, b) => b.salesCount - a.salesCount)[0];
        results[store] = bestModel;
      }
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

  const storesOrderedBySales = computed(() => {
    const storeScoring = {};
    for (const store of stores) {
      storeScoring[store] = wsEvents.value.filter(
        (x) => x.store === store
      ).length;
    }
    const bestPerformers = Object.entries(storeScoring).sort(
      (a, b) => b[1] - a[1]
    );
    return bestPerformers;
  });

  const bestPerformerStore = computed(() => {
    let result = { name: "N/A", sales: 0 };
    const bestPerformers = storesOrderedBySales.value;
    result.name = bestPerformers[0][0];
    result.sales = bestPerformers[0][1];
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

  const ChartStorePerfData = computed(() => {
    const storeScoring = [];
    for (const store of stores) {
      storeScoring.push({
        name: store,
        sales: 0,
      });
    }
    wsEvents.value.map((x) => {
      storeScoring.find((y) => y.name === x.store).sales++;
    });
    return storeScoring.filter((x) => x.sales);
  });

  return {
    stores,
    models,
    wsEvents,
    computedByStores,
    bestPerformerStore,
    bestPerformerModel,
    ChartStorePerfData,
    bestModelByStores,
    storesOrderedBySales,
    stockThreshold,
  };
});
