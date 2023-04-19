<template>
  <div class="flex flex-row justify-between">
    <label v-if="label">{{ label }}</label>
    <input
      class="bg-gray-950 field text-neutral-400"
      @input="event => $emit('update:modelValue', (event.target as any|null)?.value)"
      :placeholder="label"
      :value="modelValue"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);
defineProps({
  label: {
    default: "",
    type: String,
  },
  modelValue: {
    type: [Number, String],
    default: "",
  },
});
</script>

<style scoped></style>
