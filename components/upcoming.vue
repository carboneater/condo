<template>
  <div class="flex flex-col">
    <div
      class="border border-solid border-slate-600 flex-row justify-between rounded-lg"
      v-for="entry in props.upcoming"
    >
      <div>{{ getActionTypeEmoji(entry.type) }}</div>
      <div>
        {{ assets[entry.assetId].name }} ({{
          assets[entry.assetId].unit ?? "Shared"
        }})
      </div>
      <div>{{ entry.instant.toString() }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Asset, UpcomingEntries } from "../schema";
import { getActionTypeEmoji } from "../shared";

const props = defineProps<{
  assets: Record<number, Asset>;
  upcoming: UpcomingEntries[];
}>();
</script>
