import { upgradesId } from '../upgrades/Upgrade';
import { UpgradeStore } from '../upgrades/UpgradeStore';
import { ResourcesCollector } from '../resources/ResourcesCollector';
import { Timer } from '../game/Timer';
import { PurchaseHistory } from './PurchaseHistory';
import {SimulationReport} from "./SimulationReport";

const strategyId = {
  broken: 'broken',
  cheapest: 'cheapest',
};

class Simulation {
  constructor(upgradesManager, resourcesStock, stratId, time) {
    this.stock = resourcesStock;
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
    if (nextUpgradeToBuy === null) {
      this.isRunning = false;
      return;
    }
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
      this.history.addPurchase(nextUpgradeToBuy, this.timer.elapsedTime, priceNextUpgrade);
    } else {
      throw new Error(`Purchased of "${nextUpgradeToBuy}" failed!`);
    }
  }

  getNextUpgradeToBuy() {
    let nextUpgrade = null;
    let shortestTime = Infinity;
    switch (this.stratId) {
      case strategyId.cheapest:
        this.store.availableUpgrades.forEach((upId) => {
          const timeUntilAvailable = this.store.getTimeUntilAvailable(upId).absolute_value;
          if (timeUntilAvailable < shortestTime) {
            shortestTime = timeUntilAvailable;
            nextUpgrade = upId;
          }
        });
        break;
      case strategyId.broken:
      default:
        nextUpgrade = upgradesId.i_lvl_1_coil;
    }
    return nextUpgrade;
  }

  getHistory() {
    return this.history.purchasesList;
  }

  toString() {
    const report = new SimulationReport(this);
    return report.print();
  }
}

export { Simulation, strategyId };
