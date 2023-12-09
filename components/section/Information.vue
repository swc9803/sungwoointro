<template>
  <div class="container">
    <div @click="goToGit">
      <Github />
      <p>Github</p>
    </div>
    <div @click="goToCodepen">
      <Codepen />
      <p>Codepen</p>
    </div>
    <div @click="goToEmail">
      <Email />
      <p>Email</p>
    </div>
  </div>
</template>

<script setup>
import Github from "@/assets/svg/infoGithub.vue";
import Codepen from "@/assets/svg/infoCodepen.vue";
import Email from "@/assets/svg/infoEmail.vue";

const goToGit = () => {
  open("https://github.com/swc9803");
};
const goToCodepen = () => {
  open("https://codepen.io/swc9803/pens/public");
};
const goToEmail = () => {
  open("mailto:swc9803@gmail.com");
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  gap: 50px;
  padding: 50px 0;
  color: white;
  background: #222222;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-top: 10px;
    }
  }
}
</style>
