import { ShipEngine } from './ShipEngine';

class Ship {
  constructor() {
    this.computer = new ShipEngine();
  }

  jump(elapsedTime) {
    this.gatherResources(elapsedTime);
    this.addTraveledDistance(elapsedTime);
    this.getNewSpeed(elapsedTime);
  }

  gatherResources(elapsedTime) {

  }

  addTraveledDistance(elapsedTime) {

  }

  getNewSpeed(elapsedTime) {

  }
}


export { Ship };