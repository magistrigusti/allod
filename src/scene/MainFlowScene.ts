import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { IActionScene } from "./IActionScene";

export class MainFlowScene {
  readonly actionScene: IActionScene; 
  readonly assetMap: Map<string, GLTF>;

  constructor(actionScene: IActionScene, assetMap: Map<string, GLTF>) {
    this.actionScene = actionScene;
    this.assetMap = assetMap;
  }

  async start() {}

  mountDraftHouseOnScene(title: string) {}
}