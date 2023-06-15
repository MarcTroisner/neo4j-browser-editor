import type { ZodSchema } from 'zod';
import type { ComputedRef } from 'vue';

import { cloneDeep } from 'lodash';
import { watchDebounced } from '@vueuse/core';
import { ref, reactive, computed, onUnmounted } from 'vue';

interface IUseValidationField {
  [key: string]: any;
  value: any;
  validator: ZodSchema | null;
  errors: string[];
}

// Cross-component state for storing all validation fields
const validationState = reactive<Record<string, IUseValidationField>>({});

/**
 * Validation composable for sharing validation state of nested components and validation input fields.
 *
 * @export
 * @param {Record<string, any>} [state] - Reactive object where a key represents a input field to be validated.
 * @param {Record<string, ZodSchema>} [validators] -  Validators associated with input fields. The validator key `must match the state key.
 * @return {ComputedRef<Record<string, IUseValidationField>>} - Validation state with current values and errors
 */
export function useValidation(
  state?: Record<string, any>,
  validators?: Record<string, ZodSchema>
): ComputedRef<Record<string, IUseValidationField>> {
  if (state) {
    Object.keys(state).forEach((field) => {
      validationState[field] = {
        value: state[field],
        validator: validators && validators[field] ? validators[field] : null,
        errors: [],
      };
    });
  }

  const getWatchableState = computed<Record<string, any>>(() => {
    const watchableState = reactive<Record<string, any>>({});

    if (state == null) return watchableState;

    Object.keys(state).forEach((field) => {
      watchableState[field] = ref(state[field]);
    });

    return watchableState;
  });

  const getReadOnlyState = computed<Record<string, IUseValidationField>>(() =>
    cloneDeep(validationState)
  );

  function checkValidationState(field: string): void {
    const { value, validator } = validationState[field];

    // Check if validator has been defined, if not skip field
    if (validator === null) return;

    const validationResult = validator.safeParse(value);

    if (!validationResult.success) {
      const formatted = validationResult.error.format();
      validationState[field].errors = formatted._errors;
    } else {
      validationState[field].errors = [];
    }
  }

  // Debounce watcher for overall better performance
  watchDebounced(
    getWatchableState,
    (watchState) => {
      Object.keys(watchState).forEach((field) => {
        validationState[field].value = watchState[field];

        checkValidationState(field);
      });
    },
    {
      debounce: 150,
      maxWait: 350,
    }
  );

  onUnmounted(() => {
    if (state == null) return;

    // Clean up state when unmounting component
    Object.keys(state).forEach((field) => {
      delete validationState[field];
    });
  });

  return getReadOnlyState;
}
