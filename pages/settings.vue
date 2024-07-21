<script lang="ts" setup>
import { Temporal } from "@js-temporal/polyfill";

const model = {
  constructionDate: Temporal.Now.plainDateISO().toString(),
  unitsCount: 2,
};
</script>

<template>
  <form>
    <fieldset>
      <legend>Buiding</legend>
      <SimpleInput label="Nom du projet" type="text" v-model="model.name" />
      <SimpleInput
        label="Date de Construction"
        :max="Temporal.Now.plainDateISO()"
        type="date"
        v-model="model.constructionDate"
      />
      <SimpleInput
        label="Nombre d'Unités"
        :min="0"
        type="number"
        v-model="model.unitsCount"
      />
    </fieldset>
  </form>
</template>

<style lang="css" scoped></style>
