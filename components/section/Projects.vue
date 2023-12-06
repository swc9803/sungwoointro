<template>
  <div class="container">
    <h1>Projects</h1>
    <div class="projects-container">
      <div v-for="item in projects" :key="item.id" class="projects-wrapper">
        <p class="title">{{ item.title }}</p>
        <div class="project-flex">
          <div class="img-wrapper">
            <img :src="item.src" :alt="item.title" />
          </div>
          <div class="text-wrapper">
            <p class="description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tommy from "@/assets/img/projects/amazing.webp";
import Lotteria from "@/assets/img/projects/lotteria.webp";
import Gallery from "@/assets/img/projects/gallery.webp";
import Wemix from "@/assets/img/projects/wemix.webp";
import Review from "@/assets/img/projects/review.webp";
import Old from "@/assets/img/projects/old.webp";

const projects = [
  {
    title: "Tommy Future",
    path: "",
    src: Tommy,
    description: "설명 1",
    skills: {},
  },
  {
    title: "Lotteria Font",
    path: "",
    src: Lotteria,
    description: "설명 1",
    skills: {},
  },
  {
    title: "Introduce Site",
    path: "",
    src: Gallery,
    description: "설명 1",
    skills: {},
  },
  {
    title: "Sungwoo's Gallery",
    path: "",
    src: Gallery,
    description: "설명 1",
    skills: {},
  },
  {
    title: "Wemix3.0 Linked with Screen Site",
    path: "",
    src: Wemix,
    description: "설명 1",
    skills: {},
  },
  {
    title: "Review Site",
    path: "",
    src: Review,
    description: "설명 1",
    skills: {},
  },
  {
    title: "Old Portfolio",
    path: "",
    src: Old,
    description: "설명 1",
    skills: {},
  },
];
</script>

<style lang="scss" scoped>
.container {
  background: black;
  @media (max-width: 1240px) {
    padding: 20px 20px;
  }
  h1 {
    text-align: center;
    margin-bottom: 50px;
    color: white;
  }
  .projects-container {
    display: flex;
    flex-direction: column;
    gap: 50px;
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    border-radius: 1em;
    background: rgb(240, 240, 240);
    .projects-wrapper {
      margin: 40px;
      padding: 20px;
      background: rgb(255, 255, 255);
      .title {
        text-align: center;
        margin-bottom: 40px;
        font-size: 2em;
        font-weight: 900;
      }
      .project-flex {
        display: flex;
        gap: 40px;
        @media (max-width: 768px) {
          flex-direction: column;
        }
        .img-wrapper {
          flex: 2;
          img {
            width: 100%;
            max-height: 250px;
            object-fit: contain;
            // background: black;
          }
        }
        .text-wrapper {
          flex: 3;
          .description {
            font-size: 1.25em;
          }
        }
      }
    }
  }
}
</style>
