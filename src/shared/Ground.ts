import { Mesh, PlaneGeometry, MeshPhongMaterial } from 'three';

export class Ground extends Mesh {
  constructor() {
    const groundPlane = new PlaneGeometry(100, 100);
    const groundMaterial = new MeshPhongMaterial({ color: 0x88cc88, depthWrite: false});

    super( groundPlane, groundMaterial );

    this.rotation.x = -Math.PI / 2;
  }
}