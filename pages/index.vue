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
    <assetsList
      :assets="Object.values(assets)"
      :building="building"
      class="w-fit"
    />
  </div>
</template>

<script setup lang="ts">
import type { Building } from "~/schema";
import { actionTypes, assets, logs } from "../data";
import { upcomingTasks } from "../shared";
import { Temporal } from "@js-temporal/polyfill";

const { data } = await useFetch("/building");
let building: Building;
if (data.value) {
  building = {
    ...data.value,
    constructionDate: Temporal.PlainDate.from(data.value.constructionDate),
  };
} else {
  throw new Error("Null Building!");
}
</script>

<style scoped>
body {
  background-color: black;
  color: #ccc;
}
</style>
