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
            <p class="sub-title">{{ item.subTitle }}</p>
            <p class="description">{{ item.description }}</p>
            <div class="svg-wrapper">
              <Home @click="goToPath(item.path)" />
              <Github v-if="item.github" @click="goToPath(item.pathGit)" />
              <Screen v-if="item.screen" @click="goToPath(item.pathScreen)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Tommy from "@/assets/img/projects/amazing.webp";
import Lotteria from "@/assets/img/projects/lotteria.webp";
import Wemix from "@/assets/img/projects/wemix.webp";
import Gallery from "@/assets/img/projects/gallery.webp";
import Review from "@/assets/img/projects/review.webp";
import Old from "@/assets/img/projects/old.webp";
import Home from "@/assets/svg/home.vue";
import Github from "@/assets/svg/github.vue";
import Screen from "@/assets/svg/screen.vue";

const projects = [
  {
    title: "Tommy Future",
    src: Tommy,
    subTitle:
      "토미퓨처의 자회사 AMAZING esthetic을 소개하기 위해 제작한 사이트 입니다.",
    description:
      "공식 출시한 Nuxt3로 seo 최적화하여 제작했습니다. 처음 Nuxt3의 공식 출시로 auto import와 auto router setting 등이 편리해졌습니다. 하지만 아직 정보가 제한적이어서 Stack Overflow와 오픈 채팅을 통해 현직자들에게 질문하여 어려움을 해결했습니다. \n\n Apple 사이트처럼 창의적으로 만들자는 대표님의 긍지와 뜻이 맞아 제가 제작했던 어느 사이트보다 많은 인터렉션을 넣어 창의적이고 재미있는 사이트를 제작했습니다. \n\n(2024년 1월 오픈 예정)",
    skills: [
      { skill: "Nuxt" },
      { skill: "Gsap" },
      { skill: "Swiper" },
      { skill: "Firebase" },
    ],
    site: true,
    path: "https://amazing-prototype.web.app",
  },
  {
    title: "Lotteria Font",
    src: Lotteria,
    subTitle: "롯데리아의 새로운 폰트를 소개하기 위해 제작한 사이트입니다.",
    description:
      "다양한 폰트 디자이너와 웹 디자이너들과의 협업을 통해 흥미로운 웹사이트를 만들기 위해 노력했습니다. 데스크탑, 아이패드, 모바일 사이즈에 대응하는 반응형 웹을 제작하면서 user.agent를 활용하여 다양한 디바이스에 대응하는 방법을 익혔습니다",
    skills: [
      { skill: "Vue" },
      { skill: "Gsap" },
      { skill: "Swiper" },
      { skill: "Lottie" },
    ],
    site: true,
    path: "https://lotteriafont.com",
  },
  {
    title: "Introduce Site",
    src: "",
    subTitle: "3D 캐릭터를 움직이며 확인할 수 있는 소개 사이트입니다.",
    description: "fish",
    skills: [
      { skill: "Nuxt" },
      { skill: "Gsap" },
      { skill: "Three.js" },
      { skill: "Firebase" },
    ],
    site: true,
    git: true,
    path: "",
    pathGit: "",
  },
  {
    title: "Wemix3.0 Linked with Screen Site",
    src: Wemix,
    subTitle:
      "코엑스에서 개최된 코리아 블록체인 위크 2022에서 진행하는 위믹스3.0 전시 사이트입니다.",
    description:
      "핸드폰으로 QR코드를 스캔하면 해당 사이트로 이동할 수 있는 스크린을 전시했습니다. 첫 번째 섹션에서는 사용자가 색상을 선택하여 웹과 스크린이 동일한 색으로 변경되도록 구현하였고, 두 번째 섹션에서는 입력한 메시지가 스크린에 동일하게 출력되도록 하였습니다. 마지막 섹션에서는 핸드폰 카메라 위에 canvas를 덮어 스티커 사진을 찍을 수 있습니다. 이 프로젝트에서는 백엔드와의 협업을 처음 시도했는데, 걱정과는 달리 원활한 진행이 이루어져 마감일보다 빠르게 제작을 완료했습니다. Websocket을 활용하였고, 짧은 기간 내에도 프로젝트에 많은 발전을 이룬 것 같습니다",
    skills: [{ skill: "vue" }, { skill: "Gsap" }, { skill: "Swiper" }],
    site: true,
    screen: true,
    path: "https://lab.ddungsang.com/wemix2022/phone/dist/?auth=QX7UD931",
    pathScreen:
      "https://lab.ddungsang.com/wemix2022/screen.php?auth=QX7UD9311tsvdqggjs4a426my",
  },
  {
    title: "Sungwoo's Gallery",
    src: Gallery,
    subTitle: "창의적인 인터렉션 효과들을 연습하는 연습장입니다.",
    description:
      "Webgl인 Three.js와 이미지를 효과적으로 다루는 라이브러리 pixi.js를 주로 사용해 창의적인 인터렉션 효과를 내도록 노력합니다.",
    skills: [
      { skill: "Vue" },
      { skill: "Gsap" },
      { skill: "Three.js" },
      { skill: "Pixi.js" },
      { skill: "Firebase" },
    ],
    site: true,
    git: true,
    path: "https://sung-gallery.firebaseapp.com",
    pathGit: "https://github.com/swc9803/gallery",
  },
  {
    title: "Review Site",
    src: Review,
    subTitle: "Firestore를 이용한 정보 공유 사이트입니다.",
    description:
      "Firebase를 공부하면서 로그인, 회원가입, CRUD 등을 직접 구현하여 다양한 경험을 쌓은 웹사이트입니다. 이 프로젝트를 통해 백엔드 개발자와의 협업에서 많은 도움을 얻었습니다.",
    skills: [{ skill: "Vue" }, { skill: "Firebase" }, { skill: "Firestore" }],
    site: true,
    path: "https://rhdyd-a7e3b.firebaseapp.com",
  },
  {
    title: "Old Portfolio",
    src: Old,
    subTitle: "실전 경험이 없던 저의 예전 포트폴리오 사이트입니다.",
    description:
      "초기 화면은 Canvas를 활용하여 인터랙션 효과를 적용하고, 간단한 자기 소개를 표현했습니다. 그러나 코드를 다시 살펴보니 컴포넌트화가 제대로 이루어지지 않았고, 스타일 가이드도 일관성이 부족했습니다. 이러한 부분을 보완하기 위해 정확한 스타일 가이드를 참고하여 프로젝트를 재구성하고, 컴포넌트의 재사용성을 높이기 위해 노력했습니다.",
    skills: [{ skill: "Vue" }, { skill: "Gsap" }, { skill: "Firebase" }],
    site: true,
    path: "https://newsungpf.firebaseapp.com",
  },
];

const goToPath = (path) => {
  open(path);
};
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
          .sub-title {
            margin-bottom: 20px;
            font-size: 1.25em;
            line-height: 1.6em;
            word-break: keep-all;
          }
          .description {
            margin-bottom: 40px;
            word-break: keep-all;
            white-space: pre-line;
            line-height: 1.6em;
          }
          .svg-wrapper {
            display: flex;
            justify-content: center;
            gap: 20px;
          }
        }
      }
    }
  }
}
</style>
