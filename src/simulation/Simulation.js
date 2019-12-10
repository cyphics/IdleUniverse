import { upgradesId } from '../upgrades/Upgrade';

const strategyId = {
  broken: 'broken',
  cheapest: 'cheapest',
};

class Simulation {
  constructor(stratId) {
    this.stratId = stratId;
  }

  getNextUpgrade() {
    switch (this.stratId) {
      case strategyId.cheapest:
      case strategyId.broken:
      default:
        return upgradesId.i_quantum_coil;
    }
  }
}

export { Simulation, strategyId };
