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
    if (result === null) throw new Error(`Upgrade ${requiredId.name} not found`);
    return result;
  }

  getAmountBought(upgradeId) {
    return this.getUpgradeById(upgradeId).amount_bought;
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
      let up = this.getUpgradeById(id);
      upgradesList.push(this.getUpgradeById(id));
    });
    return upgradesList;
  }

  getPrice(upgradeId) {
    return this.getUpgradeById(upgradeId).getPrice();
  }
}

export { UpgradeManager };
