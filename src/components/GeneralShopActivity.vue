<script setup>
import { useShoeStore } from "src/stores/shoes-store";

const shoeStore = useShoeStore();
</script>
<template>
  <div class="row q-mt-none q-col-gutter-md">
    <div class="col-3" v-for="(store, idx) in shoeStore.stores" :key="idx">
      <q-card>
        <q-card-section>
          <q-btn
            class="float-right"
            round
            icon="trending_up"
            outline
            color="accent"
            size="sm"
            to="stats"
          >
            <q-tooltip>Statistiques</q-tooltip>
          </q-btn>
          <p class="fw-800 q-my-none text-accent text-body1 lhn">
            {{ store }}
          </p>

          <p class="q-my-none">
            Nombre total de ventes :
            <span class="fw-700 text-primary">
              {{
                shoeStore.ChartStorePerfData.find((x) => x.name === store)
                  ? shoeStore.ChartStorePerfData.find((x) => x.name === store)
                      .sales
                  : 0
              }}
            </span>
          </p>
          <p class="q-my-none">
            Meilleur modèle :
            <span class="fw-700 text-primary">
              {{
                shoeStore.bestModelByStores[store].salesCount
                  ? shoeStore.bestModelByStores[store].name
                  : "N/A"
              }}
            </span>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
