<template>
  <div class="app">
    <Header />
    <Section1 />
    <Section2 />
    <Indicator />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Section1 from "./components/Section1.vue";
import Section2 from "./components/Section2.vue";
import Indicator from "./components/Indicator.vue";
const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onMounted(() => {
  // console.clear();

  onResize();
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss">
// .app {
// }
</style>
