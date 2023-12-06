<template>
  <div class="app">
    <Header />
    <Intro />
    <Skills />
    <Projects />
    <Information />
    <Indicator />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Intro from "./components/section/Intro.vue";
import Skills from "./components/section/Skills.vue";
import Projects from "./components/section/Projects.vue";
import Information from "./components/section/Information.vue";
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
