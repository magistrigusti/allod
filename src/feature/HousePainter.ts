import { House } from "@/shared/House";
import { Group, Intersection, Mesh, Object3D, Vector2 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneConnector } from '@/entities/SceneConnector';

export class HousePainter {
  private draftHouse: House | null = null;

  constructor(
    private sceneConnector: SceneConnector, private assetMap: Map<string, GLTF>
  ) {
    this.assetMap = assetMap;

    window.addEventListener('dblclick' , this.handleWindowDbClick)
  }

  private handleWindowDbClick = (e: MouseEvent) => {
    const pointer = this.sceneConnector.getPointerPosition?.(e);
    if (!pointer) return;

    const intersect = this.sceneConnector.getIntersectWithGround?.(pointer);
    if (!intersect) return;

    this.draftHouse?.moveHouseTo(intersect.point);
  }

  private handleSaveHouse = () => {
    if (!this.draftHouse) return;
    this.draftHouse?.setOpacity(1);
    this.draftHouse = null;
  }

  private handleWindowKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && this.draftHouse) {
      this.draftHouse.setOpacity(1);
      this.draftHouse = null;
    }
  };

  mountDraftHouseOnScene(title: string) {
    const houseGLTF = this.assetMap.get(title);
    if (!houseGLTF) return;

    const houseMesh = houseGLTF.scene.clone(true);
    const house = new House(houseMesh);

    house.onSaveHouse = this.handleSaveHouse;
    house.setOpacity(0.5)

    this.draftHouse = house;
    this.sceneConnector.addToScene?.(house.mesh);
  };
}