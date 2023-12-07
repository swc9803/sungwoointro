<template>
  <div class="container">
    <div class="svg-wrapper">
      <IntroText1 ref="introTextRef1" />
      <IntroText2 ref="introTextRef2" />
      <IntroText3 ref="introTextRef3" />
    </div>
    <div ref="canvasRef" class="canvas-wrapper" />
  </div>
</template>

<script setup>
import gsap from "gsap";
import * as THREE from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import IntroText1 from "~/assets/svg/IntroText1.vue";
import IntroText2 from "~/assets/svg/IntroText2.vue";
import IntroText3 from "~/assets/svg/IntroText3.vue";

const introTextRef1 = ref();
const introTextRef2 = ref();
const introTextRef3 = ref();

const canvasRef = ref();
let camera;
let renderer;

const scene = new THREE.Scene();

const group = new THREE.Group();
scene.add(group);

const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (let z = -1000; z < 1000; z += 1) {
    const sphere = new THREE.Mesh(geometry, material);

    sphere.position.x = (Math.random() - 0.5) * 1000;
    sphere.position.y = (Math.random() - 0.5) * 1000;
    sphere.position.z = z;
    sphere.scale.set(0.7, 0.7, 0.7);

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

        const paths1 = [
          introTextRef1.value.path11,
          introTextRef1.value.path10,
          introTextRef1.value.path9,
          introTextRef1.value.path8,
          introTextRef1.value.path7,
          introTextRef1.value.path6,
          introTextRef1.value.path5,
          introTextRef1.value.path4,
          introTextRef1.value.path3,
          introTextRef1.value.path2,
          introTextRef1.value.path1,
        ];
        const pathLengths1 = Array.from(paths1, (path) =>
          path.getTotalLength(),
        );
        paths1.forEach((path, index) => {
          path.style.strokeDasharray = pathLengths1[index];
          path.style.strokeDashoffset = pathLengths1[index];
          gsap.fromTo(
            path,
            {
              strokeDashoffset: pathLengths1[index],
            },
            {
              strokeDashoffset: 0,
              duration: 0.5,
              delay: index * 0.3,
              ease: "power2.inOut",
            },
          );
        });

        const paths2 = [
          introTextRef2.value.path8,
          introTextRef2.value.path7,
          introTextRef2.value.path4,
          introTextRef2.value.path6,
          introTextRef2.value.path5,
          introTextRef2.value.path3,
          introTextRef2.value.path2,
          introTextRef2.value.path1,
        ];
        const pathLengths2 = Array.from(paths2, (path) =>
          path.getTotalLength(),
        );
        paths2.forEach((path, index) => {
          path.style.strokeDasharray = pathLengths2[index];
          path.style.strokeDashoffset = pathLengths2[index];
          gsap.fromTo(
            path,
            {
              strokeDashoffset: pathLengths2[index],
            },
            {
              strokeDashoffset: 0,
              duration: 0.5,
              delay: index * 0.3,
              ease: "power2.inOut",
            },
          );
        });

        const paths3 = [
          introTextRef3.value.path9,
          introTextRef3.value.path8,
          introTextRef3.value.path7,
          introTextRef3.value.path6,
          introTextRef3.value.path5,
          introTextRef3.value.path4,
          introTextRef3.value.path3,
          introTextRef3.value.path2,
          introTextRef3.value.path1,
        ];
        const pathLengths3 = Array.from(paths3, (path) =>
          path.getTotalLength(),
        );
        paths3.forEach((path, index) => {
          path.style.strokeDasharray = pathLengths3[index];
          path.style.strokeDashoffset = pathLengths3[index];
          gsap.fromTo(
            path,
            {
              strokeDashoffset: pathLengths3[index],
            },
            {
              strokeDashoffset: 0,
              duration: 0.5,
              delay: index * 0.3,
              ease: "power2.inOut",
            },
          );
        });

        gsap.to([paths1, paths2, paths3], {
          fill: "#ffffff",
          duration: 0.5,
          delay: 3.5,
        });
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

let lastTime = null;

const animate = (time) => {
  if (!lastTime) {
    lastTime = time;
  }

  const deltaTime = time - lastTime;

  if (deltaTime > 10) {
    group.rotation.y += 0.001;

    paths.forEach((path) => {
      if (path.vertices.length < 10000) {
        path.update();
      }
    });

    renderer.render(scene, camera);
    lastTime = time;
  }

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
  addStar();

  window.addEventListener("resize", onResize);
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: calc(var(--vh) * 100);
  background: #111111;
  .svg-wrapper {
    position: relative;
    top: 70%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    svg {
      @media (max-width: 1240px) {
        scale: 0.8;
      }
      @media (max-width: 768px) {
        scale: 0.7;
      }
      @media (max-width: 480px) {
        scale: 0.5;
      }
    }
  }
  .canvas-wrapper {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
