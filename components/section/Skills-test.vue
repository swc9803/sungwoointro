<template>
  <div ref="containerRef" class="container">
    <div class="text-wrapper">
      <h1 ref="text1">S</h1>
      <h1 ref="text2">K</h1>
      <h1 ref="text3">I</h1>
      <h1 ref="text4">L</h1>
      <h1 ref="text5">L</h1>
      <h1 ref="text6">S</h1>
    </div>
    <div class="logo-container">
      <Front />
      <Etc />
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Front from "@/components/section/skills/Front.vue";
import Etc from "@/components/section/skills/Etc.vue";

// import VueLogo from "@/assets/img/skills/vue-logo.webp";
// import TypescriptLogo from "@/assets/img/skills/ts-logo.webp";
// import ReactLogo from "@/assets/img/skills/react-logo.webp";
// import GitLogo from "@/assets/img/skills/git-logo.webp";
// import SassLogo from "@/assets/img/skills/sass-logo.webp";
// import PiniaLogo from "@/assets/img/skills/pinia-logo.webp";
// import FirebaseLogo from "@/assets/img/skills/firebase-logo.webp";
// import ThreeLogo from "@/assets/img/skills/three-logo.webp";
// import GsapLogo from "@/assets/img/skills/gsap-logo.webp";
// import PostmanLogo from "@/assets/img/skills/postman-logo.webp";
// import FigmaLogo from "@/assets/img/skills/figma-logo.webp";
// import BlenderLogo from "@/assets/img/skills/blender-logo.webp";

gsap.registerPlugin(ScrollTrigger);

const text1 = ref();
const text2 = ref();
const text3 = ref();
const text4 = ref();
const text5 = ref();
const text6 = ref();

// const skills = [
//   { name: "Vue/Nuxt", src: VueLogo },
//   { name: "Typescript", src: TypescriptLogo },
//   { name: "React", src: ReactLogo },
//   { name: "Git", src: GitLogo },
//   { name: "Sass", src: SassLogo },
//   { name: "Pinia", src: PiniaLogo },
//   { name: "Firebase", src: FirebaseLogo },
//   { name: "Three.js", src: ThreeLogo },
//   { name: "Gsap", src: GsapLogo },
//   { name: "Postman", src: PostmanLogo },
//   { name: "Figma", src: FigmaLogo },
//   { name: "Blender", src: BlenderLogo },
// ];

const containerRef = ref();

// const loadedImgCount = ref(0);
// const onLoad = () => {
//   loadedImgCount.value++;
//   if (loadedImgCount.value > 11) {
//     gsap.from(
//       [
//         text1.value,
//         text2.value,
//         text3.value,
//         text4.value,
//         text5.value,
//         text6.value,
//       ],
//       {
//         scrollTrigger: {
//           trigger: containerRef.value,
//           start: "start 60%",
//         },
//         opacity: 0,
//         y: -100,
//         stagger: 0.1,
//         duration: 1,
//         ease: "bounce",
//         onComplete: () => {
//           gsap.to(skillArray.value, {
//             opacity: 1,
//             scale: 1,
//             ease: "back",
//             stagger: 0.1,
//             duration: 1.2,
//           });
//         },
//       },
//     );
//   }
// };
</script>

<style lang="scss" scoped>
$colors: #c8ffcd, #c2e6ff, #bffff4, #ffd9d2, #ffe3fc, #feffd0, #f7ffc7, #ffffff,
  #bfffcd, #ffdfcd, #f6f6f6, #ffe5bf;

.container {
  padding: 60px 0 100px 0;
  background: #111111;
  @media (max-width: 1240px) {
    padding: 60px 20px;
  }
  .text-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 80px;
    h1 {
      color: white;
      font-weight: 900;
    }
  }
  .logo-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
  }
}
</style>
