<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-black border border-emerald-600 rounded-lg space-y-2 text-emerald-400"
  >
    <NewAsset :seed="newAsset" />
    <div class="flex flex-row justify-between">
      <label>Date</label>
      <input type="date" v-model="newAsset.acquisitionDate" />
    </div>
    <div class="flex flex-row justify-between">
      <label>Origin</label>
      <input
        type="checkbox"
        v-model="newAsset.origin"
        @change="onOrigin(newAsset.origin)"
      />
    </div>

    <div class="flex flex-row">
      <button
        class="mt-1 ml-auto px-2 border border-emerald-600 rounded-lg"
        @click="emit('create', toAsset(newAsset))"
      >
        Create
      </button>
      <button
        class="mt-1 ml-auto px-2 border border-red-600 rounded-lg text-red-600"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </VueFinalModal>
</template>

<script setup lang="ts">
import type { Asset } from "../schema";
import { VueFinalModal } from "vue-final-modal";
import { Temporal } from "@js-temporal/polyfill";
import { instantFromISODateString } from "~/shared";
import { building } from "~/data";

const emit = defineEmits(["cancel", "create"]);
const curDate = Temporal.Now.plainDateISO();
const newAsset = {
  acquisitionDate: curDate.toString(),
  name: "",
  origin: false,
  unit: 0,
};

function toAsset({
  acquisitionDate,
  name,
  unit,
}: {
  acquisitionDate: string;
  name: string;
  unit: number;
}): Omit<Asset, "id"> {
  return {
    acquisitionDate: instantFromISODateString(acquisitionDate),
    name,
    unit,
  };
}

function onOrigin(origin: boolean) {
  console.log(origin);
  console.log(newAsset.acquisitionDate);
  console.log(building.constructionDate.toString());
  console.log(
    building.constructionDate
      .toZonedDateTime(Temporal.Now.zonedDateTimeISO().getTimeZone())
      .toInstant()
      .toString()
  );

  newAsset.acquisitionDate = building.constructionDate
    .toZonedDateTime(Temporal.Now.zonedDateTimeISO().getTimeZone())
    .toInstant()
    .toString();
}
</script>
