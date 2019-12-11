import { ShipEngine } from './ShipEngine';

class Game {
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


export { Game };
