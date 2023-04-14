<template>
	<pre @click="onClick">{{ list }}</pre>
</template>

<script setup lang="ts">
	const list = ref(['alpha', 'bravo'])
	function onClick () {
	list.value.push('charlie')
	console.log(list.value)
	}
</script>

<style scoped>

</style>
