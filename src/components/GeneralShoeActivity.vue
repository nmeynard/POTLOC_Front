<script setup>
import { useMainStore } from "src/stores/main-store";

const mainStore = useMainStore();
</script>
<template>
  <div class="row q-mt-none q-col-gutter-md">
    <div class="col-3" v-for="model in mainStore.shoeModels" :key="model.id">
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
            <q-tooltip>Détails pour ce modèle</q-tooltip>
          </q-btn>
          <p class="fw-800 q-my-none text-grey-7">
            {{ model.name }}
          </p>

          <p class="q-my-none">
            Stock <q-icon name="add_circle" color="positive" /> :
            <span class="fw-700 text-primary">42 - ALDO Destiny USA Mall</span>
          </p>
          <p class="q-my-none">
            Stock <q-icon name="do_not_disturb_on" color="negative" /> :
            <span class="fw-700 text-primary">24 - ALDO Destiny USA Mall</span>
          </p>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
