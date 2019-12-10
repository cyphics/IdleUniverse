class Price {
  constructor(resourcesList = []) {
    this.resourcesList = resourcesList;
  }

  getResources() {
    /**
     * Return list of ResourceAmount contained
     */
    return this.resourcesList;
  }

  addResource(resourceAmount) {
    let alreadyPresent = false;
    this.resourcesList.forEach((res) => {
      if (res.id === resourceAmount.id) {
        res.amount += resourceAmount.amount;
        alreadyPresent = true;
      }
    });
    if (!alreadyPresent) this.resourcesList.push(resourceAmount);
  }

  getAmount(resourceId) {
    let amount = 0;
    this.resourcesList.forEach((res) => {
      if (res.id === resourceId) amount += res.amount;
    });
    return amount;
  }
}

function ResourceAmount(resourceId, amount) {
  this.id = resourceId;
  this.amount = amount;
}

export { Price, ResourceAmount };
