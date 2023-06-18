<template>
  <p>Stepper</p>
</template>

<script setup lang="ts">
export interface IStepperProps {
  modelValue: string;
  steps: string[];
}

export interface IStepperEmits {
  (e: 'update:modelValue', step: string): void;
}

defineProps<IStepperProps>();
defineEmits<IStepperEmits>();
</script>

<style scoped></style>
