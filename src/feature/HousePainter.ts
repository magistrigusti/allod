import { House } from "@/shared/House";
import { assetsConfig } from "@/constants/assetsConfig";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { SceneConnector } from '@/entities/SceneConnector';
import { IndexDB } from "@/indexDb";

export class HousePainter {
  private draftHouse: House | null = null;
  private indexDB = new IndexDB();

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
    this.saveHouse(this.draftHouse);
    this.draftHouse = null;
  }

  mountDraftHouseOnScene(title: string) {
    const houseGLTF = this.assetMap.get(title);
    const assetConfig = assetsConfig.find(({ title }) => title === assetTitle);

    if (!houseGLTF || !assetConfig) return;

    const houseMesh = houseGLTF.scene.clone(true);
    
    const house = new House(houseMesh, assetConfig);

    house.onSaveHouse = this.handleSaveHouse;
    house.setOpacity(0.5)

    this.draftHouse = house;
    this.sceneConnector.addToScene?.(house.mesh);
  };

  saveHouse(house: House) {
    house.setOpacity(1);
    house.isMount = true;

    this.indexDB.saveHouseInfo({
      id: house.id,
      positionX: house.mesh.position.x,
      positionZ: house.mesh.position.z,
      assetTitle: house.config.title,
      houseName: '',
    })
  }
}