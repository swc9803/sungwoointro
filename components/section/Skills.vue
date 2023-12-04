<template>
  <div class="logo-container">
    <div v-for="item in skills" :key="item.id" class="logo-wrapper">
      <img :src="item.src" :alt="item.src" />
    </div>
  </div>
  <!-- stagger scale bounce -->
</template>

<script setup>
import VueLogo from "@/assets/img/logo/vue-logo.webp";
import TypescriptLogo from "@/assets/img/logo/ts-logo.webp";
import ReactLogo from "@/assets/img/logo/react-logo.webp";
import GitLogo from "@/assets/img/logo/git-logo.webp";
import SassLogo from "@/assets/img/logo/sass-logo.webp";
import PiniaLogo from "@/assets/img/logo/pinia-logo.webp";
import FirebaseLogo from "@/assets/img/logo/firebase-logo.webp";
import ThreeLogo from "@/assets/img/logo/three-logo.webp";
import GsapLogo from "@/assets/img/logo/gsap-logo.webp";
import PostmanLogo from "@/assets/img/logo/postman-logo.webp";
import FigmaLogo from "@/assets/img/logo/figma-logo.webp";
import BlenderLogo from "@/assets/img/logo/blender-logo.webp";

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
</script>

<style lang="scss" scoped>
.logo-container {
  display: grid;
  justify-content: space-around;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  .logo-wrapper {
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
}
</style>
