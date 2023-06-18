<template>
  <div class="flex h-screen w-screen flex-col gap-4 bg-neutral-50 p-10 dark:bg-neutral-900">
    <VComponent :steps="steps">
      <template #default>
        <p class="h-full w-full text-primary-600">step one</p>
      </template>
      <template #step-one>
        <p class="h-full w-full">step one</p>
      </template>
      <template #step-two>
        <p class="h-full w-full">step two</p>
      </template>
      <template #step-three>
        <p class="h-full w-full">step three</p>
      </template>
    </VComponent>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

import VComponent from '@/components/VStepper.vue';

const steps = [
  {
    identifier: 'one',
  },
  {
    identifier: 'two',
  },
  {
    identifier: 'three',
  },
];
const isDark = useDark();
const toggleDark = useToggle(isDark);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') toggleDark();
});
</script>
