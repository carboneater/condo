<template>
  <assetsList
    @asset="onNewAsset"
    :assets="Object.values(assets)"
    :building="building"
  />
</template>

<script setup lang="ts">
import type { Asset, Building } from "~/schema";
import { assets, building } from "../data";
function onNewAsset(asset: Asset) {
  assets.value[asset.id] = asset;
}
</script>

<style scoped></style>
