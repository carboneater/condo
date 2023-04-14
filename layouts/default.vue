<template>
	<header class="bg-black flex text-slate-600">
		<h1>Entretien</h1>
		<nav class="mx-auto flex justify-between">
			<NuxtLink to="/" class="font-bold">Home</NuxtLink>
		</nav>
	</header>
	<div class="bg-black text-slate-600">
		<slot/>
		<ModalsContainer/>
	</div>
</template>

<script setup lang="ts">
	import {ModalsContainer} from 'vue-final-modal'
</script>

<style scoped lang="postcss">

</style>
