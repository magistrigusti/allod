import { Group, Mesh } from "three";
import { v4 as uuidv4 } from "uuid";

export class House {
  readonly mesh: Group;
  readonly id: string;

  constructor(mesh: Group) {
    this.mesh = mesh;

    this.id = uuidv4();
  }

  setOpacity(opacity: number) {
    this.mesh.traverse((child) => {
      if (child instanceof Mesh) {
        child.material.transparant = true;
        child.material.apacity = opacity;
      }
    })
  }
}