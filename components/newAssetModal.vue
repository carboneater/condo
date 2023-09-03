<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-black border border-emerald-600 rounded-lg space-y-2 text-emerald-400"
  >
    <h1 class="text-xl">New Asset</h1>
    <form>
      <SimpleInput label="Name" type="text" v-model="newAsset.name" />
      <SimpleInput label="Unit" type="number" v-model.number="newAsset.unit" />
      <SimpleInput
        label="Acquisition Date"
        :max="Temporal.Now.plainDateISO()"
        type="date"
        v-model="newAsset.acquisitionDate"
      ></SimpleInput>
    </form>
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
import { Asset } from "../schema";
import { VueFinalModal } from "vue-final-modal";
import { Temporal } from "@js-temporal/polyfill";
const emit = defineEmits(["cancel", "create"]);
const curDate = Temporal.Now.plainDateISO();
const newAsset = { acquisitionDate: curDate.toString(), name: "", unit: 0 };

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
    acquisitionDate: Temporal.PlainDate.from(acquisitionDate)
      .toZonedDateTime(Intl.DateTimeFormat().resolvedOptions().timeZone)
      .toInstant(),
    name,
    unit,
  };
}
</script>
