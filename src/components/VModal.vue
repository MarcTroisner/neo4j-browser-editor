<template>
  <Transition name="v-modal-content">
    <div
      v-if="props.modelValue || eager"
      v-show="props.modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center px-4"
    >
      <div class="mx-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-xl sm:max-w-xl">
        <div
          ref="modal"
          class="relative p-6"
        >
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:items-stretch">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full"
              :class="{
                'bg-info-100 text-info-500': props.intent === 'info',
                'bg-danger-100 text-danger-500': props.intent === 'danger',
                'bg-warning-100 text-warning-500': props.intent === 'warning',
                'bg-success-100 text-success-500': props.intent === 'success',
              }"
            >
              <OhVueIcon
                :name="iconName"
                class="h-6 w-6"
              />
            </div>
            <div class="md: flex-1 text-center sm:text-start">
              <h3 class="text-secondary-900 text-lg font-medium">Blog post published</h3>
              <div class="text-secondary-500 mt-2 text-sm">
                <slot name="default" />
              </div>
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <Transition name="v-modal-scrim">
    <div
      v-if="props.modelValue || eager"
      v-show="props.modelValue"
      class="fixed inset-0 bg-black/50"
      @click="$emit('update:modelValue', !props.modelValue)"
    />
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';
import { onClickOutside } from '@vueuse/core';

export interface IModalProps {
  modelValue: boolean;
  title: string;
  intent?: 'info' | 'danger' | 'success' | 'warning';
  icon?: string;
  eager?: boolean;
  closeOnClickOutside?: boolean;
}

export interface IModalEmits {
  (e: 'update:modelValue', state: boolean): void;
}

const props = withDefaults(defineProps<IModalProps>(), {
  modelValue: false,
  intent: 'info',
  icon: undefined,
  eager: false,
  closeOnClickOutside: true,
});
const emit = defineEmits<IModalEmits>();

const modal = ref<HTMLDivElement | null>(null);

const iconName = computed(() => {
  const defaultIcons = {
    danger: 'hi-solid-x-circle',
    success: 'hi-solid-check-circle',
    warning: 'hi-solid-exclamation',
    info: 'hi-solid-information-circle',
  };

  if (props.icon !== undefined) return props.icon;
  return defaultIcons[props.intent];
});

onClickOutside(modal, () => {
  if (props.closeOnClickOutside) emit('update:modelValue', !props.modelValue);
});
</script>

<style scoped>
.v-modal-scrim-enter-active,
.v-modal-scrim-leave-active {
  @apply transition-all;
}

.v-modal-scrim-enter-from,
.v-modal-scrim-leave-to {
  @apply opacity-0;
}

.v-modal-content-enter-active,
.v-modal-content-leave-active {
  @apply transition-all;
}

.v-modal-content-enter-from,
.v-modal-content-leave-to {
  @apply scale-90 opacity-0;
}
</style>
