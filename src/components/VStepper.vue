<template>
  <div class="flex h-full flex-col gap-y-3">
    <div class="flex max-w-sm gap-x-4">
      <span
        v-for="step in steps"
        :key="step.identifier"
        class="block h-1 w-16 flex-shrink-0 rounded-full transition-all"
        :class="{
          'flex-grow bg-primary-600': step.identifier === activeStep,
          'flex-grow-0 bg-primary-300 dark:bg-primary-800': step.identifier !== activeStep,
        }"
      />
    </div>
    <div>
      <slot
        name="default"
        :currentStep="activeStep"
      />
    </div>
    <div class="my-4 flex-grow">
      <TransitionGroup :name="transitionDirection">
        <div
          v-for="step in props.steps"
          :key="step.identifier"
          v-show="activeStep === step.identifier"
        >
          <div v-if="activeStep === step.identifier || step.eager">
            <slot :name="`step-${step.identifier}`" />
          </div>
        </div>
      </TransitionGroup>
    </div>
    <div class="flex justify-end gap-x-4">
      <slot
        name="actions"
        :prevStep="prev"
        :nextStep="next"
        :currentStep="activeStep"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface IStepperStep {
  identifier: string;
  eager?: boolean;
}

export interface IStepperProps {
  steps: IStepperStep[];
}

const props = defineProps<IStepperProps>();

const activeStep = ref(props.steps[0].identifier);
const transitionDirection = ref('v-stepper-next');

const activeStepIndex = computed(() => props.steps.findIndex((step) => step.identifier === activeStep.value));

function next(): void {
  if (activeStepIndex.value >= props.steps.length - 1) return;

  transitionDirection.value = 'v-stepper-next';
  activeStep.value = props.steps[activeStepIndex.value + 1].identifier;
}

function prev(): void {
  if (activeStepIndex.value <= 0) return;

  transitionDirection.value = 'v-stepper-prev';
  activeStep.value = props.steps[activeStepIndex.value - 1].identifier;
}
</script>

<style scoped>
.v-stepper-next-enter-active,
.v-stepper-next-leave-active,
.v-stepper-prev-enter-active,
.v-stepper-prev-leave-active {
  @apply transition-all duration-300;
}

.v-stepper-next-enter-from {
  @apply translate-x-5 opacity-0;
}

.v-stepper-next-leave-to {
  @apply -translate-x-5 opacity-0;
}

.v-stepper-prev-enter-from {
  @apply -translate-x-5 opacity-0;
}

.v-stepper-prev-leave-to {
  @apply translate-x-5 opacity-0;
}
</style>
