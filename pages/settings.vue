<script lang="ts" setup>
import { Temporal } from "@js-temporal/polyfill";

const { data: assets } = await useFetch("/bff/assets");
const { data: settings } = await useFetch("/bff/settings");
</script>

<template>
  <form>
    <fieldset v-if="settings">
      <legend>Bâtiment</legend>
      <SimpleInput label="Nom du projet" type="text" v-model="settings.name" />
      <SimpleInput
        label="Date de Construction"
        :max="Temporal.Now.plainDateISO().toString()"
        type="date"
        v-model="settings.constructionDate"
      />
      <SimpleInput
        label="Nombre d'Unités"
        :min="1"
        type="number"
        v-model="settings.unitsCount"
      />
    </fieldset>
  </form>
  <hr />
</template>

<style lang="css" scoped></style>
