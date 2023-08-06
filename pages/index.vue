<template>
  <log
    :actionTypes="actionTypes"
    :assets="Object.values(assets)"
    :logs="logs"
  />
  <assetsList :assets="Object.values(assets)" />
</template>

<script setup lang="ts">
import { actionTypes, assets, logs } from "../data";
</script>

<style scoped>
body {
  background-color: black;
  color: #ccc;
}
</style>
