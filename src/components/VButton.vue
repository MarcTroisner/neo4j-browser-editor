<template>
  <button
    class="v-button"
    :class="[buttonSize, buttonVariant, { 'opacity-60': disabled }]"
    :disabled="disabled || loading"
    :type="type"
  >
    <div
      v-if="icon"
      class="flex items-center"
      :class="{
        invisible: loading,
      }"
    >
      <OhVueIcon
        :name="props.icon"
        :scale="iconSize"
      />
    </div>
    <div
      v-else
      class="flex items-center gap-1"
      :class="{
        'flex-col': stacked,
        invisible: loading,
      }"
    >
      <OhVueIcon
        v-if="props.prependIcon"
        :name="props.prependIcon"
        :scale="iconSize"
      />
      <p>
        {{ text }}
      </p>
      <OhVueIcon
        v-if="props.appendIcon"
        :name="props.appendIcon"
        :scale="iconSize"
      />
    </div>
    <div
      v-if="loading"
      class="absolute left-1/2 top-1/2 z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center"
    >
      <OhVueIcon
        class="animate-spin"
        name="ri-loader-5-line"
        :scale="iconSize"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';

export interface IButtonProps {
  color?: 'base' | 'primary' | 'danger' | 'success' | 'warning' | 'info';
  variant?: 'base' | 'outline' | 'ghost' | 'plain' | 'text';
  type?: 'submit' | 'reset' | 'button';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  prependIcon?: string;
  appendIcon?: string;
  icon?: string;
  stacked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
}

const props = withDefaults(defineProps<IButtonProps>(), {
  color: 'base',
  type: 'button',
  size: 'base',
  variant: 'base',
  prependIcon: undefined,
  appendIcon: undefined,
  icon: undefined,
  stacked: false,
  disabled: false,
  loading: false,
  text: undefined,
});

const iconSize = computed(() => {
  const sizes = {
    xs: 0.8,
    sm: 0.9,
    base: 1,
    lg: 1.1,
    xl: 1.2,
  };

  return sizes[props.size];
});
const buttonSize = computed(() => {
  const buttonType = props.icon === undefined ? 'base' : 'icon';
  let sizeClass = `v-button--${buttonType}--size-${props.size}`;

  if (buttonType === 'icon') sizeClass = `${sizeClass} v-button--icon`;

  return sizeClass;
});
const buttonVariant = computed(() => `v-button--${props.color}--${props.variant}`);
</script>

<style scoped>
.v-button {
  @apply relative w-fit rounded-lg border border-solid text-center font-medium transition-colors;
}

.v-button--icon {
  @apply rounded-full;
}

/* Sizes */
.v-button--base--size-xs {
  @apply px-3 py-1.5;
}

.v-button--icon--size-xs {
  @apply p-1.5;
}

.v-button--base--size-sm {
  @apply px-4 py-2;
}

.v-button--icon--size-sm {
  @apply p-2;
}

.v-button--base--size-base {
  @apply px-5 py-2.5;
}

.v-button--icon--size-base {
  @apply p-2.5;
}

.v-button--base--size-lg {
  @apply px-6 py-3;
}

.v-button--icon--size-lg {
  @apply p-3;
}

.v-button--base--size-lg {
  @apply px-8 py-4;
}

.v-button--icon--size-lg {
  @apply p-4;
}

/* Base variants */
.v-button--base--base {
  @apply border-base-700 bg-base-700 text-white hover:border-base-800 hover:bg-base-800 focus-visible:ring focus-visible:ring-base-200
  dark:hover:border-base-600 dark:hover:bg-base-600 dark:focus-visible:ring-base-800;
}

.v-button--primary--base {
  @apply border-primary-600 bg-primary-600 text-white hover:border-primary-500 hover:bg-primary-500 focus-visible:ring focus-visible:ring-primary-200
  dark:focus-visible:ring-primary-950;
}

.v-button--danger--base {
  @apply border-danger-600 bg-danger-600 text-white hover:border-danger-500 hover:bg-danger-500 focus-visible:ring focus-visible:ring-danger-200
  dark:focus-visible:ring-danger-950;
}

.v-button--success--base {
  @apply border-success-600 bg-success-600 text-white hover:border-success-500 hover:bg-success-500 focus-visible:ring focus-visible:ring-success-200
  dark:focus-visible:ring-success-950;
}

.v-button--warning--base {
  @apply border-warning-500 bg-warning-500 text-white hover:border-warning-400 hover:bg-warning-400 focus-visible:ring focus-visible:ring-warning-200
  dark:focus-visible:ring-warning-950;
}

.v-button--info--base {
  @apply border-info-600 bg-info-600 text-white hover:border-info-500 hover:bg-info-500 focus-visible:ring focus-visible:ring-info-200
  dark:focus-visible:ring-info-950;
}

/* Outline variants */
.v-button--base--outline {
  @apply border-base-500 bg-none text-base-700 hover:bg-base-100 focus-visible:ring focus-visible:ring-base-200
  dark:border-base-400 dark:text-base-200 dark:hover:bg-base-800 dark:focus-visible:ring-base-800;
}

.v-button--primary--outline {
  @apply border-primary-400 bg-none text-primary-600 hover:bg-primary-50 focus-visible:ring focus-visible:ring-primary-200
  dark:border-primary-800 dark:hover:bg-primary-950 dark:focus-visible:ring-primary-950;
}

