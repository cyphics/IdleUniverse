class PurchaseHistory {
  constructor() {
    this.purchasesList = [];
  }

  addPurchase(upgradeId, timestamp) {
    const entry = { timestamp, upgradeId };
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
