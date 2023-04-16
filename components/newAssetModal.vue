<template>
    <VueFinalModal
	class="flex justify-center items-center"
	content-class="flex flex-col max-w-xl mx-4 p-4 bg-black border border-emerald-600 rounded-lg space-y-2 text-emerald-400"
  >
	<h1 class="text-xl">New Asset</h1>
	<form>
		<SimpleInput label="Name" type="text" v-model="newAsset.name" />
		<SimpleInput label="Unit" type="number" v-model.number="newAsset.unit"/>
	</form>
	<div class="flex flex-row">
		<button class="mt-1 ml-auto px-2 border border-emerald-600 rounded-lg" @click="emit('create', newAsset)">
			Create
		</button>
		<button class="mt-1 ml-auto px-2 border border-red-600 rounded-lg text-red-600" @click="emit('cancel')">Cancel</button>
	</div>
  </VueFinalModal>
</template>

<script setup lang="ts">
  import { VueFinalModal } from 'vue-final-modal'
  /*const emit = defineEmits<{
    (e: 'create'): void
  }>()*/
  const emit = defineEmits(['cancel','create'])
  const newAsset = {name: '', unit: 0}
</script>
