<template>
  <div class="aoo">
    <!-- <Morphing />
    <Open /> -->
    <TunnelScroll />
  </div>
</template>

<script setup>
// import Morphing from "@/components/Morphing.vue";
// import Open from "@/components/Open.vue";
import TunnelScroll from "@/components/TunnelScroll.vue";

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
.app {
  position: fixed;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #151515;
  z-index: 1;
}
</style>
