<template>
  <h2 class="font-bold pt-1.5">Upcoming Maintenance</h2>
  <div class="flex flex-col">
    <div
      class="border border-solid border-slate-600 flex flex-row justify-between rounded-lg"
      :class="entry.type"
      v-for="entry in props.upcoming"
    >
      <div>{{ getActionTypeEmoji(entry.type) }}</div>
      <div>
        {{ assets[entry.assetId].name }} ({{
          assets[entry.assetId].unit ?? "Shared"
        }})
      </div>
      <div>{{ entry.instant.toString() }}</div>
      <button
        class="border border-green-400 text-green-400 px-1.5 rounded-md"
        @click="
          openSeeded({ assetId: entry.assetId, type: entry.type as ActionType })
        "
      >
        ✅
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useModal } from "vue-final-modal";
import NewLogModal from "../components/newLogModal.vue";
import type { ActionType, Asset, LogEntry, UpcomingEntries } from "../schema";
import { getActionTypeEmoji } from "../shared";

const props = defineProps<{
  assets: Record<number, Asset>;
  upcoming: UpcomingEntries[];
}>();

import { actionTypes, logs } from "../data";

function openSeeded(seed?: Partial<Omit<LogEntry, "date">>) {
  const { open, close } = useModal({
    attrs: {
      assets: Object.values(props.assets),
      actionTypes,
      onCancel() {
        close();
      },
      onNew(log: LogEntry) {
        close();
        console.log(log);
        logs.value.push(log);
      },
      seed,
    },
    component: NewLogModal,
  });
  open();
}
</script>

<style scoped>
.inspection {
  @apply border-sky-600 text-sky-600;
}
.maintenance {
  @apply border-amber-600 text-amber-600;
}
.repair {
  @apply border-red-600 text-red-600;
}
</style>
