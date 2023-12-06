<template>
  <div class="container">
    <h1>Skills</h1>
    <div ref="containerRef" class="logo-container">
      <div
        v-for="item in skills"
        :ref="skillRef"
        :key="item.id"
        class="logo-wrapper"
      >
        <img :src="item.src" :alt="item.name" @load="onLoad" />
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import VueLogo from "@/assets/img/skills/vue-logo.webp";
import TypescriptLogo from "@/assets/img/skills/ts-logo.webp";
import ReactLogo from "@/assets/img/skills/react-logo.webp";
import GitLogo from "@/assets/img/skills/git-logo.webp";
import SassLogo from "@/assets/img/skills/sass-logo.webp";
import PiniaLogo from "@/assets/img/skills/pinia-logo.webp";
import FirebaseLogo from "@/assets/img/skills/firebase-logo.webp";
import ThreeLogo from "@/assets/img/skills/three-logo.webp";
import GsapLogo from "@/assets/img/skills/gsap-logo.webp";
import PostmanLogo from "@/assets/img/skills/postman-logo.webp";
import FigmaLogo from "@/assets/img/skills/figma-logo.webp";
import BlenderLogo from "@/assets/img/skills/blender-logo.webp";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Vue/Nuxt", src: VueLogo },
  { name: "Typescript", src: TypescriptLogo },
  { name: "React", src: ReactLogo },
  { name: "Git", src: GitLogo },
  { name: "Sass", src: SassLogo },
  { name: "Pinia", src: PiniaLogo },
  { name: "Firebase", src: FirebaseLogo },
  { name: "Three.js", src: ThreeLogo },
  { name: "Gsap", src: GsapLogo },
  { name: "Postman", src: PostmanLogo },
  { name: "Figma", src: FigmaLogo },
  { name: "Blender", src: BlenderLogo },
];

const containerRef = ref();

const skillArray = ref([]);
const skillRef = (el) => skillArray.value.push(el);

const loadedImgCount = ref(0);
const onLoad = () => {
  loadedImgCount.value++;
  if (loadedImgCount.value > 11) {
    gsap.from(skillArray.value, {
      scrollTrigger: {
        trigger: containerRef.value,
        start: "start 60%",
      },
      opacity: 0,
      scale: 0,
      ease: "back",
      stagger: 0.1,
      duration: 1.2,
    });
  }
};
</script>

<style lang="scss" scoped>
$colors: #c8ffcd, #c2e6ff, #bffff4, #ffd9d2, #ffe3fc, #feffd0, #f7ffc7, #ffffff,
  #bfffcd, #ffdfcd, #f6f6f6, #ffe5bf;

.container {
  padding: 20px 0;
  background: #111111;
  @media (max-width: 1240px) {
    padding: 20px 20px;
  }
  h1 {
    text-align: center;
    margin-bottom: 50px;
    color: white;
  }
  .logo-container {
    display: grid;
    justify-content: space-around;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    .logo-wrapper {
      position: relative;
      border-radius: 50%;
      overflow: hidden;
      transition: filter 0.5s;
      @for $i from 1 through length($colors) {
        &:nth-child(#{$i}):hover {
          filter: drop-shadow(0 0 1em nth($colors, $i));
          img {
            filter: brightness(30%);
          }
          p {
            opacity: 1;
          }
        }
      }
      img {
        width: 100%;
        transition: filter 0.5s;
      }
      p {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        color: white;
        font-size: 1.5em;
        font-weight: 700;
        letter-spacing: 0.2em;
        opacity: 0;
        transition: opacity 0.5s;
      }
    }
  }
}
</style>
