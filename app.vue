<template>
  <div class="container" @mousemove="onMouseMove">
    <Decorations ref="decorationRef" />
  </div>
</template>

<script setup>
import gsap from "gsap";
import Decorations from "@/components/Decorations.vue";

const decorationRef = ref();
const decorationArr = ref([]);

const mouse = reactive({
  x: 0,
  y: 0,
});

const onMouseMove = (e) => {
  mouse.x = e.pageX - window.innerWidth / 2;
  mouse.y = e.pageY - window.innerHeight / 2;
  const imgX = (mouse.x / window.innerWidth) * 50;
  const imgY = (mouse.y / window.innerHeight) * 50;
  gsap.to(decorationArr.value, {
    x: imgX,
    y: imgY,
    duration: 1,
    ease: "power.in",
  });
};

const onResize = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
onMounted(() => {
  const { deRef1, deRef2, deRef3, deRef4 } = decorationRef.value;
  decorationArr.value.push(deRef1, deRef2, deRef3, deRef4);

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
