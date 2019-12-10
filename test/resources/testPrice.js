import { expect } from 'chai';
import { describe } from 'mocha';
import { resourceId } from '../../src/resources/Resource';
import { Price, ResourceAmount } from '../../src/resources/Price';

describe('Price comparison', () => {
  it('test identity empty', () => {
    const p1 = new Price();
    const p2 = new Price();
    expect(p1).to.be.eql(p2);
  });
  it('test identity not empty', () => {
    const p1 = new Price([new ResourceAmount(resourceId.kinetic_energy, 10)]);
    const p2 = new Price([new ResourceAmount(resourceId.kinetic_energy, 10)]);
    expect(p1).to.be.eql(p2);
  });
  it('test difference ', () => {
    const p1 = new Price([new ResourceAmount(resourceId.kinetic_energy, 10)]);
    const p2 = new Price([new ResourceAmount(resourceId.kinetic_energy, 5)]);
    expect(p1).to.be.eql(p2);
  });
});
describe('Price getResources', () => {
  it('get empty resource', () => {
    const price = new Price([new ResourceAmount(resourceId.kinetic_energy, 10)]);
    const resourceAmount = price.getAmount(resourceId.dark_matter);
    expect(resourceAmount).to.be.eql(0);
  });
  it('set 1 resource', () => {
    const price = new Price([new ResourceAmount(resourceId.kinetic_energy, 10)]);
    const resourceAmount = price.getAmount(resourceId.kinetic_energy);
    expect(resourceAmount).to.be.eql(10);
  });
  it('set 2 resources', () => {
    const price = new Price([
      new ResourceAmount(resourceId.kinetic_energy, 10),
      new ResourceAmount(resourceId.dark_matter, 10),
    ]);
    const resourceAmount = price.getAmount(resourceId.kinetic_energy);
    expect(resourceAmount).to.be.eql(10);
  });
});

describe('Price addResource', () => {
  it('add empty resource', () => {
    const price = new Price();
    price.addResource(new ResourceAmount(resourceId.kinetic_energy, 0));
    const finalAmount = price.getAmount(resourceId.kinetic_energy);
    expect(finalAmount).to.be.eql(0);
  });
  it('add new resource', () => {
    const price = new Price();
    price.addResource(new ResourceAmount(resourceId.kinetic_energy, 1));
    const finalAmount = price.getAmount(resourceId.kinetic_energy);
    expect(finalAmount).to.be.eql(1);
  });
  it('add existing resource', () => {
    const price = new Price([new ResourceAmount(resourceId.kinetic_energy, 10)]);
    price.addResource(new ResourceAmount(resourceId.kinetic_energy, 1));
    const finalAmount = price.getAmount(resourceId.kinetic_energy);
    expect(finalAmount).to.be.eql(11);
  });
});
