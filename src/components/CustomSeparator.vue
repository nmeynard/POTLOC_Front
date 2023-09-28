<script setup>
const props = defineProps({ sepTitle: String });
</script>
<template>
  <div class="bg-primary text-white q-px-md rounded-borders">
    <p class="text-h6 q-my-none fw-800">
      {{ props.sepTitle }}
    </p>
  </div>
</template>
