<template>
  <div class="indicator">
    <svg
      ref="progressIndicatorRef"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="49"
        stroke="#fff"
        stroke-width="2"
        :stroke-dasharray="circleLength"
        :style="{ strokeDashoffset: `${dashOffset}px` }"
      />
    </svg>
    <div ref="circleRef" class="cursor">
      <div ref="waveRef" class="wave" />
    </div>
  </div>
</template>

<script setup>
import gsap from "gsap";

const circleRef = ref();
const waveRef = ref();
const progressIndicatorRef = ref();

const circleLength = ref(2 * Math.PI * 49);
const dashOffset = ref(circleLength.value);

const onScroll = () => {
  if (matchMedia("screen and (min-width: 480px)").matches) {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    waveRef.value.style.top = `${100 - (scrollTop / height) * 100}%`;
    gsap.to(dashOffset, {
      value: circleLength.value * (1 - scrollTop / height),
      duration: 0.5,
      ease: "power1.inout",
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});
</script>

<style lang="scss" scoped>
.indicator {
  position: fixed;
  bottom: 2vw;
  right: 2vw;
  svg {
    transform: rotate(-90deg);
    pointer-events: none;
    @media (max-width: 480px) {
      display: none;
    }
  }
  .cursor {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 60px;
    height: 60px;
    border: 2px solid #ffffff;
    border-radius: 50%;
    overflow: hidden;
    pointer-events: none;
    z-index: 1;
    @media (max-width: 480px) {
      display: none;
    }
    .wave {
      position: absolute;
      top: 100%;
      left: -50%;
      width: 200%;
      height: 200%;
      border-radius: 38%;
      background: rgb(187, 187, 187);
      transition: all 0.3s ease;
      animation: wave 4s linear infinite;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        background: white;
        border-radius: 38%;
        animation: wave 2s linear infinite reverse;
      }
    }
    @keyframes wave {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
