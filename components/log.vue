<template>
  <div class="w-fit">
    <h2 class="font-bold pt-1.5">Maintenance Logs</h2>
    <table>
      <thead>
        <tr>
          <th>📰</th>
          <th>Asset</th>
          <th>Unit</th>
          <th>Date</th>
        </tr>
      </thead>
      <tr
        class="border border-solid border-slate-600 rounded-lg"
        :class="entry.type"
        v-for="entry in props.logs"
      >
        <td>{{ getActionTypeEmoji(entry.type) }}</td>
        <td>{{ props.assets[entry.assetId].name }}</td>
        <td>
          <span v-if="props.assets[entry.assetId].unit">{{
            props.assets[entry.assetId].unit
          }}</span>
        </td>
        <td>{{ instantToISODateString(entry.date) }}</td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Asset, LogEntry } from "../schema";
import { getActionTypeEmoji, instantToISODateString } from "../shared";

const props = defineProps<{
  assets: Record<number, Asset>;
  logs: LogEntry[];
}>();
</script>

<style scoped>
.maintenance {
  @apply border-amber-600 text-amber-600;
}
.repair {
  @apply border-red-600 text-red-600;
}
</style>
