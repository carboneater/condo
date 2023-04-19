<template>
  <assetsList @asset="onNewAsset" :assets="Object.values(assets)" />
</template>

<script setup lang="ts">
import { assets } from "../data";
function onNewAsset(asset: { name: string; id: number; unit?: number }) {
  assets.value[asset.id] = asset;
}
</script>

<style scoped></style>
