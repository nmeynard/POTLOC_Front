import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
// import { createConsumer } from "@rails/actioncable";

export const useMainStore = defineStore("main", () => {
  const $q = useQuasar();
  const mainApiUrl = "http://localhost:3000/";
  const wsEvents = computed({
    get() {
      return $q.localStorage.getItem("wsEvents") || [];
    },
    set(data) {
      $q.localStorage.set("wsEvents", data);
    },
  });
  const shoeStores = ref([]);
  const shoeModels = ref([]);

  // const consumer = createConsumer("ws://127.0.0.1:3000/cable");
  // consumer.subscriptions.create(
  //   { channel: "WsEventsChannel" },
  //   {
  //     received(data) {
  //       console.log("WsEvents received", data);
  //       wsEvents.value.push(data);
  //     },
  //   }
  // );

  async function getWsEvents() {
    try {
      const response = await axios.get(mainApiUrl + "ws_events.json");
      console.log("getWsEvents", response.data);
      wsEvents.value = response.data;
    } catch (e) {
      console.log("error getWsEvents", e);
    }
  }

  async function getShoeStores() {
    try {
      const response = await axios.get(mainApiUrl + "shoe_stores.json");
      console.log("getShoeStores", response.data);
      shoeStores.value = response.data;
    } catch (e) {
      console.log("error getShoeStores", e);
    }
  }

  async function getShoeModels() {
    try {
      const response = await axios.get(mainApiUrl + "shoe_models.json");
      console.log("getShoeModels", response.data);
      shoeModels.value = response.data;
    } catch (e) {
      console.log("error getShoeModels", e);
    }
  }

  const wsEventsCount = computed(() => {
    if (wsEvents.value.length) {
      return wsEvents.value.length;
    } else {
      return 0;
    }
  });

  const salesByStores = computed(() => {
    if (wsEvents.value.length && shoeStores.value.length) {
      const result = [];
      for (const store of shoeStores.value) {
        const storeObject = {
          name: store.name,
          sales: wsEvents.value.filter((x) => x.shoe_store_id === store.id),
        };
        result.push(storeObject);
      }
      return result;
    } else {
      return [];
    }
  });

  const bestStorePerformer = computed(() => {
    let result = { name: "N/A", sales: 0 };
    if (salesByStores.value.length) {
      const bestPerformer = salesByStores.value.sort(
        (a, b) => b.sales.length - a.sales.length
      )[0];
      if (bestPerformer) {
        result.name = bestPerformer.name;
        result.sales = bestPerformer.sales.length;
      }
    }
    return result;
  });

  const bestModelPerformer = computed(() => {
    let result = "N/A";
    if (wsEvents.value.length && shoeModels.value.length) {
      const modelIdCount = {};
      wsEvents.value.map((x) => (modelIdCount[x.shoe_model_id] = 0));
      wsEvents.value.map((x) => modelIdCount[x.shoe_model_id]++);
      const bestPerformer = Object.entries(modelIdCount).sort(
        (a, b) => b[1] - a[1]
      )[0][0];
      result = shoeModels.value.find(
        (x) => x.id === parseInt(bestPerformer)
      ).name;
    }
    return result;
  });

  const stockLast10 = computed(() => {
    let result = { higher: "N/A", lower: "N/A" };
    if (
      wsEvents.value.length &&
      shoeModels.value.length &&
      shoeStores.value.length
    ) {
      const last10 = wsEvents.value
        .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
        .slice(0, 10);
      const higherStock = last10.sort((a, b) => b.qty_left - a.qty_left)[0];
      const lowerStock = last10.sort((a, b) => a.qty_left - b.qty_left)[0];
      console.log("higherStock", higherStock);
      console.log("lowerStock", lowerStock);
      result.higher = `${higherStock.qty_left} ${
        shoeModels.value.find(
          (x) => x.id === parseInt(higherStock.shoe_model_id)
        ).name
      } - ${
        shoeStores.value.find(
          (x) => x.id === parseInt(higherStock.shoe_store_id)
        ).name
      }`;
      result.lower = `${lowerStock.qty_left} ${
        shoeModels.value.find(
          (x) => x.id === parseInt(lowerStock.shoe_model_id)
        ).name
      } - ${
        shoeStores.value.find(
          (x) => x.id === parseInt(lowerStock.shoe_store_id)
        ).name
      }`;
    }
    return result;
  });

  onMounted(async () => {
    await getShoeStores();
    await getShoeModels();
    await getWsEvents();
  });

  setTimeout(console.log("salesByStores", salesByStores.value), 5000);

  return {
    shoeStores,
    shoeModels,
    wsEvents,
    wsEventsCount,
    salesByStores,
    bestStorePerformer,
    bestModelPerformer,
    stockLast10,
  };
});
