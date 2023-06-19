<template>
  <slot name="header" />
  <slot name="default" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'VAccordionItem',
});
</script>
