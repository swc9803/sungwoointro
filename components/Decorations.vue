<template>
  <div>
    <div id="de1" ref="deRef1" class="decorations" />
    <div id="de2" ref="deRef2" class="decorations" />
    <div id="de3" ref="deRef3" class="decorations" />
    <div id="de4" ref="deRef4" class="decorations" />
  </div>
</template>

<script setup>
const deRef1 = ref();
const deRef2 = ref();
const deRef3 = ref();
const deRef4 = ref();

defineExpose({ deRef1, deRef2, deRef3, deRef4 });
</script>

<style lang="scss" scoped>
.decorations {
  position: absolute;
}
#de1 {
  width: 100vw;
  height: 100px;
  background: rgb(12, 97, 12);
}
#de2 {
  right: 0;
  width: 100px;
  height: 100vh;
  background: rgb(5, 121, 5);
}
#de3 {
  bottom: 0;
  width: 100vw;
  height: 100px;
  background: rgb(2, 170, 2);
}
#de4 {
  width: 100px;
  height: 100vh;
  background: rgb(1, 70, 1);
}
</style>
