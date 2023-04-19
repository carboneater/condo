<template>
  <div class="flex flex-col">
    <div
      class="border border-solid border-slate-600 flex flex-row justify-between rounded-lg"
      :class="entry.type"
      v-for="entry in props.logs"
    >
      <div>{{ getActionTypeEmoji(entry.type) }}</div>
      <div>{{ props.assets[entry.assetId].name }}</div>
      <div v-if="props.assets[entry.assetId].unit">
        {{ props.assets[entry.assetId].unit }}
      </div>
      <div>{{ entry.date }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ActionType, Asset, LogEntry } from "../schema";

const props = defineProps<{
  assets: Record<number, Asset>;
  logs: LogEntry[];
}>();

function getActionTypeEmoji(type: ActionType) {
  switch (type) {
    case "inspection":
      return "🔍";
      break;
    case "maintenance":
      return "🛠️";
      break;
    case "repair":
      return "🧰";
      break;
    default:
      return "⁉";
  }
}
</script>

<style scoped>
.maintenance {
  @apply border-amber-600 text-amber-600;
}
.repair {
  @apply border-red-600 text-red-600;
}
</style>
