<template>
  <div class="container">
    <h1 ref="introMessageRef1">Creative</h1>
    <h1 ref="introMessageRef2">Interactive</h1>
    <h1 ref="introMessageRef3">Developer</h1>
    <div ref="canvasRef" class="canvas-wrapper" />
  </div>
</template>

<script setup>
import gsap from "gsap";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const introMessageRef1 = ref();
const introMessageRef2 = ref();
const introMessageRef3 = ref();
const canvasRef = ref();
let camera;
let renderer;

const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

const addSphere = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let z = -1000; z < 1000; z += 5) {
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = (Math.random() - 0.5) * 1000;
    sphere.position.y = (Math.random() - 0.5) * 1000;
    sphere.position.z = z;

    group.add(sphere);
  }
};

let sampler;
const paths = [];
const loadObj = () => {
  new OBJLoader().load(
    "/whale.obj",
    (obj) => {
      sampler = new MeshSurfaceSampler(obj.children[0]).build();

      for (let i = 0; i < 4; i++) {
        const path = new Path(i);
        paths.push(path);
        group.add(path.line);
      }
    },
    (xhr) => {
      if (xhr.loaded === xhr.total) {
        onResize();
        gsap.from(
          [
            introMessageRef1.value,
            introMessageRef2.value,
            introMessageRef3.value,
          ],
          {
            opacity: 0,
            filter: "blur(2em)",
            stagger: 0.3,
            duration: 2,
          },
        );
      }
    },
  );
};

const tempPosition = new THREE.Vector3();
const materials = [
  new THREE.LineBasicMaterial({
    color: 0xd7e0ff,
    transparent: true,
    opacity: 0.5,
  }),
  new THREE.LineBasicMaterial({
    color: 0xe2e9ff,
    transparent: true,
    opacity: 0.5,
  }),
  new THREE.LineBasicMaterial({
    color: 0xa5b9ff,
    transparent: true,
    opacity: 0.5,
  }),
  new THREE.LineBasicMaterial({
    color: 0xb0c2ff,
    transparent: true,
    opacity: 0.5,
  }),
];
class Path {
  constructor(index) {
    this.geometry = new THREE.BufferGeometry();
    this.material = materials[index % 4];
    this.line = new THREE.Line(this.geometry, this.material);
    this.vertices = [];

    sampler.sample(tempPosition);
    this.previousPoint = tempPosition.clone();
  }

  update() {
    let pointFound = false;
    while (!pointFound) {
      sampler.sample(tempPosition);
      if (tempPosition.distanceTo(this.previousPoint) < 1.5) {
        this.vertices.push(tempPosition.x, tempPosition.y, tempPosition.z);
        this.previousPoint = tempPosition.clone();
        pointFound = true;
      }
    }
    this.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(this.vertices, 3),
    );
  }
}

const animate = () => {
  group.rotation.y += 0.0005;

  paths.forEach((path) => {
    if (path.vertices.length < 10000) {
      path.update();
    }
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

const onResize = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(canvasRef.value.offsetWidth, canvasRef.value.offsetHeight);
  canvasRef.value.appendChild(renderer.domElement);
  camera.aspect = canvasRef.value.offsetWidth / canvasRef.value.offsetHeight;
  camera.updateProjectionMatrix();
};

onMounted(() => {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  camera = new THREE.PerspectiveCamera(
    75,
    canvasRef.value.offsetWidth / canvasRef.value.offsetHeight,
    0.1,
    1000,
  );
  camera.position.z = 30;

  animate();
  loadObj();
  addSphere();

  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #111111;
  .canvas-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  h1 {
    position: relative;
    top: 65%;
    transform: translate3d(0, -50%, 0);
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 10px;
    width: 100%;
    color: white;
    font-size: 3em;
    // letter-spacing:;
    // filter: blur(2em);
    // opacity: 0;
    z-index: 1;
  }
}
</style>
