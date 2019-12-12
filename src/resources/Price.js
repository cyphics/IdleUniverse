function ResourceAmount(resourceId, amount) {
  this.id = resourceId;
  this.amount = amount;
}

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

  multiply(factor) {
    const newPrice = new Price();
    this.resourcesList.forEach((origRes) => {
      const amount = new ResourceAmount(origRes.id, origRes.amount * factor);
      newPrice.addResource(amount);
    });
    return newPrice;
  }

  toString() {
    let result = '';
    this.resourcesList.forEach((res) => {
      result += `${res.id} (${res.amount}), `;
    });
    return result.substring(0, result.length - 2);
  }
}


export { Price, ResourceAmount };
