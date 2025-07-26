import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { IActionScene } from "./IActionScene";
import { Group, Raycaster,  Vector2 } from 'three';
import { House } from "@/shared/House";

export class MainFlowScene {
  readonly actionScene: IActionScene; 
  readonly assetMap: Map<string, GLTF>;

  private raycaster: Raycaster = new Raycaster();
  private draftHouse: House | null = null;

  constructor(actionScene: IActionScene, assetMap: Map<string, GLTF>) {
    this.actionScene = actionScene;
    this.assetMap = assetMap;
    
    window.ondblclick = (e) => {
      const pointer = this.getPointerPosition(e);
      const intersect = this.getIntersectWithGround(pointer);

      this.draftHouse?.moveHouseTo(intersect.point);
    };

    window.onkeydown = (e) => {
      if (e.key === 'Enter' && this.draftHouse) {
        this.draftHouse.setOpacity(1);
        this.draftHouse = null;
      }
    }
  }

  async start() {}

  mountDraftHouseOnScene(title: string) {
    const houseGLTF = this.assetMap.get(title);

    if (!houseGLTF) return;
    
    const houseMesh = houseGLTF.scene.clone(true);
    const house = new House(houseMesh);
    house.setOpacity(0.5);

    this.draftHouse = house;

    this.actionScene.scene.add(house.mesh);
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