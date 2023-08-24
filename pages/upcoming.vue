<script lang="ts" setup>
import { assets, logs } from "../data";
import { upcomingTasks } from "../shared";
</script>

<template>
  <upcoming :assets="assets" :upcoming="upcomingTasks(assets, logs)" />
</template>

<style lang="css" scoped></style>
