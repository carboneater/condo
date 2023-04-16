<template>
	<div>
		<div class="flex flex-row justify-between">
			<h2>Maintenance Log</h2>
			<button class="border border-amber-400 text-amber-400 px-1.5 rounded-md" @click="open">New Log Entry</button>
		</div>
		<log
			:assets="assets"
			:logs="logs"
		/>
	</div>
</template>

<script setup lang="ts">
	import {useModal} from 'vue-final-modal'
    import type { LogEntry } from '~/schema';
	import {actionTypes, assets, logs} from '../data'
	import NewLogModal from '../components/newLogModal.vue';

	const {open, close} = useModal({
		attrs: {
			assets: Object.values(assets.value),
			actionTypes,
			onCancel() {close()},
			onNew(log: LogEntry) {
				close();
				console.log(log)
				logs.value.push(log)
			}
		},
		component: NewLogModal
	})
</script>