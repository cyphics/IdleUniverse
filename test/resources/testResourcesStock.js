import { expect } from 'chai';
import { describe } from 'mocha';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { resourceId } from '../../src/resources/Resource';


describe('test add/remove stock', () => {
  it('empty stock', () => {
    const stock = new ResourcesStock();
    const amount = stock.getCurrentAmount(resourceId.kinetic_energy);
    expect(amount).to.be.eql(0);
  });
  it('add energy', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.kinetic_energy, 1);
    const amount = stock.getCurrentAmount(resourceId.kinetic_energy);
    expect(amount).to.be.eql(1);
  });
  it('test add only energy', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.kinetic_energy, 1);
    const amount = stock.getCurrentAmount(resourceId.dark_matter);
    expect(amount).to.be.eql(0);
  });
  it('test remove resource', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.kinetic_energy, 2);
    stock.takeResource(resourceId.kinetic_energy, 1);
    const amount = stock.getCurrentAmount(resourceId.kinetic_energy);
    expect(amount).to.be.eql(1);
  });
  it('test remove more than existing amount', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.kinetic_energy, 1);
    stock.takeResource(resourceId.kinetic_energy, 2);
    const amount = stock.getCurrentAmount(resourceId.kinetic_energy);
    expect(amount).to.be.eql(0);
  });
});
