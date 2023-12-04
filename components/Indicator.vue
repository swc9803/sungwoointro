<template>
  <div>
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

const onMouseMove = (e) => {
  circleRef.value.style.top = `${e.clientY}px`;
  circleRef.value.style.left = `${e.clientX}px`;
  progressIndicatorRef.value.style.top = `${e.clientY}px`;
  progressIndicatorRef.value.style.left = `${e.clientX}px`;
};

const onScroll = () => {
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
};

onMounted(() => {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("scroll", onScroll);
});
</script>

<style lang="scss" scoped>
svg {
  position: fixed;
  top: -80px;
  left: -80px;
  transform: translate(-50%, -50%) rotate(-90deg);
  pointer-events: none;
  // 크기 더 작게
  // 모바일 none
}
.cursor {
  position: fixed;
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
  border: 2px solid #ffffff;
  border-radius: 50%;
  overflow: hidden;
  pointer-events: none;
  // 모바일 none
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
</style>
