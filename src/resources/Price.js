class Price {
  constructor(resourcesList) {
    this.resourcesList = resourcesList;
  }

  getResources() {
    return this.resourcesList;
  }
}

function ResourceAmount(resourceId, amount) {
  this.id = resourceId;
  this.amount = amount;
}

export { Price, ResourceAmount };
