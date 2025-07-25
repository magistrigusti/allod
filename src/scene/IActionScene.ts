import { Scene, PerspectiveCamera, WebGLRenderer } from "three";

export interface IActionScene {
  readonly scene: Scene;
  readonly camera: PerspectiveCamera;
  readonly renderer: WebGLRenderer;

  start(): Promise<void>;
}