<script setup lang="ts">
import type { Asset } from "../schema";
import { Temporal } from "@js-temporal/polyfill";
defineProps<{
  seed: Omit<Asset, "acquisitionDate" | "id"> & { acquisitionDate: string };
}>();
</script>

<template>
  <h1 class="text-xl">New Asset</h1>
  <form>
    <SimpleInput label="Name" type="text" v-model="seed.name" />
    <SimpleInput label="Unit" type="number" v-model.number="seed.unit" />
    <SimpleInput
      label="Acquisition Date"
      :max="Temporal.Now.plainDateISO()"
      type="date"
      v-model="seed.acquisitionDate"
    ></SimpleInput>
  </form>
</template>
