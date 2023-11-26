<template>
  <div>
    <div ref="canvasRef" class="canvas" />
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
const setupBackground = () => {
  new RGBELoader().load("/pure_sky.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
  });
};

const points = [
  [240, 90],
  [340, 130],
  [320, 150],
  [230, 190],
  [250, 250],
  [50, 300],
];
const createTube = (path, index, color) => {
  const geometry = new THREE.TubeGeometry(path, 100, index * 2 + 10, 10, false);
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    wireframe: true,
    opacity: (1 - index / 5) * 0.1 + 0.05,
  });
  return new THREE.Mesh(geometry, material);
};

const path = new THREE.CatmullRomCurve3(
  points.map(
    (point) =>
      new THREE.Vector3(point[0], (Math.random() - 0.5) * 250, point[1]),
  ),
);
const colors = [0xff6138, 0xffff9d, 0xbeeb9f, 0x79bd8f, 0x00a388];
const setupModel = () => {
  colors.forEach((color, index) => {
    const tube = createTube(path, index, color);
    scene.add(tube);
  });
};

const animate = () => {
  renderer.render(scene, camera);

  raf = requestAnimationFrame(animate);
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

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  camera = new THREE.PerspectiveCamera(
    80,
    canvasRef.value.offsetWidth / canvasRef.value.offsetHeight,
    0.1,
    1000,
  );
  const p3 = path.getPointAt(0);
  camera.position.set(p3.x, p3.y, p3.z);
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
  height: 1000vh; // vh? +=10000?
}
</style>
