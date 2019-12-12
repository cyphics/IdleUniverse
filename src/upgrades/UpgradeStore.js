import { upgradesId } from './Upgrade';
import { resourceId } from '../resources/Resource';

class UpgradeStore {
  constructor(upgradesManager, resourcesStock, history, timer) {
    this.manager = upgradesManager;
    this.stock = resourcesStock;
    this.availableUpgrades = [];
    this.purchaseHistory = history;
    this.timer = timer;
    this.updateAvailableUpgrades();
  }

  buyUpgrade(id) {
    const priceToPay = this.manager.getPrice(id);
    if (this.stock.canPriceBePayed(priceToPay)) {
      this.stock.takePrice(priceToPay);
      this.takeAction(id);
      this.manager.buyUpgrade(id);
      this.updateAvailableUpgrades();
      if (this.purchaseHistory) {
        this.purchaseHistory.addPurchase(id, this.timer.elapsedTime, priceToPay);
      }
      return true;
    }
    return false;
  }

  takeAction(upId) {
    switch (upId) {
      case upgradesId.i_kinetic_push:
        this.stock.addResource(resourceId.ship_speed, 1);
        break;
      default:
        break;
    }
  }

  updateAvailableUpgrades() {
    this.availableUpgrades = this.manager.getAvailableUpgrades();
  }
}

export { UpgradeStore };
