<template>
	<div>
		<div class="flex flex-row justify-between">
			<h2>Maintenance Log</h2>
			<button class="border border-amber-400 text-amber-400 px-1.5 rounded-md" @click="onNew">New Log Entry</button>
		</div>
		<div class="flex flex-col">
			<div class="border border-solid border-slate-600 flex flex-row justify-between rounded-lg" v-for="entry in logs">
				<div>{{ getActionTypeEmoji(entry.type) }}</div>
				<div>{{ entry.asset }}</div>
				<div>{{ entry.date }}</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {ModalsContainer, useModal} from 'vue-final-modal'
	import newAssetModal from './newAssetModal.vue'
	import type { ActionType } from '../schema'

	const {logs} = defineProps<{logs: {asset: string, date: string, type: ActionType}[]}>()

	function getActionTypeEmoji(type: ActionType) {
		switch(type) {
			case 'inspection' :
				return '🔍'
				break
			case 'maintenance':
				return '🛠️'
				break
			case 'repair':
				return '🧰'
				break
			default:
				return '⁉'
		}
	}

	const {open, close} = useModal({
		attrs: {
			onCancel() {close()},
			onCreate() {
				close();
			}
		},
		component: newAssetModal
	})

	function onNew() {}
</script>

<style scoped>
</style>
