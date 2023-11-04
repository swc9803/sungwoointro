<template>
  <div class="morphing">
    <p v-for="item in introText" :key="item.id" class="word">
      {{ item.text }}
    </p>
  </div>
</template>

<script setup>
const introText = [
  { text: "Creative" },
  { text: "Interactive" },
  { text: "Web Developer" },
];
</script>

<style lang="scss" scoped>
.morphing {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 101%;
  height: 101vh;
  background: #000000;
  filter: contrast(25) blur(1px);
  z-index: 1;
  .word {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 5vw;
    font-weight: 900;
    animation: word 7s infinite ease-in-out;
    @for $i from 1 through 3 {
      &:nth-child(#{$i}) {
        animation-delay: $i - 7s;
      }
    }
    @keyframes word {
      0%,
      5%,
      100% {
        filter: blur(0);
        opacity: 1;
      }
      20%,
      80% {
        filter: blur(1em);
        opacity: 0;
      }
    }
  }
}
</style>
