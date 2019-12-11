import { UpgradeStore } from '../upgrades/UpgradeStore';
import { ResourcesCollector } from '../resources/ResourcesCollector';
import { PurchaseHistory } from '../simulation/PurchaseHistory';
import { Timer } from './Timer';
import PhysicsComputer from '../physics/physics';
import { resourceId } from '../resources/Resource';

class Game {
  constructor(upgradesManager, resourcesStock) {
    this.upgradesManager = upgradesManager;
    this.stock = resourcesStock;
    this.history = new PurchaseHistory();
    this.timer = new Timer();
    this.collector = new ResourcesCollector(this.upgradesManager.computer, this.stock);
    this.store = new UpgradeStore(this.upgradesManager, this.stock, this.history, this.timer);
    this.currentAcceleration = 0;
  }

  jumpInTime(elapsedTime) {
    this.timer.addTime(elapsedTime);
    this.currentAcceleration = this.upgradesManager.computer.getCurrentAcceleration();
    this.collector.generateResources(elapsedTime);
    this.addTraveledDistance(elapsedTime);
    this.getNewSpeed(elapsedTime);
  }

  addTraveledDistance(elapsedTime) {
    const currentSpeed = this.stock.getCurrentAmount(resourceId.ship_speed);
    const newDistance = PhysicsComputer.getTraveledDistance(
      currentSpeed,
      elapsedTime,
      this.currentAcceleration,
    );
    this.stock.addResource(resourceId.traveled_distance, newDistance.absoluteValue);
  }

  getNewSpeed(elapsedTime) {
    const newSpeed = this.currentAcceleration * elapsedTime;
    this.stock.addResource(resourceId.ship_speed, newSpeed);
  }
}


export { Game };
