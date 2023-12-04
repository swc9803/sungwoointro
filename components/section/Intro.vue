<template>
  <div>
    <canvas ref="canvasRef" @mousemove="onMouseMove" @touchMove="onTouchMove" />
    <p v-for="item in introText" :key="item.id" :ref="wordRef" class="word">
      {{ item.text }}
    </p>
  </div>
</template>

<script setup>
import gsap from "gsap";

const wordArray = ref([]);
const wordRef = (el) => wordArray.value.push(el);
const wordTl = gsap.timeline();

const introText = [
  { text: "Creative" },
  { text: "Interactive" },
  { text: "Web Developer" },
];

const canvasRef = ref();

let starCount;
let ctx;
const starSize = 2.5;
const starMinSize = 0.2;
const overflowThreshold = 20;
let scale = 1;
let width, height;
const stars = [];
let pointerX, pointerY;
let touchInput = false;
const velocity = {
  x: 0,
  y: 0,
  tx: 0,
  ty: 0,
  z: 0.001,
};

const generate = () => {
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: starMinSize + Math.random() * (1 - starMinSize),
    });
  }
};

const recycleStar = (star) => {
  let direction = "z";
  const vx = Math.abs(velocity.tx);
  const vy = Math.abs(velocity.ty);

  if (vx > 1 && vy > 1) {
    let axis;
    if (vx > vy) {
      axis = Math.random() < Math.abs(velocity.x) / (vx + vy) ? "h" : "v";
    } else {
      axis = Math.random() < Math.abs(velocity.y) / (vx + vy) ? "v" : "h";
    }

    if (axis === "h") {
      direction = velocity.x > 0 ? "l" : "r";
    } else {
      direction = velocity.y > 0 ? "t" : "b";
    }
  }
  star.z = starMinSize + Math.random() * (1 - starMinSize);

  if (direction === "z") {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  } else if (direction === "l") {
    star.x = -starSize;
    star.y = height * Math.random();
  } else if (direction === "r") {
    star.x = width + starSize;
    star.y = height * Math.random();
  } else if (direction === "t") {
    star.x = width * Math.random();
    star.y = -starSize;
  } else if (direction === "b") {
    star.x = width * Math.random();
    star.y = height + starSize;
  }
};

const movePointer = (x, y) => {
  if (typeof pointerX === "number" && typeof pointerY === "number") {
    const ox = x - pointerX;
    const oy = y - pointerY;
    velocity.tx = velocity.x + (ox / 8) * scale * (touchInput ? -1 : 1);
    velocity.ty = velocity.y + (oy / 8) * scale * (touchInput ? -1 : 1);
  }
  pointerX = x;
  pointerY = y;
};

const onMouseMove = (e) => {
  touchInput = false;
  movePointer(e.pageX / 5, e.pageY / 5);
};
const onTouchMove = (e) => {
  touchInput = true;
  movePointer(e.touches[0].pageX / 5, e.touches[0].pageY / 5, true);
  e.preventDefault();
};

const placeStar = (star) => {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
};

const onResize = () => {
  scale = devicePixelRatio || 1;
  width = window.innerWidth * scale;
  height = window.innerHeight * scale;
  canvasRef.value.width = width;
  canvasRef.value.height = height;
  stars.forEach(placeStar);
};

const update = () => {
  velocity.tx *= 0.8;
  velocity.ty *= 0.8;
  velocity.x += (velocity.tx - velocity.x) * 0.4;
  velocity.y += (velocity.ty - velocity.y) * 0.4;

  stars.forEach((star) => {
    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;
    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    if (
      star.x < -overflowThreshold ||
      star.x > width + overflowThreshold ||
      star.y < -overflowThreshold ||
      star.y > height + overflowThreshold
    ) {
      recycleStar(star);
    }
  });
};

const render = () => {
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = starSize * star.z * scale;
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.7 + 0.7 * Math.random()}`;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);

    const tailX = Math.abs(velocity.x * 3) < 0.1 ? 0.4 : velocity.x * 3;
    const tailY = Math.abs(velocity.y * 3) < 0.1 ? 0.4 : velocity.y * 3;

    ctx.lineTo(star.x + tailX, star.y + tailY);
    ctx.stroke();
  });
};

const animate = () => {
  ctx.clearRect(0, 0, width, height);

  update();
  render();
  requestAnimationFrame(animate);
};

onMounted(() => {
  starCount = (window.innerWidth + window.innerHeight) * 0.2;
  ctx = canvasRef.value.getContext("2d");

  generate();
  onResize();
  animate();

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

  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
div {
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #222222;
  canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .word {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    color: #ffffff;
    font-size: 5vw;
    font-weight: 900;
  }
}
</style>
