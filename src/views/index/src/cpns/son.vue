<template>
  <div class="son">
    {{ name }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<style lang="less" scoped></style>
