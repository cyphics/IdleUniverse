import { expect } from 'chai';
import { describe } from 'mocha';
import { resourceId } from '../../src/resources/Resource';
import { Price, ResourceAmount } from '../../src/resources/Price';

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

describe('Price multiply', () => {
  it('factor 1 (no change)', () => {
    const price = new Price();
    price.addResource(new ResourceAmount(resourceId.kinetic_energy, 10));
    price.multiply(1);
    const kinAmount = price.getAmount(resourceId.kinetic_energy);
    expect(kinAmount).to.be.eql(10);
  });
  it('factor 2 ', () => {
    const price = new Price();
    price.addResource(new ResourceAmount(resourceId.kinetic_energy, 10));
    const newPrice = price.multiply(2);
    const kinAmount = newPrice.getAmount(resourceId.kinetic_energy);
    expect(kinAmount).to.be.eql(20);
  });
  it('multiple resources ', () => {
    const price = new Price();
    price.addResource(new ResourceAmount(resourceId.kinetic_energy, 10));
    price.addResource(new ResourceAmount(resourceId.dark_matter, 5));
    const newPrice = price.multiply(2);
    const kinAmount = newPrice.getAmount(resourceId.kinetic_energy);
    const darkMatter = newPrice.getAmount(resourceId.dark_matter);
    expect(kinAmount).to.be.eql(20);
    expect(darkMatter).to.be.eql(10);
  });
  it('original price not modified ', () => {
    const price = new Price();
    price.addResource(new ResourceAmount(resourceId.kinetic_energy, 10));
    price.multiply(2);
    const kinAmount = price.getAmount(resourceId.kinetic_energy);
    expect(kinAmount).to.be.eql(10);
  });
});