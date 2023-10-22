<template>
  <assetsList @asset="onNewAsset" :assets="Object.values(assets)" />
</template>

<script setup lang="ts">
import type { Asset } from "~/schema";
import { assets } from "../data";
function onNewAsset(asset: Asset) {
  assets.value[asset.id] = asset;
}
</script>

<style scoped></style>
