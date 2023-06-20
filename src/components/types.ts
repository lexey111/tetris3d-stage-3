import * as THREE from "three";

export type TThreeFrame = {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.OrthographicCamera | THREE.PerspectiveCamera
}
