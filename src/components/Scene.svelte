<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import * as THREE from "three";
  import type { TThreeFrame } from "./types";

  let Frame: TThreeFrame;
  let canvas;
  let cube;
  let animationReq;

  onMount(() => {
    initScene();
    animate();
  });

  onDestroy(() => {
    cancelAnimationFrame(animationReq);

    if (!Frame) {
      return;
    }

    Frame.renderer.dispose();
	Frame.renderer.forceContextLoss();
	Frame.renderer.domElement = null;
	Frame.renderer = null;
  });

  function initScene() {
    Frame = {
      scene: new THREE.Scene(),
      renderer: new THREE.WebGLRenderer({ alpha: false, antialias: true }),
      camera: new THREE.PerspectiveCamera(
        75,
        canvas.offsetWidth / canvas.offsetHeight,
        0.1,
        500
      ),
    };

    Frame.camera.zoom = 5;
    Frame.camera.position.set(0, 0, 10);
    Frame.camera.updateProjectionMatrix();

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 14, 30);
    light.castShadow = true;

    const pointLight1 = new THREE.PointLight(0x888888ff, 0.8, 10);
    pointLight1.position.set(-4, -4, -4);
    pointLight1.castShadow = true;

    const pointLight2 = new THREE.PointLight(0xff0088, 0.8, 20);
    pointLight2.position.set(4, -3, -6);
    pointLight2.castShadow = true;

    Frame.scene.add(light);
    Frame.scene.add(pointLight1);
    Frame.scene.add(pointLight2);

    cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
    );
    cube.castShadow = true;
    cube.receiveShadow = true;

    cube.rotation.x = 1;
    cube.rotation.y = -2;
    cube.rotation.z = 3;

    Frame.scene.add(cube);

    const axesHelper = new THREE.AxesHelper(1);
    Frame.scene.add(axesHelper);

    Frame.renderer.shadowMap.enabled = true;
    Frame.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    Frame.renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

    canvas.appendChild(Frame.renderer.domElement);

    Frame.renderer.render(Frame.scene, Frame.camera);
  }

  function animate() {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z -= 0.05;

    Frame.renderer?.render(Frame.scene, Frame.camera);

    requestAnimationFrame(animate);
  }
</script>

<div id="scene" bind:this={canvas} />

<style>
  #scene {
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    bottom: 40px;
  }
</style>
