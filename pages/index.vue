<template>
  <div class="flex flex-row justify-between">
    <upcoming
      :assets="assets"
      :upcoming="upcomingTasks(assets, logs)"
      class="w-fit"
    />
    <log
      :actionTypes="actionTypes"
      :assets="assets"
      class="w-fit"
      :logs="logs"
    />
    <assetsList :assets="Object.values(assets)" class="w-fit" />
  </div>
</template>

<script setup lang="ts">
import { actionTypes, assets, logs } from "../data";
import { upcomingTasks } from "../shared";
</script>

<style scoped>
body {
  background-color: black;
  color: #ccc;
}
</style>
