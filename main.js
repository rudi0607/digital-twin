import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.166.1/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.166.1/examples/jsm/controls/OrbitControls.js';

// ------------------- Scene setup -------------------
const container = document.getElementById('three-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.minDistance = 1;
controls.maxDistance = 10;

// Simple ground plane
const groundGeo = new THREE.PlaneGeometry(20, 20);
const groundMat = new THREE.MeshStandardMaterial({ color: 0x222222 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

// Lighting
const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1.2);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
scene.add(dirLight);

// ------------------- Model loading -------------------
const loader = new GLTFLoader();
let currentModel = null;

// Placeholder data – replace with your own projects
const projects = [
  {
    name: 'Project 1',
    model: 'assets/models/project1.glb',
    title: 'Kinetic Sculpture',
    desc: 'A looping animation that explores form and motion.',
  },
  {
    name: 'Project 2',
    model: 'assets/models/project2.glb',
    title: 'Architectural Study',
    desc: 'Low-poly study of a mixed-use tower.',
  },
  {
    name: 'Project 3',
    model: 'assets/models/project3.glb',
    title: 'Abstract Geometry',
    desc: 'Procedurally generated shape driven by shader noise.',
  },
  {
    name: 'Home',
    model: 'assets/models/sample.glb',
    title: 'Welcome',
    desc: 'Hover over the model to orbit, click a project button to load a specific piece.',
  },
];

function disposeModel(model) {
  scene.remove(model);
  model.traverse((child) => {
    if (!child.isMesh) return;

    child.geometry.dispose();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material.dispose());
    } else if (child.material) {
      child.material.dispose();
    }
  });
}

function centerAndScaleModel(obj) {
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3()).length();
  const center = box.getCenter(new THREE.Vector3());

  obj.position.sub(center);
  if (size > 0) {
    obj.scale.setScalar(1.5 / size);
  }
}

function createFallbackModel() {
  const group = new THREE.Group();
  const geometry = new THREE.IcosahedronGeometry(0.8, 1);
  const material = new THREE.MeshStandardMaterial({ color: 0x62d6ff, roughness: 0.35, metalness: 0.25 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 0.9;
  group.add(mesh);
  return group;
}

async function loadModel(url) {
  if (currentModel) {
    disposeModel(currentModel);
    currentModel = null;
  }

  try {
    const gltf = await loader.loadAsync(url);
    const obj = gltf.scene;
    centerAndScaleModel(obj);
    scene.add(obj);
    currentModel = obj;
  } catch (error) {
    console.warn(`Could not load ${url}; showing fallback geometry instead.`, error);
    const fallback = createFallbackModel();
    scene.add(fallback);
    currentModel = fallback;
  }
}

// Initialize with the home model
loadModel(projects.find((project) => project.name === 'Home').model);

// ------------------- UI wiring -------------------
function updateInfo({ title, desc }) {
  const panel = document.getElementById('infoPanel');
  document.getElementById('infoTitle').textContent = title;
  document.getElementById('infoDesc').textContent = desc;
  panel.classList.remove('hidden');
}

document.getElementById('btnHome').addEventListener('click', () => {
  const project = projects.find((item) => item.name === 'Home');
  updateInfo(project);
  loadModel(project.model);
});

document.getElementById('btnProject1').addEventListener('click', () => {
  const project = projects[0];
  updateInfo(project);
  loadModel(project.model);
});

document.getElementById('btnProject2').addEventListener('click', () => {
  const project = projects[1];
  updateInfo(project);
  loadModel(project.model);
});

document.getElementById('btnProject3').addEventListener('click', () => {
  const project = projects[2];
  updateInfo(project);
  loadModel(project.model);
});

document.getElementById('btnCloseInfo').addEventListener('click', () => {
  document.getElementById('infoPanel').classList.add('hidden');
});

// ------------------- Animation loop -------------------
function animate() {
  requestAnimationFrame(animate);
  if (currentModel) {
    currentModel.rotation.y += 0.005;
  }
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ------------------- Responsiveness -------------------
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
