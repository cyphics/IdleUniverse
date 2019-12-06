class UpgradeStore {
  constructor(upgradesManager, resourcesStock) {
    this.manager = upgradesManager;
    this.stock = resourcesStock;
    this.availableUpgrades = [];
    this.updateAvailableUpgrades();
  }

  buyUpgrade(id) {
    const priceToPay = this.manager.getPrice(id);
    if (this.stock.canPriceBePayed(priceToPay)) {
      this.stock.takePrice(priceToPay);
      return true;
    }
    return false;
  }

  updateAvailableUpgrades() {
    this.availableUpgrades = this.manager.getAvailableUpgrades();
  }
}

export { UpgradeStore };
