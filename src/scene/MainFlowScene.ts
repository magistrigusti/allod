import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { IActionScene } from "./IActionScene";
import { Group, Mesh, Object3D, Raycaster,  Vector2, Event } from 'three';
import { House } from "@/shared/House";
import { HousePainter } from "@/feature/HousePainter";

export class MainFlowScene {
  readonly actionScene: IActionScene; 
  readonly assetMap: Map<string, GLTF>;

  private raycaster: Raycaster = new Raycaster();
  private housePainter: HousePainter | null = null;

  constructor(actionScene: IActionScene, assetMap: Map<string, GLTF>) {
    this.actionScene = actionScene;
    this.assetMap = assetMap;
    
  }

  async start() {
    this.housePainter = new HousePainter(this.assetMap);
    this.housePainter.getPointerPosition = this.getPointerPosition.bind(this);
    this.housePainter.getIntersectWithGround = this.getIntersectWithGround.bind(this);
    this.housePainter.addToScene = this.addToScene.bind(this);
  }

  mountDraftHouseOnScene(title: string) {
    this.housePainter?.mountDraftHouseOnScene(title);
  }

  private addToScene(element: Object3D<Event> | Group | Mesh) {
    this.actionScene.scene.add(element);
  }

  private getPointerPosition(event: PointerEvent | MouseEvent) {
    const pointer = new Vector2();

    pointer.x = (event.clientX / this.actionScene.renderer.domElement.clientWidth) * 2 -1;
    pointer.y = -(event.clientY / this.actionScene.renderer.domElement.clientHeight) * 2 + 1;

    return pointer;
  }

  private getIntersectWithGround(pointer: Vector2) {
    this.raycaster.setFromCamera(pointer, this.actionScene.camera);
    return this.raycaster.intersectObject(this.actionScene.ground)[0];
  }
}