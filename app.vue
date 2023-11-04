<template>
  <div ref="containerRef" class="container" @mousemove="onMouseMove">
    <Morphing />
    <Open ref="circleRef" />
    <Decorations ref="decorationRef" />
  </div>
</template>

<script setup>
import gsap from "gsap";
import Morphing from "@/components/Morphing.vue";
import Open from "@/components/Open.vue";
import Decorations from "@/components/Decorations.vue";

const containerRef = ref();

const circleRef = ref();

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
  // open
  gsap.from(circleRef.value.circleRef, {
    duration: 4,
    scale: 0,
    ease: "power2.out",
    // delay: 3.5,
    delay: 10,
    onComplete: () => {
      containerRef.value.style.background = "#ffffff";
      containerRef.value.style.filter = "contrast(25) blur(1px)";
    },
  });

  // decoration
  const { deRef1, deRef2, deRef3, deRef4 } = decorationRef.value;
  decorationArr.value.push(deRef1, deRef2, deRef3, deRef4);

  onResize();
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss">
.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 101%;
  height: calc(var(--vh) * 101);
  background: #000000;
  filter: contrast(25) blur(1px);
  z-index: 1;
}
</style>
