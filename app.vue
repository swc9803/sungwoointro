<template>
  <div class="container" @mousemove="onMouseMove">
    <Decorations ref="decorationRef" />
  </div>
</template>

<script setup>
import Decorations from "@/components/Decorations.vue";

const decorationRef = ref();

const onMouseMove = (e) => {
  decorationRef.value.deRef1.style.top = `${e.clientY / 100}px`;

  decorationRef.value.deRef2.style.right = `${e.clientX / 100}px`;

  decorationRef.value.deRef3.style.bottom = `${e.clientY / 100}px`;

  decorationRef.value.deRef4.style.left = `${e.clientX / 100}px`;
  // 가운데가 최댓값이 되도록 수정 필요
};

const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss">
.container {
  width: 100%;
  height: calc(var(--vh) * 100);
}
</style>
