<template>
  <el-icon :size="size || 12">
    <i :class="className" />
  </el-icon>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon?: string | unknown
  size?: string
}>()

const className = computed(() => {
  const { icon } = props
  return [icon || 'carbon:unknown']
})
const icons = [
  'clarity:dashboard-solid',
  'mdi:cog',
  'material-symbols:settings-account-box',
  'pixelarticons:book-open',
  'medical-icon:i-physical-therapy'
]
</script>

<style scoped></style>
