// src/scene/InitScene.ts
import { Scene, Color, PerspectiveCamera, WebGLRenderer } from "three";
import { IActionScene } from "./IActionScene";

// Класс сцены для three.js
export class InitScene implements IActionScene {
  readonly scene: Scene;
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;

  constructor() {
    this.scene = new Scene();
    this.scene.background = new Color(0x000000);

    this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);

    this.renderer = new WebGLRenderer();
    
    document.body.appendChild(this.renderer.domElement);

    this.onWindowResize();

    window.addEventListener('resize', this.onWindowResize)
  }

  private animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  private onWindowResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  async start() {
    this.animate();
  }
}
