import { House } from "@/shared/House";
import { Group, Intersection, Mesh, Object3D, Vector2 } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

type GetIntersectWithGround = (pointer: Vector2) => Intersection<Object3D<Event>>;
type GetPointerPosition = (pointer: PointerEvent | MouseEvent) => Vector2;
type AddToScene = (element: Object3D<Event> | Group | Mesh) => void;

export class HousePainter {
  private assetMap: Map<string, GLTF> = new Map();
  private draftHouse: House | null = null;

  getPointerPosition: GetPointerPosition | null = null;
  getIntersectWithGround: GetIntersectWithGround | null = null;
  addToScene: AddToScene | null = null;

  constructor(assetMap: Map<string, GLTF>) {
    this.assetMap = assetMap;

    window.ondblclick = this.handleWindowDbClick;
    window.onkeydown = this.handleWindowKeyDown;
  }

  private handleWindowDbClick = (e: MouseEvent) => {
    const pointer = this.getPointerPosition?.(e);
    if (!pointer) return;

    const intersect = this.getIntersectWithGround?.(pointer);
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
    this.addToScene?.(house.mesh);
  };
}