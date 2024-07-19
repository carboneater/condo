<template>
  <div class="w-fit">
    <div class="flex justify-between w-fit">
      <h2 class="font-bold pt-1.5 w-fit">Assets List</h2>
      <button
        class="border border-emerald-600 text-emerald-600 px-1.5 rounded-md"
        @click="onNew"
      >
        New
      </button>
    </div>
    <table>
      <thead>
        <th>Asset</th>
        <th>Unit</th>
        <th>Acquisition</th>
      </thead>
      <tr
        class="border border-solid border-slate-600 rounded-lg"
        v-for="asset in props.assets"
      >
        <td>{{ asset.name }}</td>
        <td>{{ asset.unit ?? "Shared" }}</td>
        <td>
          {{ instantToISODateString(asset.acquisitionDate) }}
        </td>
        <td v-if="asset.decomissionDate">
          {{ asset.decomissionDate }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useModal } from "vue-final-modal";
import newAssetModal from "./newAssetModal.vue";
import type { Asset, Building } from "~/schema";
import { instantToISODateString } from "~/shared";

const emit = defineEmits(["asset", "click"]);
const props = defineProps<{ assets: Asset[]; building: Building }>();

const { open, close } = useModal({
  attrs: {
    onCancel() {
      close();
    },
    onCreate(asset: Omit<Asset, "id">) {
      close();
      if (asset.unit === 0) {
        delete asset.unit;
      }

      props.assets.push({ ...asset, id: props.assets.length - 1 });
      emit("asset", { ...asset, id: props.assets.length - 1 });
    },
  },
  component: newAssetModal,
});

function appendAsset(asset: Omit<Asset, "id">) {
  close();
  console.log(asset);
}
function onNew(event: Event) {
  open();
}
</script>

<style scoped></style>
