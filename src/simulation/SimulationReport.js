import { resourcesIdList } from '../resources/Resource';

class SimulationReport {
  constructor(simulation) {
    this.simulation = simulation;
    this.purchases = simulation.getHistory();
    this.border_character = '*';
    this.purchaseMaxLength = 0;
    this.timeStampMaxLength = 0;
    this.final_report = '';
    this.getLengths();
  }

  getLengths() {
    this.purchases.forEach((purchase) => {
      const idLength = purchase.upgradeId.length;
      if (idLength > this.purchaseMaxLength) this.purchaseMaxLength = idLength;
      const timeLength = purchase.timestamp.toString().length;
      if (timeLength > this.timeStampMaxLength) this.timeStampMaxLength = timeLength;
    });
  }

  print() {
    this.buildTitle();
    this.purchases.forEach((purchase) => {
      this.addPurchaseLine(purchase.timestamp, purchase.upgradeId, purchase.price);
    });
    this.buildSummary();
    return this.final_report;
  }

  buildTitle() {
    this.final_report = this.getHorizontalLine();
    this.final_report += `Simulation during ${this.simulation.maxTime} ticks\n\n`;
  }

  addPurchaseLine(timeStamp, id, price) {
    const timeLength = timeStamp.toString().length;
    const idLength = id.length;
    let output = "";
    for (let i = 0; i < this.timeStampMaxLength - timeLength; i++) {
      output += ' ';
    }
    output += timeStamp;
    output += ' | ';
    output += id;
    for (let i = 0; i < this.purchaseMaxLength - idLength; i++) {
      output += ' ';
    }
    output += ' | ';
    output += price.toString();
    output += '\n';
    this.final_report += output;
  }

  buildSummary() {
    this.final_report += '\n';
    this.final_report += 'Simulation completed. Remaining resources:\n';
    resourcesIdList.forEach((resId) => {
      const resAmount = this.simulation.game.stock.getCurrentAmount(resId);
      if (resAmount > 0) {
        this.final_report += `${resId} | ${resAmount}\n`;
      }
    });

    this.final_report += this.getHorizontalLine();
  }

  getHorizontalLine() {
    let header = '';
    for (let i = 0; i < 45; i++) {
      header += '*';
    }
    header += '\n';
    return header;
  }
}

export { SimulationReport };
