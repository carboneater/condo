<template>
  <body class="dark:bg-black">
    <header class="bg-black flex text-slate-600">
      <!--<h1>Entretien</h1>-->
      <nav class="flex flex-row justify-between">
        <NuxtLink class="font-bold pr-4" to="/">🛠️📰</NuxtLink>
        <NuxtLink class="px-4" to="/assets">⚒️</NuxtLink>
        <NuxtLink class="px-4" to="/logs">🗒️</NuxtLink>
        <NuxtLink class="px-4" to="/upcoming">🗓️</NuxtLink>
        <NuxtLink class="px-4" to="/settings">⚙️</NuxtLink>
        <!--<NuxtLink class="px-4" to="/providers">Providers</NuxtLink>-->
      </nav>
    </header>
    <div class="bg-gray-400 dark:bg-black text-slate-600">
      <slot />
      <ModalsContainer />
    </div>
  </body>
</template>

<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
</script>

<style scoped lang="postcss">
html {
  height: 100%;
  min-height: 100%;
}
body {
  height: 100%;
  max-height: 100%;
  min-height: 100%;
}
</style>
