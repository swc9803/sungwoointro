<template>
  <div ref="circleRef" class="circle" />
</template>

<script setup>
const circleRef = ref();

defineExpose({ circleRef });
</script>

<style lang="scss" scoped>
.circle {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 300%;
  padding-bottom: 300%;
  background: white;
  border-radius: 50%;
  z-index: 2;
}
</style>
