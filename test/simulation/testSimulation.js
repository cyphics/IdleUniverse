import { expect } from 'chai';
import { describe } from 'mocha';
import { Simulation, strategyId } from '../../src/simulation/Simulation';
import { upgradesId } from '../../src/upgrades/Upgrade';


describe('test getNextUpgrade', () => {
  it('broken', () => {
    const simulation = new Simulation();
    const nextUpgrade = simulation.getNextUpgrade();
    expect(nextUpgrade).to.eql(upgradesId.i_quantum_coil);
  });
  it('cheapest', () => {
    const simulation = new Simulation(strategyId.cheapest);
    const nextUpgrade = simulation.getNextUpgrade();
    expect(nextUpgrade).to.eql(upgradesId.i_quantum_coil);
  });
});
