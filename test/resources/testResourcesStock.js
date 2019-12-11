import { expect } from 'chai';
import { describe } from 'mocha';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { resourceId } from '../../src/resources/Resource';


describe('test add/remove stock', () => {
  it('empty stock', () => {
    const stock = new ResourcesStock();
    const amount = stock.getCurrentAmount(resourceId.joule);
    expect(amount).to.be.eql(0);
  });
  it('add joule', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 1);
    const amount = stock.getCurrentAmount(resourceId.joule);
    expect(amount).to.be.eql(1);
  });
  it('test add only joule', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 1);
    const amount = stock.getCurrentAmount(resourceId.dark_matter);
    expect(amount).to.be.eql(0);
  });
  it('test remove resource', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 2);
    stock.takeResource(resourceId.joule, 1);
    const amount = stock.getCurrentAmount(resourceId.joule);
    expect(amount).to.be.eql(1);
  });
  it('test remove more than existing amount', () => {
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 1);
    stock.takeResource(resourceId.joule, 2);
    const amount = stock.getCurrentAmount(resourceId.joule);
    expect(amount).to.be.eql(0);
  });
});
