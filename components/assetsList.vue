<template>
  <div class="flex flex-row justify-between">
    <h2 class="font-bold pt-1.5">Assets List</h2>
    <button
      class="border border-emerald-600 text-emerald-600 px-1.5 rounded-md"
      @click="onNew"
    >
      New
    </button>
  </div>
  <div class="flex flex-col">
    <div
      class="border border-solid border-slate-600 flex-row justify-between rounded-lg"
      v-for="asset in props.assets"
    >
      <div>{{ asset.name }} ({{ asset.unit ?? "Shared" }})</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer, useModal } from "vue-final-modal";
import newAssetModal from "./newAssetModal.vue";
import { Asset } from "~/schema";

const emit = defineEmits(["asset", "click"]);
const props = defineProps<{ assets: Asset[] }>();

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
      console.log(asset);
      props.assets.push({ ...asset, id: props.assets.length - 1 });
      //assets.push({...asset, id: assets.length - 1})
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
