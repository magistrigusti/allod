import { SceneConnector } from "@/entities/SceneConnector";
import { House } from "@/shared/House";
import { PathLine } from "@/shared/PathLine";
import { Vector2 } from "three";

export class PathPainter {
  private pathLineFrom: PathLine | null = null;

  constructor(private sceneConnector: SceneConnector) {
    window.addEventListener('dblclick', this.handleWindowDbClick)
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && this.pathLineFrom) {
      this.sceneConnector.removeFromScene?.(this.pathLineFrom);
      this.pathLineFrom = null;
    }

    window.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleMouseMove = (event: PointerEvent) => {
    const pointer = this.sceneConnector.getPointerPosition?.(event);
    if (pointer) this.aimPathLine(pointer);
  }

  private handleWindowDbClick = (event: MouseEvent) => {
    const pointer = this.sceneConnector.getPointerPosition?.(event);
    if (!pointer) return;

    const pickedElement = this.sceneConnector.getIntersectWithScene?.(pointer)?.[0];

    const house = pickedElement?.object?.userData;

    const isHouse = house instanceof House;
    if (!isHouse) return;

    const isPathStarted = this.pathLineFrom !== null;
    if (!isPathStarted) {
      this.startMountPathFrom(house);

      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('pointermove', this.handleMouseMove);
      return;
    }

    this.finishMountPath(house);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.addEventListener('pointermove', this.handleMouseMove);
    return;
  };

  private finishMountPath(house: House) {
    if (!this.pathLineFrom) throw new Error('Path did not started');

    const fromPoint = this.pathLineFrom.userData.fromPoint as [number, number, number];
    const toPoint = [house.mesh.position.x, 0, house.mesh.position.z] as [number, number, number];

    this.pathLineFrom.setFromTo(fromPoint, toPoint);
  }

  private startMountPathFrom(house: House) {
    this.pathLineFrom = new PathLine();
    this.pathLineFrom.userData.fromPoint = [house.mesh.position.x, 0, house.mesh.position.z];
    this.pathLineFrom.setFromTo(
      [house.mesh.position.x, 0, house.mesh.position.z],
      [house.mesh.position.x, 0, house.mesh.position.z]
    );

    this.sceneConnector.addToScene?.(this.pathLineFrom)
  }

  private aimPathLine(pointer: Vector2) {
    if (!this.pathLineFrom) throw new Error('Path did not started');

    const intersect = this.sceneConnector.getIntersectWithGround?.(pointer);
    if (!intersect) return;

    const fromPoint = this.pathLineFrom.userData.fromPoint as [number, number, number];

    this.pathLineFrom.setFromTo(
      [0, 0, 0], [intersect.point.x, 0, intersect.point.z]
    );
  }
}