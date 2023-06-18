<template>
  <div class="flex h-screen w-screen flex-col gap-4 bg-neutral-50 p-10 dark:bg-neutral-900">
    <VButton
      text="Toggle notification"
      @click="showNotification = !showNotification"
    />
    <VComponent
      v-model="showNotification"
      intent="warning"
      title="Your query failed"
    >
      <template #default>
        <p>Your team has made changes to your company profile since you last logged in.</p>
      </template>
      <template #actions>
        <VButton
          text="Dismiss"
          size="xs"
          variant="plain"
        />
        <VButton
          text="Retry"
          size="xs"
          variant="plain"
          color="primary"
        />
      </template>
    </VComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

import VButton from '@/components/VButton.vue';
import VComponent from '@/components/VNotification.vue';

const showNotification = ref(true);
const isDark = useDark();
const toggleDark = useToggle(isDark);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') toggleDark();
});
</script>
