<template>
  <div class="flex h-screen w-screen flex-col gap-4 bg-neutral-50 p-10 dark:bg-neutral-900">
    <VButton
      type="button"
      append-icon="hi-solid-check"
      size="base"
      color="warning"
      text="Some button text"
      :variant="variant"
      @click="toggleDark()"
    />
    <VButton
      type="button"
      append-icon="hi-solid-check"
      size="base"
      color="primary"
      text="Some button text"
      :variant="variant"
      @click="toggleDark()"
    />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

import VButton from '@/components/VButton.vue';

const variant = 'tonal';

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>
