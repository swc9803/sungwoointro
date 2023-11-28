<template>
  <div>
    <div ref="canvasRef" class="canvas" @mousemove="onMouseMove" />
    <div ref="scrollRef" class="scroll" />
  </div>
</template>

<script setup>
import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const canvasRef = ref();
const scrollRef = ref();
let camera;
let renderer;
let raf;

const scene = new THREE.Scene();
// fog 필요
const setupBackground = () => {
  new RGBELoader().load("/pure_sky.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
  });
};

const points = [
  [260, 150, 100],
  [320, 200, 140],
  [340, 150, 180],
  [440, 200, 200],
  [500, 150, 220],
  [540, 170, 240],
];
const createTube = (path, index, color) => {
  const geometry = new THREE.TubeGeometry(path, 70, index * 2 + 10, 6, false);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    wireframe: true,
    opacity: (1 - index / 5) * 0.15 + 0.01,
  });
  return new THREE.Mesh(geometry, material);
};

const path = new THREE.CatmullRomCurve3(
  points.map((point) => new THREE.Vector3(point[0], point[1], point[2])),
);
const colors = [0x38cfff, 0xbeeb9f, 0xffff9d];
const setupModel = () => {
  colors.forEach((color, index) => {
    const tube = createTube(path, index, color);
    scene.add(tube);
  });
};

const setupImage = () => {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load("/test_img.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.BoxGeometry(10, 10, 10);
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  mesh.position.set(280, 150, 120);
};

const animate = () => {
  renderer.render(scene, camera);

  raf = requestAnimationFrame(animate);
};

const mouse = reactive({
  x: 0,
  y: 0,
});

const onMouseMove = (e) => {
  mouse.x = e.pageX - window.innerWidth / 2;
  mouse.y = e.pageY - window.innerHeight / 2;
  const imgX = mouse.x / window.innerWidth;
  const imgY = mouse.y / window.innerHeight;

  gsap.to(camera.position, {
    x: `+=${imgX}`,
    y: `+=${imgY}`,
    duration: 0.3,
    ease: "power3",
  });
  // three js에서 마우스 위치에 따라 카메라가 바라보는 방향을 현재 카메라가 바라보는 방향에서 imgX, imgY값만큼 추가해주고 싶어
  // 위 코드에서 카메라 위치 말고 카메라가 바라보는 방향을 수정해줘
};

const onResize = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasRef.value.offsetWidth, canvasRef.value.offsetHeight);
  canvasRef.value.appendChild(renderer.domElement);
  camera.aspect = canvasRef.value.offsetWidth / canvasRef.value.offsetHeight;
  camera.updateProjectionMatrix();
};

onMounted(() => {
  window.scrollTo(0, 0);
  mouse.x = canvasRef.value.offsetWidth / 2;
  mouse.y = canvasRef.value.offsetHeight / 2;

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });

  camera = new THREE.PerspectiveCamera(
    80,
    canvasRef.value.offsetWidth / canvasRef.value.offsetHeight,
    0.1,
    1000,
  );
  const p3 = path.getPointAt(0);
  gsap.to(camera.position, {
    x: p3.x,
    y: p3.y,
    z: p3.z,
    duration: 1,
    ease: "power3",
  });
  const p2 = path.getPointAt(0.001);
  camera.lookAt(p2);

  const moveCamera = gsap.timeline();
  ScrollTrigger.create({
    animation: moveCamera,
    trigger: scrollRef.value,
    start: "top top",
    end: "bottom bottom",
    markers: true,
    scrub: 4,
  });
  moveCamera.to(
    {},
    {
      onUpdate: () => {
        const p1 = path.getPointAt(moveCamera.progress());
        gsap.to(camera.position, {
          x: p1.x,
          y: p1.y,
          z: p1.z,
          duration: 0.1,
        });
        if (moveCamera.progress() < 0.98) {
          const p2 = path.getPointAt(moveCamera.progress() + 0.02);
          camera.lookAt(p2);
        }
      },
    },
  );

  onResize();
  setupBackground();
  setupModel();
  setupImage();
  animate();

  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(raf);
  renderer.dispose();

  window.removeEventListener("resize", onResize);
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<style lang="scss" scoped>
.canvas {
  position: fixed;
  top: 0;
  left: 0;
  transform: translate3d(0, 0, 0);
  width: 100%;
  height: 100%;
}
.scroll {
  position: absolute;
  height: 1500vh; // vh? +=10000?
}
</style>
