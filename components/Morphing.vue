<template>
  <div>
    <p v-for="item in introText" :key="item.id" :ref="wordRef" class="word">
      {{ item.text }}
    </p>
  </div>
</template>

<script setup>
import gsap from "gsap";

const wordArray = ref([]);
const wordRef = (el) => wordArray.value.push(el);

const introText = [
  { text: "Creative" },
  { text: "Interactive" },
  { text: "Web Developer" },
];

const wordTl = gsap.timeline();
onMounted(() => {
  wordTl.from(wordArray.value[0], {
    filter: "blur(1em)",
    opacity: 0,
    duration: 1,
  });
  wordTl.to(wordArray.value[0], {
    y: "-50vh",
    duration: 1,
    ease: "power3.in",
  });
  wordTl.from(wordArray.value[1], {
    filter: "blur(1em)",
    opacity: 0,
    duration: 1,
  });
  wordTl.to(wordArray.value[1], {
    y: "-50vh",
    duration: 1,
    ease: "power3.in",
  });
  wordTl.from(wordArray.value[2], {
    filter: "blur(1em)",
    opacity: 0,
    duration: 1,
  });
  wordTl.to(wordArray.value[2], {
    y: "-50vh",
    duration: 1,
    ease: "power3.in",
  });
});
</script>

<style lang="scss" scoped>
.word {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #ffffff;
  font-size: 5vw;
  font-weight: 900;
  // filter: blur(1em);
  // opacity: 0;
  // animation: word 3s forwards ease-in-out;
  // @for $i from 1 through 3 {
  //   &:nth-child(#{$i}) {
  //     animation-delay: $i + 0s;
  //   }
  // }
  // @keyframes word {
  //   0% {
  //     filter: blur(1em);
  //     opacity: 0;
  //   }
  //   50% {
  //     filter: blur(0);
  //     opacity: 1;
  //   }
  //   100% {
  //     filter: blur(1em);
  //     opacity: 0;
  //   }
  // }
}
</style>
