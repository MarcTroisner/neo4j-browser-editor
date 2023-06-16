<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      {
        'pointer-events-none opacity-60': disabled,
        'pointer-events-none': loading,
      },
      setButtonIconType,
      setButtonSize,
      setButtonColorAndVariant,
    ]"
  >
    <div
      :class="[
        'flex items-center gap-1',
        {
          'flex-row': !stacked,
          'flex-col': stacked,
          invisible: loading,
        },
      ]"
    >
      <!-- Prepend icon -->
      <OhVueIcon
        v-if="prependIcon && icon === undefined"
        :name="prependIcon"
        :scale="setIconSize"
      />
      <!-- Main content -->
      <p v-if="icon === undefined">{{ text }}</p>
      <OhVueIcon
        v-else
        :name="icon"
        :scale="setIconSize"
      />
      <!-- Append icon -->
      <OhVueIcon
        v-if="appendIcon && icon === undefined"
        :name="appendIcon"
        :scale="setIconSize"
      />
    </div>
    <!-- Loading state -->
    <div
      v-if="loading"
      class="absolute left-1/2 top-1/2 z-10 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center"
    >
      <OhVueIcon
        class="animate-spin"
        name="ri-loader-5-line"
        :scale="setIconSize"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';

export interface IProps {
  color?: 'base' | 'primary' | 'error' | 'success' | 'warning';
  type?: 'submit' | 'reset' | 'button';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  variant?: 'base' | 'outline' | 'tonal' | 'plain';
  prependIcon?: string;
  appendIcon?: string;
  icon?: string;
  stacked?: boolean;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
}

const BUTTON_SIZES = {
  xs: 0.8,
  sm: 0.9,
  base: 1,
  lg: 1.1,
  xl: 1.2,
};

