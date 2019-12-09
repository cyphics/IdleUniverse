class Price {
  constructor(resourcesList = []) {
    this.resourcesList = {};
    resourcesList.forEach((resAmount) => {
      this.resourcesList[resAmount.id] = resAmount.amount;
    });
  }

  getResources() {
    return this.resourcesList;
  }

  addResource(resourceAmount) {
    if (resourceAmount.id in this.resourcesList) {
      this.resourcesList[resourceAmount.id] += resourceAmount.amount;
    } else {
      this.resourcesList[resourceAmount.id] = resourceAmount.amount;
    }
  }

  getAmount(resourceId) {
    const amount = this.resourcesList[resourceId];
    if (amount) return amount;
    return 0;
  }
}

function ResourceAmount(resourceId, amount) {
  this.id = resourceId;
  this.amount = amount;
}

export { Price, ResourceAmount };
