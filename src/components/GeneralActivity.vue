<script setup>
import { useShoeStore } from "src/stores/shoes-store";
import BarChartStorePerfs from "src/components/dashboard/BarChartStorePerfs.vue";

const shoeStore = useShoeStore();
const props = defineProps({ wsEvents: Array });
</script>
<template>
  <div class="row q-mt-none q-mb-md q-col-gutter-md">
    <div class="col-3">
      <div class="column fit">
        <div class="col-12">
          <q-card class="fit">
            <q-card-section>
              <p class="text-caption text-center q-my-none">
                Nombre de ventes enregistrées
              </p>
              <p
                class="big-numbers lhn q-my-none fw-600 q-my-none text-primary text-center"
              >
                {{ wsEvents.length }}
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="column fit">
        <div class="col-6 q-pb-sm">
          <q-card class="fit"
            ><q-card-section class="text-center">
              <p class="text-caption q-my-none">Magasin le plus performant</p>
              <p class="fw-700 text-accent q-mb-none text-h5 q-mt-xs">
                {{ shoeStore.bestPerformerStore?.name }} ({{
                  shoeStore.bestPerformerStore?.sales
                }})
              </p>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 q-pt-sm">
          <q-card class="fit"
            ><q-card-section class="text-center">
              <p class="text-caption q-my-none">Modèle le plus performant</p>
              <p class="fw-700 text-accent q-mb-none text-h5 q-mt-xs">
                {{ shoeStore.bestPerformerModel?.name }} ({{
                  shoeStore.bestPerformerModel?.sales
                }})
              </p>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-6">
      <q-card>
        <q-card-section>
          <p class="text-caption q-my-none q-mb-sm text-center">
            Répartition des ventes
          </p>
          <BarChartStorePerfs class="q-mx-md" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<style scoped>
.big-numbers {
  font-size: 7rem;
}
</style>
