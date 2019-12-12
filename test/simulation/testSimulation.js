import { expect } from 'chai';
import { describe } from 'mocha';
import { Simulation } from '../../src/simulation/Simulation';
import { upgradesId } from '../../src/upgrades/Upgrade';
import { UpgradeManager } from '../../src/upgrades/UpgradeManager';
import { ResourcesStock } from '../../src/resources/ResourcesStock';
import { Game } from '../../src/game/Game';
import { resourceId } from '../../src/resources/Resource';


describe('Simulation getNextUpgrade', () => {
  it('first upgrade to buy', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 1);
    const nextUpgrade = simulation.getNextUpgradeToBuy();
    expect(nextUpgrade).to.eql(upgradesId.st_terminal);
  });
  it('time until available', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 1);
    simulation.getNextUpgradeToBuy();
    expect(simulation.timeToWaitForNextUpgrade).to.eql(10);
  });
  it('first purchase', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 10);
    simulation.run();
    const purchase = simulation.getHistory()[0];
    expect(purchase.upgradeId).to.eql(upgradesId.st_terminal);
    expect(purchase.timestamp).to.eql(10);
  });
  it('clickable resource after purchase', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 10);
    simulation.run();
    const knowledge = game.stock.getCurrentAmount(resourceId.knowledge);
    const code = game.stock.getCurrentAmount(resourceId.lines_of_code);
    expect(knowledge).to.eql(0);
    expect(code).to.eql(0);
  });
  it('further next upgrade', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.st_terminal);
    manager.buyUpgrade(upgradesId.st_lvl_1_generator);
    manager.buyUpgrade(upgradesId.i_lvl_1_coil);
    manager.buyUpgrade(upgradesId.prog_gps);
    const stock = new ResourcesStock();
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 10);
    const nextUp = simulation.getNextUpgradeToBuy();
    expect(nextUp).to.eql(upgradesId.sc_kinetic_power);
  });
  it('amount coil bought', () => {
    const manager = new UpgradeManager();
    const stock = new ResourcesStock();
    stock.addResource(resourceId.steel, 170);
    stock.addResource(resourceId.iron, 15);
    stock.addResource(resourceId.copper, 20);
    stock.addResource(resourceId.knowledge, 50);
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 50);
    simulation.run();
    const coil = simulation.game.collector.computer.coilLevel;
    expect(coil).to.eql(1);
  });
  it('joule production', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.st_terminal);
    manager.buyUpgrade(upgradesId.st_lvl_1_generator);
    const stock = new ResourcesStock();
    stock.addResource(resourceId.copper, 20);
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 10);
    simulation.run();
    const joule = simulation.game.stock.getCurrentAmount(resourceId.joule);
    expect(joule).to.eql(10);
  });
  it('test speed', () => {
    const manager = new UpgradeManager();
    manager.buyUpgrade(upgradesId.prog_kinetic_transformation);
    const stock = new ResourcesStock();
    stock.addResource(resourceId.joule, 100);
    const game = new Game(manager, stock);
    const simulation = new Simulation(game, 1);
    simulation.run();
    const hist = simulation.getHistory();
    const speed = simulation.game.stock.getCurrentAmount(resourceId.ship_speed);
    expect(speed).to.eql(1);
  });
  // it('knowledge generation', () => {
  //   const manager = new UpgradeManager();
  //   manager.buyUpgrade(upgradesId.st_terminal);
  //   manager.buyUpgrade(upgradesId.st_lvl_1_generator);
  //   manager.buyUpgrade(upgradesId.i_lvl_1_coil);
  //   manager.buyUpgrade(upgradesId.prog_gps);
  //   const stock = new ResourcesStock();
  //   const game = new Game(manager, stock);
  //   const simulation = new Simulation(game, 49);
  //   simulation.run();
  //   const knowledge = game.stock.getCurrentAmount(resourceId.knowledge);
  //   expect(knowledge).to.eql(49);
  // });
});
