<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-dark">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <img
            src="/Potloc_Logo.jpg"
            style="height: 2rem"
            class="q-my-md vertical-middle"
          />
        </q-toolbar-title>

        <div>
          <p class="q-my-none fw-600 text-dark">
            Interface de gestion des stocks
          </p>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
    >
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-icon name="img:/Potloc_Logo_Small.png" />
          </q-item-section>
          <q-item-section class="fw-900 text-grey-7">
            Menu principal
          </q-item-section>
        </q-item>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Accueil",
    icon: "home",
    link: "/",
  },
  {
    title: "Historique",
    icon: "history",
    link: "/timeline",
  },
  {
    title: "Statistiques",
    icon: "analytics",
    link: "/stats",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const miniState = ref(true);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
