// Shared rotatable viewer: <div class="stage" data-model="file.glb"> plus preset buttons [data-view] and #spin.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const stage = document.querySelector('.stage');
const canvas = stage.querySelector('canvas'), status = stage.querySelector('.status');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
const scene = new THREE.Scene();
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(-0.4, 0.8, 0.6); scene.add(key);
const camera = new THREE.PerspectiveCamera(28, 1, 0.005, 10);
const controls = new OrbitControls(camera, canvas); controls.enableDamping = true; controls.autoRotateSpeed = 1.6;
function resize() { const w = stage.clientWidth, h = stage.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(stage); resize();
let radius = 0.6; const target = new THREE.Vector3();
function setView(az, el) {
  const a = THREE.MathUtils.degToRad(az), e = THREE.MathUtils.degToRad(el);
  camera.position.set(target.x + radius * Math.sin(a) * Math.cos(e), target.y + radius * Math.sin(e), target.z + radius * Math.cos(a) * Math.cos(e));
  controls.target.copy(target); controls.update();
}
new GLTFLoader().load(stage.dataset.model, gltf => {
  const model = gltf.scene; scene.add(model);
  const box = new THREE.Box3().setFromObject(model), size = box.getSize(new THREE.Vector3()); box.getCenter(target);
  radius = size.length() / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) * 0.8;
  controls.minDistance = radius * 0.25; controls.maxDistance = radius * 4; setView(35, 22); status.hidden = true;
}, xhr => { if (xhr.total) status.textContent = `Loading model… ${Math.round(100 * xhr.loaded / xhr.total)}%`; },
   () => { status.textContent = 'The model could not load. Reload the page to try again.'; });
renderer.setAnimationLoop(() => { controls.update(); renderer.render(scene, camera); });
const spin = document.getElementById('spin'); const presets = [...document.querySelectorAll('[data-view]')];
presets.forEach(b => b.addEventListener('click', () => {
  presets.forEach(x => x.setAttribute('aria-pressed', String(x === b))); controls.autoRotate = false; spin.setAttribute('aria-pressed', 'false');
  const [az, el] = b.dataset.view.split(',').map(Number); setView(az, el);
}));
spin.addEventListener('click', () => { const on = spin.getAttribute('aria-pressed') !== 'true'; spin.setAttribute('aria-pressed', String(on)); controls.autoRotate = on; });
