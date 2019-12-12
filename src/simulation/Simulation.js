import { upgradesId, upgradeTypes } from '../upgrades/Upgrade';

import { SimulationReport } from './SimulationReport';
import { resourceId } from '../resources/Resource';

const strategyId = {
  broken: 'broken',
  cheapest: 'cheapest',
};

class Simulation {
  constructor(game, time, stratId = strategyId.cheapest) {
    this.game = game;
    this.stratId = stratId;
    this.maxTime = time;
    this.timer = game.timer;
    this.history = game.history;
    this.isRunning = true;
    this.timeToWaitForNextUpgrade = 0;
    this.nextUpgrade = null;
  }

  run() {
    while (this.isRunning) {
      this.buyNextUpgrade();
    }
  }

  buyNextUpgrade() {
    this.nextUpgrade = this.getNextUpgradeToBuy();
    if (this.nextUpgrade === null) {
      this.isRunning = false;
      return;
    }
    // const priceNextUpgrade = this.game.upgradesManager.getPrice(nextUpgradeToBuy);
    if (this.timeToWaitForNextUpgrade === Infinity
        || this.timeToWaitForNextUpgrade + this.timer.elapsedTime > this.maxTime) {
      this.isRunning = false;
      this.game.jumpInTime(this.maxTime - this.timer.elapsedTime);
      return;
    }
    this.generateClickableResources(this.nextUpgrade);
    this.game.jumpInTime(this.timeToWaitForNextUpgrade);
    if (this.timer.elapsedTime > this.maxTime) this.isRunning = false;
    const purchaseResult = this.game.store.buyUpgrade(this.nextUpgrade);
    if (!purchaseResult) {
      throw new Error(`Purchased of "${this.nextUpgrade}" failed!`);
    }
  }

  getNextUpgradeToBuy() {
    let nextUpgrade = null;
    this.timeToWaitForNextUpgrade = Infinity;
    switch (this.stratId) {
      case strategyId.cheapest:
        this.game.store.availableUpgrades.forEach((upId) => {
          if (nextUpgrade === null) nextUpgrade = upId;
          const upType = this.game.upgradesManager.getType(upId);
          const price = this.game.upgradesManager.getPrice(upId);
          let timeUntilAvailable;
          if (upType === upgradeTypes.software || upType === upgradeTypes.science) {
            timeUntilAvailable = price.getResources()[0].amount;
          } else {
            timeUntilAvailable = this.game.collector.getTimeUntilInStock(price).absoluteValue;
          }
          if (timeUntilAvailable < this.timeToWaitForNextUpgrade) {
            this.timeToWaitForNextUpgrade = timeUntilAvailable;
            nextUpgrade = upId;
          }
        });
        break;
      case strategyId.broken:
      default:
        nextUpgrade = null;
    }
    if (nextUpgrade === null) throw new Error('No further upgrade found!');
    return nextUpgrade;
  }

  generateClickableResources(upgradeToBuy) {
    let knowledgeToAdd = 0;
    let linesOfCodeToAdd = 0;
    const nextUpgradeType = this.game.upgradesManager.getType(upgradeToBuy);
    if (nextUpgradeType === upgradeTypes.software) linesOfCodeToAdd = this.timeToWaitForNextUpgrade;
    else if (nextUpgradeType === upgradeTypes.science) knowledgeToAdd = this.timeToWaitForNextUpgrade;
    else {
      knowledgeToAdd = this.timeToWaitForNextUpgrade / 2;
      linesOfCodeToAdd = this.timeToWaitForNextUpgrade / 2;
    }
    this.game.stock.addResource(resourceId.knowledge, knowledgeToAdd);
    this.game.stock.addResource(resourceId.lines_of_code, linesOfCodeToAdd);
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
