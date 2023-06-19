<template>
  <div class="flex flex-col gap-y-2">
    <div
      v-for="(slot, key) in getSlots"
      :key="key"
      class="flex cursor-pointer flex-col overflow-hidden rounded-md bg-white shadow-md transition-all dark:bg-base-900"
    >
      <div
        class="px-4 py-3"
        :class="{
          'bg-base-100 dark:bg-base-800': isActiveSlot(slot),
        }"
        @click="toggleActiveSlot(slot)"
      >
        <component
          v-if="slot.children && (slot.children as any).header"
          :is="(slot.children as any).header"
        />
      </div>
      <Transition name="v-accordion">
        <div
          v-if="slot.children && (slot.children as any).default && slot.props && isActiveSlot(slot)"
          class="px-4 py-3"
        >
          <component :is="(slot.children as any).default" />
        </div>
      </Transition>
    </div>
  </div>
  {{ activeSlots }}
</template>

<script setup lang="ts">
import type { Component, VNode } from 'vue';

import { computed, ref, useSlots } from 'vue';

const slots = useSlots();

const activeSlots = ref<string[]>([]);

const getSlots = computed(() => {
  if (slots.default === undefined) return [];

  return slots.default().reduce((slotItems: VNode[], slot) => {
    // Filter out all components which are not VAccordionItem components
    if ((slot.type as Component).name === 'VAccordionItem') slotItems.push(slot);

    return slotItems;
  }, []);
});

function isActiveSlot(slot: VNode): boolean {
  if (slot.props === null) return false;

  return activeSlots.value.includes(slot.props.identifier);
}

function toggleActiveSlot(slot: VNode): void {
  if (slot.props === null) return;

  const { identifier } = slot.props;

  if (activeSlots.value.includes(identifier)) {
    activeSlots.value = activeSlots.value.filter((activeSlot) => activeSlot !== identifier);
    return;
  }
  activeSlots.value.push(identifier);
}
</script>

<style scoped>
.v-accordion-enter-active,
.v-accordion-leave-active {
}

.v-accordion-enter-from,
.v-accordion-leave-to {
}
</style>
