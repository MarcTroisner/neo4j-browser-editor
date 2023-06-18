<template>
  <div class="flex h-screen w-screen flex-col gap-4 bg-neutral-50 p-10 dark:bg-neutral-900">
    <VComponent
      text="My button"
      prepend-icon="hi-solid-check"
      icon="hi-solid-check"
      intent="info"
      variant="base"
      stacked
      loading
    />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

import VComponent from '@/components/VButton.vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') toggleDark();
});
</script>
