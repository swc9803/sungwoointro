<template>
  <div ref="containerRef" class="wrapper">
    <div ref="dragElRef" />
    <div class="core">
      <p>Front-end</p>
    </div>
    <div
      v-for="item in skills"
      :key="item.id"
      :ref="planetRef"
      class="planet"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <img :src="item.src" :alt="item.name" @load="onLoad" />
      <p>{{ item.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import VueLogo from "@/assets/img/skills/vue-logo.webp";
import TypescriptLogo from "@/assets/img/skills/ts-logo.webp";
import ReactLogo from "@/assets/img/skills/react-logo.webp";
import SassLogo from "@/assets/img/skills/sass-logo.webp";
import PiniaLogo from "@/assets/img/skills/pinia-logo.webp";

gsap.registerPlugin(Draggable);

const skills = [
  { name: "Vue/Nuxt", src: VueLogo },
  { name: "Typescript", src: TypescriptLogo },
  { name: "React", src: ReactLogo },
  { name: "Sass", src: SassLogo },
  { name: "Pinia", src: PiniaLogo },
];

const dragElRef = ref();
const containerRef = ref();
const planetArray = ref([]);
const planetRef = (el) => planetArray.value.push(el);

let dragAmount = -3000;
let planetGap = 520;
let startProgress;
let spin;
const progressLimit = gsap.utils.wrap(0, 1);

const onResize = () => {
  planetGap = Math.min(window.innerWidth / 1.8, 520);

  if (matchMedia("(max-width: 480px)").matches) {
    dragAmount = -1500; // 모바일 드래그 양 조절
  }

  if (spin) {
    gsap.killTweensOf(spin);
    spin.timeScale(0);
    startProgress = spin.progress();
  }

  spin = gsap.fromTo(
    planetArray.value,
    {
      rotationY: (i) => (i * 360) / planetArray.value.length,
    },
    {
      rotationY: "+=360",
      transformOrigin: `50% 50% ${-planetGap}px`,
      duration: 50,
      ease: "none",
      repeat: -1,
    },
  );
  Draggable.create(dragElRef.value, {
    trigger: containerRef.value,
    allowNativeTouchScrolling: true,
    onPress() {
      gsap.killTweensOf(spin);
      spin.timeScale(0); // 애니메이션 중지
      startProgress = spin.progress();
    },
    onDrag() {
      const currentProgress =
        startProgress + (this.startX - this.x) / dragAmount;
      spin.progress(progressLimit(currentProgress));
    },
    onRelease() {
      if (!this.tween || !this.tween.isActive()) {
        gsap.to(spin, { timeScale: 1, duration: 1 });
      }
    },
  });
};

const onMouseEnter = () => {
  gsap.killTweensOf(spin);
  spin.timeScale(0);
};
const onMouseLeave = () => {
  gsap.to(spin, { timeScale: 1, duration: 1 });
};

onMounted(() => {
  planetArray.value.reverse();
  onResize();
  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 250px; // 시점
  transform-style: preserve-3d;
  perspective: 1200px;
  .core {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateZ(-300px);
    border-radius: 50%;
    width: 200px;
    height: 200px;
    background: white;
    filter: drop-shadow(0 0 1em #ffffff);
    p {
      color: rgb(122, 122, 184);
      font-size: 2em;
      font-weight: 900;
    }
  }
  .planet {
    position: absolute;
    width: 20%;
    cursor: pointer;
    transition: filter 0.5s;
    &:hover {
      filter: drop-shadow(0 0 1em #ffffff);
      img {
        filter: brightness(30%);
      }
      p {
        opacity: 1;
      }
    }
    img {
      position: relative;
      width: 100%;
      object-fit: cover;
      pointer-events: none;
      transition: filter 0.5s;
    }
    p {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      color: white;
      font-size: 2em;
      font-weight: 700;
      opacity: 0;
      transition: opacity 0.5s;
    }
  }
}
</style>
