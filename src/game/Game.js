import { RateComputer } from '../resources/RateComputer';
import { UpgradeStore } from '../upgrades/UpgradeStore';
import { ResourcesCollector } from '../resources/ResourcesCollector';
import { PurchaseHistory } from '../simulation/PurchaseHistory';
import { Timer } from './Timer';

class Game {
  constructor(upgradesManager, resourcesStock) {
    this.upgradesManager = upgradesManager;
    this.stock = resourcesStock;
    this.history = new PurchaseHistory();
    this.timer = new Timer();
    this.collector = new ResourcesCollector(this.upgradesManager.computer, this.stock);
    this.store = new UpgradeStore(this.upgradesManager, this.stock, this.history, this.timer);
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
