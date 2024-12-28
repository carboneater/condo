<template>
  <assetsList
    @asset="onNewAsset"
    :assets="Object.values(assets)"
    :building="building"
  />
</template>

<script setup lang="ts">
import type { Asset, Building } from "~/schema";
import { assets } from "../data";
const { building } = defineProps<{ building: Building }>();
function onNewAsset(asset: Asset) {
  assets.value[asset.id] = asset;
}
</script>

<style scoped></style>
