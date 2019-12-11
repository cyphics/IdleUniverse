import { upgradesId } from '../upgrades/Upgrade';
import { UpgradeStore } from '../upgrades/UpgradeStore';
import { ResourcesCollector } from '../resources/ResourcesCollector';
import { Timer } from '../game/Timer';
import { PurchaseHistory } from './PurchaseHistory';

const strategyId = {
  broken: 'broken',
  cheapest: 'cheapest',
};

class Simulation {
  constructor(upgradesManager, resourcesStock, stratId, time) {
    this.store = new UpgradeStore(upgradesManager, resourcesStock);
    this.collector = new ResourcesCollector(upgradesManager, resourcesStock);
    this.stratId = stratId;
    this.maxTime = time;
    this.timer = new Timer();
    this.history = new PurchaseHistory();
    this.isRunning = true;
  }

  run() {
    while (this.isRunning) {
      this.buyNextUpgrade();
    }
  }

  buyNextUpgrade() {
    const nextUpgradeToBuy = this.getNextUpgradeToBuy();
    const priceNextUpgrade = this.store.getPrice(nextUpgradeToBuy);
    const timeToWait = this.collector.getTimeUntilInStock(priceNextUpgrade);
    if (timeToWait.absolute_value === Infinity
        || timeToWait.absolute_value + this.timer.elapsedTime > this.maxTime) {
      this.isRunning = false;
      return;
    }
    this.collector.generateResources(timeToWait);
    this.timer.addTime(timeToWait);
    if (this.timer.elapsedTime > this.maxTime) this.isRunning = false;
    const purchaseResult = this.store.buyUpgrade(nextUpgradeToBuy);
    if (purchaseResult) {
      this.history.addPurchase(nextUpgradeToBuy, this.timer.elapsedTime);
    } else {
      throw new Error(`Purchased of "${nextUpgradeToBuy}" failed!`);
    }
  }

  getNextUpgradeToBuy() {
    switch (this.stratId) {
      case strategyId.cheapest:
      case strategyId.broken:
      default:
        return upgradesId.i_lvl_1_coil;
    }
  }

  getHistory() {
    return this.history.purchasesList;
  }
}

export { Simulation, strategyId };
