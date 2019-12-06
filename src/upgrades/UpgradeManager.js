import { getCompleteUpgradesList } from './Upgrade';

class UpgradeManager {
  constructor() {
    this.upgrades = getCompleteUpgradesList();
  }

  buyUpgrade(id, amount = 1) {
    const upgrade = this.getUpgradeById(id);
    if (upgrade) upgrade.increaseLevel(amount);
  }

  getUpgradeById(requiredId) {
    let result = null;
    this.upgrades.forEach((upgrade) => {
      if (upgrade.id === requiredId) result = upgrade;
    });
    return result;
  }

  getAmountBought(upgradeId) {
    return this.getUpgradeById(upgradeId).amount_bought;
  }

  getAvailableUpgrades() {
    const availableUpgrades = [];
    this.upgrades.forEach((up) => {
      if (up.canBeBought() && this.areDependenciesMet(up)) availableUpgrades.push(up.id);
    });
    return availableUpgrades;
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
