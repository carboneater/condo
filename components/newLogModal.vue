<template>
  <VueFinalModal
    class="flex justify-center items-center"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-black border border-amber-600 rounded-lg space-y-2 text-amber-400"
  >
    <h1 class="text-xl">New Log Entry</h1>
    <form>
      <div>
        <label>Type</label>
        <select v-model="entry.type">
          <option v-for="actionType in props.actionTypes" :value="actionType">
            {{ getActionTypeEmoji(actionType) }}
          </option>
        </select>
      </div>
      <div>
        <label>Asset</label>
        <select v-model.number="entry.assetId">
          <option
            v-for="asset in Object.values(props.assets)"
            :value="asset.id"
          >
            {{ getAssetString(asset) }}
          </option>
        </select>
      </div>
      <div>
        <label>Date</label>
        <input type="date" v-model="entry.date" />
      </div>
    </form>
    <div class="flex flex-row justify-between">
      <button
        class="mt-1 ml-auto px-2 border border-amber-600 rounded-lg"
        @click="handleNewLog(entry)"
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
import { VueFinalModal } from "vue-final-modal";
import type { ActionType, Asset, LogEntry } from "~/schema";
import { getActionTypeEmoji, instantFromISODateString } from "../shared";
import NewAsset from "./newAsset.vue";

const emit = defineEmits(["cancel", "newLog", "newAsset", "revokeAsset"]);
const props = defineProps<{
  actionTypes: ActionType[];
  assets: Record<number, Asset>;
  seed?: Partial<Omit<LogEntry, "date">>;
}>();
const entry: Omit<LogEntry, "date"> & { date: string } = {
  assetId: 0,
  date: new Date().toISOString().substring(0, 10),
  type: "inspection",
  ...props.seed,
};

function getAssetString(asset: Asset) {
  return `${asset.name}${asset.unit ? ` (${asset.unit})` : ""}`;
}

const litetimeTypes: ActionType[] = ["new", "thrash"];
function handleNewLog({
  assetId,
  date,
  type,
}: {
  assetId: number;
  date: string;
  type: ActionType;
}) {
  const log = toLogEntry({ assetId, date, type });

  if (litetimeTypes.includes(type)) {
    emit("revokeAsset", { assetId, date });
    if (type === "new") {
      emit("newAsset", {
        ...props.assets[assetId],
        id: Object.keys(props.assets).length + 1,
      });
    }
  }
  emit("newLog", log);
}

function toLogEntry({
  assetId,
  date,
  type,
}: {
  assetId: number;
  date: string;
  type: ActionType;
}): LogEntry {
  return {
    assetId,
    date: instantFromISODateString(date),
    type,
  };
}
</script>

<style scoped>
input,
select {
  @apply mx-4;
}
</style>
