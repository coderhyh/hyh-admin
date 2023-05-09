<template>
  <el-icon :size="size || 12">
    <i :class="className" />
  </el-icon>
</template>

<script setup lang="ts">
import '~/assets/icons'
const props = defineProps<{
  icon?: string | unknown
  size?: string
}>()

const className = computed(() => {
  const { icon } = props
  return [icon || 'carbon:unknown']
})
</script>

<style scoped></style>
