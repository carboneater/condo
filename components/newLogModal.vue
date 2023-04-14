<template>
    <VueFinalModal
	class="flex justify-center items-center"
	content-class="flex flex-col max-w-xl mx-4 p-4 bg-black border border-amber-600 rounded-lg space-y-2 text-amber-400"
  >
	<h1 class="text-xl">New Asset</h1>
	<form>
		<select>
			<option v-for="asset in props.assets" :value="asset.id">{{ asset.name }}</option>
		</select>
	</form>
	<div class="flex flex-row">
		<button class="mt-1 ml-auto px-2 border border-emerald-600 rounded-lg" @click="emit('new', entry)">
			Create
		</button>
		<button class="mt-1 ml-auto px-2 border border-red-600 rounded-lg text-red-600" @click="emit('cancel')">Cancel</button>
	</div>
  </VueFinalModal>
</template>

<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
import { ActionType } from '~/schema';

  const emit = defineEmits(['cancel','new'])
  const props = defineProps<{actionTypes: ActionType[], assets: {id: number, name: string}[]}>()
  const entry = {assetId: 0, type: 'inspection'}
</script>
