import { expect } from 'chai';

import { describe } from 'mocha';
import { Time } from '../../src/physics/time';
import { timeStandard } from '../../src/physics/timeStandard';

describe('time units', () => {
  it('millisecond', () => {
    const actual = timeStandard.millisecond.value;
    expect(actual).to.eql(1);
  });
  it('second', () => {
    const actual = timeStandard.second.value;
    expect(actual).to.eql(1000);
  });
  it('minute', () => {
    const actual = timeStandard.minute.value;
    expect(actual).to.eql(60000);
  });
  it('hour', () => {
    const actual = timeStandard.hour.value;
    expect(actual).to.eql(3600000);
  });
  it('day', () => {
    const actual = timeStandard.day.value;
    expect(actual).to.eql(86400000);
  });
  it('year', () => {
    const actual = timeStandard.year.value;
    expect(actual).to.eql(31557600000);
  });
  it('galactic year', () => {
    const actual = timeStandard.galactic_year.value;
    expect(actual).to.eql(timeStandard.year.value * 233000000);
  });
});


describe('Time creation', () => {
  it('build empty Time()', () => {
    const actual = new Time();
    expect(actual.value(timeStandard.millisecond)).to.eql(0);
  });
  it('build Time()', () => {
    const actual = new Time(1, timeStandard.millisecond);
    expect(actual.value(timeStandard.millisecond)).to.eql(1);
  });
  it('absolute absoluteValue minute', () => {
    const actual = new Time(1, timeStandard.hour);
    expect(actual.value(timeStandard.millisecond)).to.eql(3600000);
  });

  it('smaller unit', () => {
    const actual = new Time(1, timeStandard.hour);
    expect(actual.value(timeStandard.minute)).to.eql(60);
  });
  it('bigger unit', () => {
    const actual = new Time(1, timeStandard.hour);
    expect(actual.value(timeStandard.day)).to.eql(0.041666666666666664);
  });
});

describe('Time toString', () => {
  it('empty time', () => {
    const actual = new Time();
    expect(actual.toString()).to.eql('0 millisecond');
  });
  it('1, millisecond', () => {
    const actual = new Time(1, timeStandard.millisecond);
    expect(actual.toString()).to.eql('1 millisecond');
  });
  it('1, second', () => {
    const actual = new Time(1, timeStandard.second);
    expect(actual.toString()).to.eql('1 second');
  });
  it('1, minute', () => {
    const actual = new Time(1, timeStandard.minute);
    expect(actual.toString()).to.eql('1 minute');
  });
  it('1, hour', () => {
    const actual = new Time(1, timeStandard.hour);
    expect(actual.toString()).to.eql('1 hour');
  });
  it('1, day', () => {
    const actual = new Time(1, timeStandard.day);
    expect(actual.toString()).to.eql('1 day');
  });
  it('1, year', () => {
    const actual = new Time(1, timeStandard.year);
    expect(actual.toString()).to.eql('1 year');
  });
  it('second and minute', () => {
    const actual = new Time(1.5, timeStandard.minute);
    expect(actual.toString()).to.eql('1 minute, 30 seconds');
  });
  it('second in milliseconds', () => {
    const actual = new Time(1000, timeStandard.millisecond);
    expect(actual.toString()).to.eql('1 second');
  });
  it('too much milliseconds', () => {
    const actual = new Time(1010, timeStandard.millisecond);
    expect(actual.toString()).to.eql('1 second, 10 milliseconds');
  });
  it('minute in seconds', () => {
    const actual = new Time(60, timeStandard.second);
    expect(actual.toString()).to.eql('1 minute');
  });
  it('too much seconds', () => {
    const actual = new Time(62, timeStandard.second);
    expect(actual.toString()).to.eql('1 minute, 2 seconds');
  });
  it('hour in minutes', () => {
    const actual = new Time(60, timeStandard.minute);
    expect(actual.toString()).to.eql('1 hour');
  });
  it('lots of minutes', () => {
    const actual = new Time(90, timeStandard.minute);
    expect(actual.toString()).to.eql('1 hour, 30 minutes');
  });
  it('day in hours', () => {
    const actual = new Time(24, timeStandard.hour);
    expect(actual.toString()).to.eql('1 day');
  });
  it('lots of hours', () => {
    const actual = new Time(26, timeStandard.hour);
    expect(actual.toString()).to.eql('1 day, 2 hours');
  });
  it('year in days', () => {
    const actual = new Time(365.25, timeStandard.day);
    expect(actual.toString()).to.eql('1 year');
  });
  it('too few days', () => {
    const actual = new Time(365, timeStandard.day);
    expect(actual.toString()).to.eql('365 days');
  });
  it('lots of days', () => {
    const actual = new Time(367.25, timeStandard.day);
    expect(actual.toString()).to.eql('1 year, 2 days');
  });
  it('galactic year in years', () => {
    const actual = new Time(233000004, timeStandard.year);
    expect(actual.toString()).to.eql('1 galactic year');
  });
});
describe('add time', () => {
  it('add 1 hour to 1 day', () => {
    const day = new Time(1, timeStandard.day);
    day.add(new Time(1, timeStandard.hour));
    expect(day.toString()).to.eql('1 day, 1 hour');
  });
  it('add 1 minute to 1 day', () => {
    const day = new Time(1, timeStandard.day);
    day.add(new Time(1, timeStandard.minute));
    expect(day.toString()).to.eql('1 day');
  });
});
