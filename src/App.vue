<template>
  <div class="flex h-screen w-screen flex-col gap-4 bg-base-50 p-10 dark:bg-base-950">
    <VAccordion>
      <VAccordionItem identifier="one">
        <template #header> HEader 1 </template>
        <template #default> SOme text in body </template>
      </VAccordionItem>
      <VAccordionItem identifier="two">
        <template #header> HEader 2 </template>
        <template #default> SOme text in body </template>
      </VAccordionItem>
      <VAccordionItem identifier="three">
        <template #header> HEader 3 </template>
        <template #default> SOme text in body </template>
      </VAccordionItem>
      <VAccordionItem identifier="four">
        <template #header> HEader 4 </template>
        <template #default> SOme text in body </template>
      </VAccordionItem>
    </VAccordion>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

import VAccordion from '@/components/VAccordion.vue';
import VAccordionItem from '@/components/VAccordionItem.vue';
import { ref } from 'vue';

const isDark = useDark();
const toggleDark = useToggle(isDark);

const show = ref(true);

window.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') toggleDark();
});
</script>
