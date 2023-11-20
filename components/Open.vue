<template>
  <div class="circle-container">
    <div ref="circleRef1" class="circle" />
    <div ref="circleRef2" class="circle" />
  </div>
</template>

<script setup>
import gsap from "gsap";

const circleRef1 = ref();
const circleRef2 = ref();

onMounted(() => {
  gsap.from([circleRef1.value, circleRef2.value], {
    duration: 4,
    scale: 0,
    ease: "power2.out",
    delay: 7,
  });
});
</script>

<style lang="scss" scoped>
.circle-container {
  position: fixed;
  width: 100%;
  height: calc(var(--vh) * 100);
  .circle {
    position: absolute;
    width: 300%;
    padding-bottom: 300%;
    background: white;
    border-radius: 50%;
    z-index: 2;
    &:nth-child(1) {
      top: 0;
      left: 0;
      transform: translate3d(-50%, -50%, 0);
    }
    &:nth-child(2) {
      bottom: 0;
      right: 0;
      transform: translate3d(50%, 50%, 0);
    }
  }
}
</style>
