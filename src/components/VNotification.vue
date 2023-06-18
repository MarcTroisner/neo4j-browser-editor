<template>
  <Transition name="v-notification">
    <div
      v-if="props.modelValue || eager"
      v-show="props.modelValue"
      class="border-secondary-50 relative mx-auto max-w-[400px] rounded-xl border bg-white p-4 text-sm shadow-lg dark:bg-base-950"
    >
      <div class="absolute right-4 top-4 ml-auto">
        <VButton
          icon="hi-x"
          size="sm"
          variant="text"
          @click="$emit('update:modelValue', !props.modelValue)"
        />
      </div>
      <div class="flex space-x-4">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full"
          :class="{
            'bg-info-100 text-info-500 dark:bg-info-950': props.intent === 'info',
            'bg-danger-100 text-danger-500 dark:bg-danger-950': props.intent === 'danger',
            'bg-warning-100 text-warning-500 dark:bg-warning-950': props.intent === 'warning',
            'bg-success-100 text-success-500 dark:bg-success-950': props.intent === 'success',
          }"
        >
          <OhVueIcon
            :name="iconName"
            class="h-6 w-6"
          />
        </div>
        <div class="flex-1">
          <h4 class="pr-6 font-medium text-black dark:text-white">
            {{ props.title }}
          </h4>
          <div class="mt-1 text-black dark:text-white">
            <slot name="default" />
          </div>
          <div class="mt-4 flex space-x-4">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { computed, onMounted, ref, watch } from 'vue';

import VButton from '@/components/VButton.vue';

export interface INotificationProps {
  modelValue: boolean;
  title: string;
  intent?: 'info' | 'danger' | 'success' | 'warning';
  icon?: string;
  eager?: boolean;
  timeout?: number;
}

export interface INotificationEmits {
  (e: 'update:modelValue', state: boolean): void;
}

const props = withDefaults(defineProps<INotificationProps>(), {
  modelValue: false,
  intent: 'info',
  icon: undefined,
  eager: false,
  timeout: undefined,
});
const emit = defineEmits<INotificationEmits>();

const closeTimeout = ref(0);

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

function setCloseTimeout(): void {
  closeTimeout.value = setTimeout(() => {
    emit('update:modelValue', !props.modelValue);
  }, props.timeout);
}

watch(
  () => props.modelValue,
  () => {
    // Clear notification timeout if user closed it manually
    if (!props.modelValue) {
      clearTimeout(closeTimeout.value);
      return;
    }

    if (props.timeout === undefined) return;
    setCloseTimeout();
  }
);

onMounted(() => {
  if (props.timeout !== undefined && props.modelValue) setCloseTimeout();
});
</script>

<style scoped>
.v-notification-enter-active,
.v-notification-leave-active {
  @apply transition-all;
}

.v-notification-enter-from,
.v-notification-leave-to {
  @apply translate-x-5 opacity-0;
}
</style>
