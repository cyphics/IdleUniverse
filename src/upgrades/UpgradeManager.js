import { getCompleteUpgradesList } from './Upgrade';
import { RateComputer } from '../resources/RateComputer';

class UpgradeManager {
  constructor() {
    this.upgrades = getCompleteUpgradesList();
    this.computer = new RateComputer(this);
  }

  buyUpgrade(id, amount = 1) {
    const upgrade = this.getUpgradeById(id);
    if (upgrade) upgrade.increaseLevel(amount);
    this.computer.updateUpgradeValues();
  }

  getUpgradeById(requiredId) {
    let result = null;
    this.upgrades.forEach((upgrade) => {
      if (upgrade.id === requiredId) result = upgrade;
    });
    if (result === null) throw new Error(`Upgrade ${requiredId} not found`);
    return result;
  }

  getAmountBought(upgradeId) {
    return this.getUpgradeById(upgradeId).amount_bought;
  }

  isBought(upgradeId) {
    return this.getAmountBought(upgradeId) > 0;
  }

  getAvailableUpgrades() {
    const availableUpgrades = [];
    const l = this.upgrades;
    this.upgrades.forEach((up) => {
      if (this.isUpgradeAvailable(up)) availableUpgrades.push(up.id);
    });
    return availableUpgrades;
  }

  isUpgradeAvailable(upgrade) {
    return upgrade.canBeBought() && this.areDependenciesMet(upgrade);
  }

  areDependenciesMet(upgrade) {
    let isMet = true;
    const dependencies = this.getDependencies(upgrade);
    dependencies.forEach((dep) => {
      isMet = dep.amount_bought > 0;
    });
    return isMet;
  }

  getDependencies(upgradeQueried) {
    const upgradesList = [];
    upgradeQueried.dependencies.forEach((id) => {
      upgradesList.push(this.getUpgradeById(id));
    });
    return upgradesList;
  }

  getPrice(upgradeId) {
    return this.getUpgradeById(upgradeId).getPrice();
  }
}

export { UpgradeManager };
