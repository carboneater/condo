<template>
    <VueFinalModal
	class="flex justify-center items-center"
	content-class="flex flex-col max-w-xl mx-4 p-4 bg-black border border-amber-600 rounded-lg space-y-2 text-amber-400"
  >
	<h1 class="text-xl">New Log Entry</h1>
	<form>
		<div>
			<label>Type</label>
		<select v-model="entry.type">
			<option v-for="actionType in props.actionTypes" :value="actionType">{{ getActionTypeEmoji(actionType) }}</option>
		</select>
		</div>
		<div>
			<label>Asset</label>
			<select v-model.number="entry.assetId">
				<option v-for="asset in props.assets.values()" :value="asset.id">{{ getAssetString(asset) }}</option>
			</select>
		</div>
		<div>
			<label>Date</label>
			<input type="date" v-model="entry.date"/>
		</div>
	</form>
	<div class="flex flex-row justify-between">
		<button class="mt-1 ml-auto px-2 border border-amber-600 rounded-lg" @click="emit('new', entry)">
			Create
		</button>
		<button class="mt-1 ml-auto px-2 border border-red-600 rounded-lg text-red-600" @click="emit('cancel')">Cancel</button>
	</div>
  </VueFinalModal>
</template>

<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  import { ActionType, Asset } from '~/schema';
  import {getActionTypeEmoji} from '../shared'

  const emit = defineEmits(['cancel','new'])
  const props = defineProps<{actionTypes: ActionType[], assets: Asset[]}>()
  const entry = {assetId: 0, date: new Date().toISOString().substring(0, 10), type: 'inspection'}

  function getAssetString(asset: Asset) {
	return `${asset.name}${asset.unit? ` (${asset.unit})` :""}`
  }
</script>

<style scoped>
	input, select {
		@apply mx-4
	}
</style>