<template>
  <div>
    <p v-for="item in projects" :key="item.id">{{ item.name }}</p>
  </div>
  <!-- 3d 슬라이드? -->
</template>

<script setup>
const projects = [
  { name: "blender" },
  { name: "vue" },
  { name: "nuxt" },
  { name: "react" },
  { name: "scss" },
  { name: "gsap" },
  { name: "three.js" },
  { name: "pixi.js" },
  { name: "figma" },
  { name: "firebase" },
  { name: "postman" },
];
</script>

<style lang="scss" scoped></style>
