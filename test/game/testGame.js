import { expect } from 'chai';
import { describe } from 'mocha';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { Game } from '../../src/game/Game';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { resourceId } from '../../src/resources/Resource';
import { Time } from '../../src/physics/time';

require('../upgrades/testUpgradeManager');
require('../upgrades/testUpgradeStore');
require('../resources/testResourceCollector');
require('../physics/testPhysicsComputer');

describe('Game state', () => {
  it('init speed', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const game = new Game(manager, stock);
    const speed = game.stock.getCurrentAmount(resourceId.ship_speed);
    expect(speed).to.eql(0);
  });
  it('init distance', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const game = new Game(manager, stock);
    const speed = game.stock.getCurrentAmount(resourceId.ship_speed);
    expect(speed).to.eql(0);
  });
  it('buy push', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 100);
    const game = new Game(manager, stock);
    const result = game.store.buyUpgrade(upgradesId.i_kinetic_push);
    expect(result).to.be.true;
  });
  it('first speed', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 100);
    const game = new Game(manager, stock);
    game.store.buyUpgrade(upgradesId.i_kinetic_push);
    const speed = game.stock.getCurrentAmount(resourceId.ship_speed);
    expect(speed).to.eql(1);
  });
  it('first distance', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 100);
    const game = new Game(manager, stock);
    game.store.buyUpgrade(upgradesId.i_kinetic_push);
    game.jumpInTime(new Time(1));
    const distance = game.stock.getCurrentAmount(resourceId.traveled_distance);
    expect(distance).to.eql(1);
  });
  it('longer time and speed', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 200);
    const game = new Game(manager, stock);
    game.store.buyUpgrade(upgradesId.i_kinetic_push);
    game.store.buyUpgrade(upgradesId.i_kinetic_push);
    game.jumpInTime(new Time(10));
    const distance = game.stock.getCurrentAmount(resourceId.traveled_distance);
    expect(distance).to.eql(20);
  });
});
