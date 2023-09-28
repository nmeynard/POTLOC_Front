<script setup>
import { useMainStore } from "src/stores/main-store";

const mainStore = useMainStore();
</script>
<template>
  <div class="row q-mt-none q-col-gutter-md">
    <div class="col-3" v-for="store in mainStore.shoeStores" :key="store.id">
      <q-card>
        <q-card-section>
          <q-btn
            class="float-right"
            round
            icon="zoom_in"
            outline
            color="accent"
            size="sm"
          >
            <q-tooltip>Détails pour ce magasin</q-tooltip>
          </q-btn>
          <p class="fw-800 q-my-none text-grey-7">
            {{ store.name }}
          </p>

          <p class="q-my-none">
            Nombre total de ventes : <span class="fw-700 text-primary">42</span>
          </p>
          <p class="q-my-none">
            Meilleur modèle : <span class="fw-700 text-primary">CADAUDIA</span>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