const props = withDefaults(defineProps<IProps>(), {
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

const setButtonSize = computed<string>(() => {
  if (props.icon) return `v-button--icon-${props.size}`;
  return `v-button--${props.size}`;
});
const setButtonColorAndVariant = computed<string>(() => `v-button--${props.color}-${props.variant}`);
const setButtonIconType = computed<string>(() => {
  if (props.icon) return 'v-button--icon';
  return 'v-button';
});
const setIconSize = computed<number>(() => BUTTON_SIZES[props.size]);
</script>

<style scoped>
.v-button {
  @apply relative w-fit rounded-lg border border-solid font-medium uppercase transition-colors focus-visible:ring;
}

.v-button--icon {
  @apply relative w-fit rounded-full border border-solid transition-colors focus-visible:ring;
}

/* Button sizes */
.v-button--xs {
  @apply p-4 px-3 py-1.5 text-xs;
}

.v-button--sm {
  @apply px-4 py-2 text-sm;
}

.v-button--base {
  @apply px-5 py-2.5 text-sm;
}

.v-button--lg {
  @apply px-6 py-3 text-base;
}

.v-button--xl {
  @apply px-8 py-4 text-lg;
}

.v-button--icon-xs {
  @apply p-1.5;
}

.v-button--icon-sm {
  @apply p-2;
}

.v-button--icon-base {
  @apply p-2.5;
}

.v-button--icon-lg {
  @apply p-3;
}

.v-button--icon-xl {
  @apply p-4;
}

/* Button primary variants */
.v-button--primary-base {
  @apply border-primary-600 bg-primary-600 text-white hover:border-primary-700 hover:bg-primary-700 focus-visible:ring-primary-200;
}

.v-button--primary-outline {
  @apply border-primary-600 text-primary-600 hover:bg-primary-50 focus-visible:ring-primary-200
  dark:hover:bg-primary-1000 dark:focus-visible:ring-primary-900;
}

.v-button--primary-tonal {
  @apply border-primary-100 bg-primary-100 text-primary-600 hover:border-primary-200 hover:bg-primary-200 focus-visible:ring-primary-200
  dark:border-primary-950 dark:bg-primary-950 dark:hover:bg-primary-900 dark:focus-visible:ring-primary-800;
}

.v-button--primary-plain {
  @apply border-transparent text-primary-400 ring-transparent hover:text-primary-600 focus-visible:text-primary-600
  dark:text-primary-800 dark:hover:text-primary-600 dark:focus-visible:text-primary-600;
}

/* Button base variants */
.v-button--base-base {
  @apply border-base-500 bg-base-500 text-white hover:border-base-600 hover:bg-base-600 focus-visible:ring-base-200
  dark:border-base-700 dark:bg-base-700 dark:text-base-600 dark:hover:border-base-600 dark:hover:bg-base-600
  dark:focus-visible:ring-base-800;
}

.v-button--base-outline {
  @apply border-base-500 text-base-500 hover:bg-base-150 focus-visible:ring-base-200
   dark:hover:bg-base-850 dark:focus-visible:ring-base-800;
}

.v-button--base-tonal {
  @apply border-base-100 bg-base-100 text-base-500 hover:border-base-200 hover:bg-base-200 focus-visible:ring-base-200
  dark:border-base-850 dark:bg-base-850 dark:hover:bg-base-800 dark:focus-visible:ring-base-800;
}

.v-button--base-plain {
  @apply border-transparent text-base-400 ring-transparent hover:text-base-500 focus-visible:text-base-600
  dark:text-base-600 dark:hover:text-base-500 dark:focus-visible:text-base-500;
}

/* Button error variants */
.v-button--error-base {
  @apply border-error-600 bg-error-600 text-white hover:border-error-700 hover:bg-error-700 focus-visible:ring-error-200;
}

.v-button--error-outline {
  @apply border-error-600 text-error-600 hover:bg-error-50 focus-visible:ring-error-200
  dark:hover:bg-error-1000 dark:focus-visible:ring-error-900;
}

.v-button--error-tonal {
  @apply border-error-100 bg-error-100 text-error-600 hover:border-error-200 hover:bg-error-200 focus-visible:ring-error-200
  dark:border-error-950 dark:bg-error-950 dark:hover:bg-error-900 dark:focus-visible:ring-error-800;
}

.v-button--error-plain {
  @apply border-transparent text-error-400 ring-transparent hover:text-error-600 focus-visible:text-error-600
  dark:text-error-800 dark:hover:text-error-600 dark:focus-visible:text-error-600;
}

/* Button warning variants */
.v-button--warning-base {
  @apply border-warning-600 bg-warning-600 text-white hover:border-warning-700 hover:bg-warning-700 focus-visible:ring-warning-200;
}

.v-button--warning-outline {
  @apply border-warning-600 text-warning-600 hover:bg-warning-50 focus-visible:ring-warning-200
  dark:hover:bg-warning-1000 dark:focus-visible:ring-warning-900;
}

.v-button--warning-tonal {
  @apply border-warning-100 bg-warning-100 text-warning-600 hover:border-warning-200 hover:bg-warning-200 focus-visible:ring-warning-200
  dark:border-warning-950 dark:bg-warning-950 dark:hover:bg-warning-900 dark:focus-visible:ring-warning-800;
}

.v-button--warning-plain {
  @apply border-transparent text-warning-400 ring-transparent hover:text-warning-600 focus-visible:text-warning-600
  dark:text-warning-800 dark:hover:text-warning-600 dark:focus-visible:text-warning-600;
}

/* Button success variants */
.v-button--success-base {
  @apply border-success-600 bg-success-600 text-white hover:border-success-700 hover:bg-success-700 focus-visible:ring-success-200;
}

.v-button--success-outline {
  @apply border-success-600 text-success-600 hover:bg-success-50 focus-visible:ring-success-200
  dark:hover:bg-success-1000 dark:focus-visible:ring-success-900;
}

.v-button--success-tonal {
  @apply border-success-100 bg-success-100 text-success-600 hover:border-success-200 hover:bg-success-200 focus-visible:ring-success-200
  dark:border-success-950 dark:bg-success-950 dark:hover:bg-success-900 dark:focus-visible:ring-success-800;
}

.v-button--success-plain {
  @apply border-transparent text-success-400 ring-transparent hover:text-success-600 focus-visible:text-success-600
  dark:text-success-800 dark:hover:text-success-600 dark:focus-visible:text-success-600;
}
</style>
