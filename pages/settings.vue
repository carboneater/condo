<script lang="ts" setup>
import { Temporal } from "@js-temporal/polyfill";

const model = { constructionDate: Temporal.Now.plainDateISO().toString() };
</script>

<template>
  <form>
    <fieldset>
      <legend>Buiding</legend>
      <SimpleInput
        label="Construction Date"
        :max="Temporal.Now.plainDateISO()"
        type="date"
        v-model="model.constructionDate"
      />
    </fieldset>
  </form>
</template>

<style lang="css" scoped></style>
