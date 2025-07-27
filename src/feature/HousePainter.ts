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
  addtoScene: AddToScene | null = null;

  constructor(assetMap: Map<string, GLTF>) {
    this.assetMap = assetMap;

    // window.ondblclick = this.handleWindowDbClick;
  //   window.onkeydown = this.handleWindowKeyDown;
  // }

  // private handleWindowDbClick = (e: MouseEvent) => {
  //   const pointer = this.getPointerPosition?.(e);
  //   if (!pointer) return;

  //   const intersect = this.getIntersectWithGround?.(pointer);
  //   if (!intersect) return;
  }
}