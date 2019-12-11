class PurchaseHistory {
  constructor() {
    this.purchasesList = [];
  }

  addPurchase(upgradeId, timestamp, price) {
    const entry = { timestamp, upgradeId, price };
    this.purchasesList.push(entry);
  }

  getHistory() {
    return this.purchasesList;
  }

  printHistory() {
    let output = '';
    this.purchasesList.forEach((entry) => {
      output += `${entry.upgradeId} bought at ${entry.timestamp}\n`;
    });
    return output;
  }
}

export { PurchaseHistory };
