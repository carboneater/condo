<template>
  <div>
    <h2>{{ name }}</h2>
    <button @click="markDone">Mark as done</button>
  </div>
</template>

<script setup lang="ts">
const { id, name } = defineProps({ id: Number, name: String });

function markDone() {
  console.log("Done");
}
</script>

<style scoped></style>
