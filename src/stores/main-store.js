import { defineStore } from "pinia";
import { ref, onMounted, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

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
    if (wsEvents.value.length) {
      const result = [];
      for (const store of shoeStores) {
        const storeObject = {
          name: store.name,
          sales: wsEvents.value.filter((x) => x.store_id === store.id),
        };
      }
      return result;
    } else {
      return 0;
    }
  });

  // const bestStorePerformer = computed(() => {
  //   if (wsEvents.value.length) {
  //   } else {
  //     return {};
  //   }
  // });

  onMounted(async () => {
    await getShoeStores();
    await getShoeModels();
    await getWsEvents();
    console.log("salesByStores", salesByStores.value);
  });

  return { shoeStores, shoeModels, wsEvents, wsEventsCount };
});
