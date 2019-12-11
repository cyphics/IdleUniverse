import { upgradesId } from '../upgrades/Upgrade';
import { Timer } from '../game/Timer';
import { PurchaseHistory } from './PurchaseHistory';
import { SimulationReport } from './SimulationReport';

const strategyId = {
  broken: 'broken',
  cheapest: 'cheapest',
};

class Simulation {
  constructor(game, stratId, time) {
    this.game = game;
    this.stratId = stratId;
    this.maxTime = time;
    this.timer = game.timer;
    this.history = game.history;
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
    const priceNextUpgrade = this.game.upgradesManager.getPrice(nextUpgradeToBuy);
    const timeToWait = this.game.collector.getTimeUntilInStock(priceNextUpgrade);
    if (timeToWait.absoluteValue === Infinity
        || timeToWait.absoluteValue + this.timer.elapsedTime > this.maxTime) {
      this.isRunning = false;
      return;
    }
    this.game.jumpInTime(timeToWait);
    if (this.timer.elapsedTime > this.maxTime) this.isRunning = false;
    const purchaseResult = this.game.store.buyUpgrade(nextUpgradeToBuy);
    if (!purchaseResult) {
      throw new Error(`Purchased of "${nextUpgradeToBuy}" failed!`);
    }
  }

  getNextUpgradeToBuy() {
    let nextUpgrade = null;
    let shortestTime = Infinity;
    switch (this.stratId) {
      case strategyId.cheapest:
        this.game.store.availableUpgrades.forEach((upId) => {
          const price = this.game.upgradesManager.getPrice(upId);
          const timeUntilAvailable = this.game.collector.getTimeUntilInStock(price).absoluteValue;
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
