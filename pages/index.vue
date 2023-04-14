<template>
	<!--<div v-for="[id, action] in Object.entries(actions)">
	<actionRow :action="{id: Number(id), ...action}" />
</div>-->
	<log :logs="logs.map(({assetId, date, type}) => ({asset: assets[assetId].name, date, type}))"/>
	<assetsList @asset="onNewAsset" :assets="Object.values(assets)"/>
</template>

<script setup lang="ts">
	import { ActionType } from '../schema';
	const assets = ref<Record<number, {id: number, name: string, unit?: number}>>(arrayToMap([
		{id: 0, name: 'Caulking'},
		{id: 1, name: 'Fire Alarm'},
		{id: 2, name: 'Front Door'},
		{id: 3, name: 'Roof'},
		{id: 4, name: 'Windows'}
	].concat([1,2,3,4,5,6,7,8].flatMap((unit) =>[
		{id: unit*10, name: 'Front Balcony Door', unit},
		{id: unit*10 + 1, name:'Back Balcony Door', unit},
		{id: unit*10 + 2, name: 'Water Heater', unit}
	])), 'id'))

	const actions: Record<number, {active: boolean, assetId: number, ttl: number, type: ActionType}>= {
			1: {active: true, assetId: 1, ttl: 25, type: 'inspection'},
			2: {active: true, assetId: 3, ttl: 86400, type: 'maintenance'},
			3: {active: true, assetId: 0, ttl: 3600, type: 'repair'}
		}
	const logs : {assetId: number, date: string, type: ActionType}[]= [
			{assetId: 1, date: '2023-04', type: 'inspection'},
			{assetId: 3, date: '2022-07', type: 'repair'},
			{assetId: 0, date: '2020-01', type: 'maintenance'}
		]

	function arrayToMap<T extends object>(array: T[], index: keyof T) {
		return Object.fromEntries(array.map((entry) => [entry[index], entry]))
	}

	function onNewAsset(asset: {name: string, id: number, unit?: number}) {
		assets.value[asset.id] = asset
	}
</script>

<style scoped>
body {
	background-color: black;
	color: #ccc;
}
</style>
