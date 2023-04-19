<template>
  <div>
    {{ action.active }} {{ action.type }}<span>{{ action.name }}</span> ({{
      action.ttl
    }})
  </div>
</template>

<script setup lang="ts">
import { ActionType } from "../schema";

const {
  action: { active, id, name, ttl },
} = defineProps<{
  action: {
    active: boolean;
    id: number;
    name: string;
    lastDone?: string;
    ttl: number;
    type: ActionType;
  };
}>();
console.log(active, id, name, ttl);
</script>

<style scoped></style>
