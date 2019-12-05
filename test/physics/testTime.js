import { expect } from 'chai';

import {timeUnit, TimeUnit, Time} from '../../src/physics/time'
import {describe} from "mocha";

describe('time units', () => {
    it('create DistanceUnit', () => {
        let time = new TimeUnit(1, "unit name");
        expect(time.value).to.eql(1);
        expect(time.name).to.eql("unit name");
    });
    it('millisecond', () => {
        let under_test = timeUnit.millisecond.value;
        expect(under_test).to.eql(1);
    });
    it('second', () => {
        let under_test = timeUnit.second.value;
        expect(under_test).to.eql(1000);
    });
    it('minute', () => {
        let under_test = timeUnit.minute.value;
        expect(under_test).to.eql(60000);
    });
    it('hour', () => {
        let under_test = timeUnit.hour.value;
        expect(under_test).to.eql(3600000);
    });
    it('day', () => {
        let under_test = timeUnit.day.value;
        expect(under_test).to.eql(86400000);
    });
    it('year', () => {
        let under_test = timeUnit.year.value;
        expect(under_test).to.eql(31557600000);
    });
    it('galactic year', () => {
        let under_test = timeUnit.galactic_year.value;
        expect(under_test).to.eql(timeUnit.year.value * 233000000);
    });
});


describe('Time creation', () => {
    it('build Time()', () => {
        let under_test = new Time(1, timeUnit.millisecond);
        expect(under_test.getValue(timeUnit.millisecond)).to.eql(1);
    });

    it('default absolute_value', () => {
        let under_test = new Time(1, timeUnit.second);
        expect(under_test.getValue()).to.eql(1);
    });
    it('absolute absolute_value minute', () => {
        let under_test = new Time(1, timeUnit.hour);
        expect(under_test.getValue(timeUnit.millisecond)).to.eql(3600000);
    });

    it('smaller unit', () => {
        let under_test = new Time(1, timeUnit.hour);
        expect(under_test.getValue(timeUnit.minute)).to.eql(60);
    });
    it('bigger unit', () => {
        let under_test = new Time(1, timeUnit.hour);
        expect(under_test.getValue(timeUnit.day)).to.eql(0.041666666666666664);
    });
});

describe('Time toString', () => {
    it('1, millisecond', () => {
        let under_test = new Time(1, timeUnit.millisecond);
        expect(under_test.toString()).to.eql("1 millisecond");
    });
    it('1, second', () => {
        let under_test = new Time(1, timeUnit.second);
        expect(under_test.toString()).to.eql("1 second");
    });
    it('1, minute', () => {
        let under_test = new Time(1, timeUnit.minute);
        expect(under_test.toString()).to.eql("1 minute");
    });
    it('1, hour', () => {
        let under_test = new Time(1, timeUnit.hour);
        expect(under_test.toString()).to.eql("1 hour");
    });
    it('1, day', () => {
        let under_test = new Time(1, timeUnit.day);
        expect(under_test.toString()).to.eql("1 day");
    });
    it('1, year', () => {
        let under_test = new Time(1, timeUnit.year);
        expect(under_test.toString()).to.eql("1 year");
    });
    it('second and minute', () => {
        let under_test = new Time(1.5, timeUnit.minute);
        expect(under_test.toString()).to.eql("1 minute, 30 seconds");
    });
    it('second in milliseconds', () => {
        let under_test = new Time(1000, timeUnit.millisecond);
        expect(under_test.toString()).to.eql("1 second");
    });
    it('too much milliseconds', () => {
        let under_test = new Time(1010, timeUnit.millisecond);
        expect(under_test.toString()).to.eql("1 second, 10 milliseconds");
    });
    it('minute in seconds', () => {
        let under_test = new Time(60, timeUnit.second);
        expect(under_test.toString()).to.eql("1 minute");
    });
    it('too much seconds', () => {
        let under_test = new Time(62, timeUnit.second);
        expect(under_test.toString()).to.eql("1 minute, 2 seconds");
    });
    it('hour in minutes', () => {
        let under_test = new Time(60, timeUnit.minute);
        expect(under_test.toString()).to.eql("1 hour");
    });
    it('lots of minutes', () => {
        let under_test = new Time(90, timeUnit.minute);
        expect(under_test.toString()).to.eql("1 hour, 30 minutes");
    });
    it('day in hours', () => {
        let under_test = new Time(24, timeUnit.hour);
        expect(under_test.toString()).to.eql("1 day");
    });
    it('lots of hours', () => {
        let under_test = new Time(26, timeUnit.hour);
        expect(under_test.toString()).to.eql("1 day, 2 hours");
    });
    it('year in days', () => {
        let under_test = new Time(365.25, timeUnit.day);
        expect(under_test.toString()).to.eql("1 year");
    });
    it('too few days', () => {
        let under_test = new Time(365, timeUnit.day);
        expect(under_test.toString()).to.eql("365 days");
    });
    it('lots of days', () => {
        let under_test = new Time(367.25, timeUnit.day);
        expect(under_test.toString()).to.eql("1 year, 2 days");
    });
    it('galactic year in years', () => {
        let under_test = new Time(233000004, timeUnit.year);
        expect(under_test.toString()).to.eql("1 galactic year");
    });
});
describe('add time', () => {
    it('add 1 hour to 1 day', () => {
        let day = new Time(1, timeUnit.day);
        day.add(new Time(1, timeUnit.hour));
        expect(day.toString()).to.eql("1 day, 1 hour");
    });
    it('add 1 minute to 1 day', () => {
        let day = new Time(1, timeUnit.day);
        day.add(new Time(1, timeUnit.minute));
        expect(day.toString()).to.eql("1 day");
    });
});