.v-button--danger--outline {
  @apply border-danger-400 bg-none text-danger-600 hover:bg-danger-50 focus-visible:ring focus-visible:ring-danger-200
  dark:border-danger-800 dark:hover:bg-danger-950 dark:focus-visible:ring-danger-950;
}

.v-button--success--outline {
  @apply border-success-400 bg-none text-success-600 hover:bg-success-50 focus-visible:ring focus-visible:ring-success-200
  dark:border-success-800 dark:hover:bg-success-950 dark:focus-visible:ring-success-950;
}

.v-button--warning--outline {
  @apply border-warning-400 bg-none text-warning-600 hover:bg-warning-50 focus-visible:ring focus-visible:ring-warning-200
  dark:border-warning-800 dark:hover:bg-warning-950 dark:focus-visible:ring-warning-950;
}

.v-button--info--outline {
  @apply border-info-400 bg-none text-info-600 hover:bg-info-50 focus-visible:ring focus-visible:ring-info-200
  dark:border-info-800 dark:hover:bg-info-950 dark:focus-visible:ring-info-950;
}

/* Ghost variants */
.v-button--base--ghost {
  @apply border-base-200 bg-base-200 text-black hover:border-base-300 hover:bg-base-300 focus-visible:ring focus-visible:ring-base-300
  dark:border-base-800 dark:bg-base-800 dark:text-white dark:hover:border-base-700 dark:hover:bg-base-700 dark:focus-visible:ring-base-700;
}

.v-button--primary--ghost {
  @apply border-primary-100 bg-primary-100 text-primary-600 hover:border-primary-200 hover:bg-primary-200 focus-visible:ring focus-visible:ring-primary-200
  dark:border-primary-950 dark:bg-primary-950 dark:hover:border-primary-900 dark:hover:bg-primary-900 dark:focus-visible:ring-primary-900;
}

.v-button--danger--ghost {
  @apply border-danger-100 bg-danger-100 text-danger-600 hover:border-danger-200 hover:bg-danger-200 focus-visible:ring focus-visible:ring-danger-200
  dark:border-danger-950 dark:bg-danger-950 dark:hover:border-danger-900 dark:hover:bg-danger-900 dark:focus-visible:ring-danger-900;
}

.v-button--success--ghost {
  @apply border-success-100 bg-success-100 text-success-600 hover:border-success-200 hover:bg-success-200 focus-visible:ring focus-visible:ring-success-200
  dark:border-success-950 dark:bg-success-950 dark:hover:border-success-900 dark:hover:bg-success-900 dark:focus-visible:ring-success-900;
}

.v-button--warning--ghost {
  @apply border-warning-100 bg-warning-100 text-warning-600 hover:border-warning-200 hover:bg-warning-200 focus-visible:ring focus-visible:ring-warning-200
  dark:border-warning-950 dark:bg-warning-950 dark:hover:border-warning-900 dark:hover:bg-warning-900 dark:focus-visible:ring-warning-900;
}

.v-button--info--ghost {
  @apply border-info-100 bg-info-100 text-info-600 hover:border-info-200 hover:bg-info-200 focus-visible:ring focus-visible:ring-info-200
  dark:border-info-950 dark:bg-info-950 dark:hover:border-info-900 dark:hover:bg-info-900 dark:focus-visible:ring-info-900;
}

/* Plain variants */
.v-button--base--plain {
  @apply border-none bg-none text-base-600 hover:text-black focus-visible:text-black
  dark:text-base-400 dark:hover:text-white dark:focus-visible:text-white;
}

.v-button--primary--plain {
  @apply border-none bg-none text-primary-500 hover:text-primary-600 focus-visible:text-primary-600
  dark:text-primary-700 dark:hover:text-primary-600 dark:focus-visible:text-primary-600;
}

.v-button--danger--plain {
  @apply border-none bg-none text-danger-500 hover:text-danger-600 focus-visible:text-danger-600
  dark:text-danger-700 dark:hover:text-danger-600 dark:focus-visible:text-danger-600;
}

.v-button--success--plain {
  @apply border-none bg-none text-success-500 hover:text-success-600 focus-visible:text-success-600
  dark:text-success-700 dark:hover:text-success-600 dark:focus-visible:text-success-600;
}

.v-button--warning--plain {
  @apply border-none bg-none text-warning-400 hover:text-warning-500 focus-visible:text-warning-500
  dark:text-warning-700 dark:hover:text-warning-600 dark:focus-visible:text-warning-600;
}

.v-button--info--plain {
  @apply border-none bg-none text-info-500 hover:text-info-600 focus-visible:text-info-600
  dark:text-info-700 dark:hover:text-info-600 dark:focus-visible:text-info-600;
}

/* Text variants */
.v-button--base--text {
  @apply border-none bg-none p-0 text-black
  dark:text-white;
}

.v-button--primary--text {
  @apply border-none bg-none p-0 text-primary-600
  dark:text-primary-600;
}

.v-button--danger--text {
  @apply border-none bg-none p-0 text-danger-600
  dark:text-danger-600;
}

.v-button--success--text {
  @apply border-none bg-none p-0 text-success-600
  dark:text-success-600;
}

.v-button--warning--text {
  @apply border-none bg-none p-0 text-warning-500
  dark:text-warning-600;
}

.v-button--info--text {
  @apply border-none bg-none p-0 text-info-600
  dark:text-info-600;
}
</style>
