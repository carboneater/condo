<template>
  <div class="w-fit">
    <h2 class="font-bold pt-1.5 w-fit">Upcoming Maintenance</h2>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Asset</th>
          <th>Unit</th>
          <th>Due Date</th>
          <th></th>
        </tr>
      </thead>
      <tr
        class="border border-solid border-slate-600 rounded-lg"
        :class="entry.type"
        v-for="entry in props.upcoming"
      >
        <td :title="entry.type">
          {{ getActionTypeEmoji(entry.type) }}
        </td>
        <td>{{ assets[entry.assetId].name }}</td>
        <td>{{ assets[entry.assetId].unit ?? "Shared" }}</td>
        <td>{{ instantToISODateString(entry.instant) }}</td>
        <td>
          <button
            class="border border-green-400 text-green-400 px-1.5 rounded-md"
            @click="
              openSeeded({
                assetId: entry.assetId,
                type: entry.type === 'lifetime' ? 'new' : entry.type,
              })
            "
          >
            {{ entry.type === "lifetime" ? "✨" : "✅" }}
          </button>
          <button
            class="border border-red-400 text-red-400 px-1.5 rounded-md"
            @click="openSeeded({ assetId: entry.assetId, type: 'thrash' })"
            v-if="entry.type === 'lifetime'"
          >
            🗑️
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useModal } from "vue-final-modal";
import NewLogModal from "../components/newLogModal.vue";
import type { ActionType, Asset, LogEntry, UpcomingEntries } from "../schema";
import { getActionTypeEmoji, instantToISODateString } from "../shared";

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
      onNewLog(log: LogEntry) {
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
