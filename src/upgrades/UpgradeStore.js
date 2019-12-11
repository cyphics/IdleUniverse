
class UpgradeStore {
  constructor(upgradesManager, resourcesStock, history, timer) {
    this.manager = upgradesManager;
    this.stock = resourcesStock;
    // this.collector = new ResourcesCollector(this.manager, this.stock);
    this.availableUpgrades = [];
    this.purchaseHistory = history;
    this.timer = timer;
    this.updateAvailableUpgrades();
  }

  buyUpgrade(id) {
    const priceToPay = this.manager.getPrice(id);
    if (this.stock.canPriceBePayed(priceToPay)) {
      this.stock.takePrice(priceToPay);
      this.manager.buyUpgrade(id);
      this.updateAvailableUpgrades();
      if (this.purchaseHistory) {
        this.purchaseHistory.addPurchase(id, this.timer.elapsedTime, priceToPay);
      }
      return true;
    }
    return false;
  }

  updateAvailableUpgrades() {
    this.availableUpgrades = this.manager.getAvailableUpgrades();
  }
}

export { UpgradeStore };
