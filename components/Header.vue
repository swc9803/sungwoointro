<template>
  <header>
    <p>logo</p>
    <ul>
      <li v-for="item in categories" :key="item.id">{{ item.name }}</li>
    </ul>
  </header>
</template>

<script setup>
const categories = [
  { name: "Skills" },
  { name: "Projects" },
  { name: "Contact" },
];
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  color: white;
  background: transparent;
  z-index: 1;
  ul {
    display: flex;
    gap: 20px;
    list-style: none;
  }
}
</style>
