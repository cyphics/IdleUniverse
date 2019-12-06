import { expect } from 'chai';

import { describe } from 'mocha';
import { Acceleration } from '../../src/physics/Acceleration';
import { numToString } from '../../src/physics/physicsUtils';

describe('numToSting', () => {
  /**
     * Tests for values below 1+e12
      */

  it('0', () => {
    const result = numToString(0);
    const expected = '0';
    expect(result).to.eql(expected);
  });
  it('1000', () => {
    const result = numToString(1000);
    const expected = '1\'000';
    expect(result).to.eql(expected);
  });
  it('10000', () => {
    const result = numToString(10000);
    const expected = '10\'000';
    expect(result).to.eql(expected);
  });
  it('million', () => {
    const result = numToString(1000000);
    const expected = '1\'000\'000';
    expect(result).to.eql(expected);
  });
  it('billion', () => {
    const result = numToString(1000000000);
    const expected = '1\'000\'000\'000';
    expect(result).to.eql(expected);
  });
  it('999 billion', () => {
    const result = numToString(999999999999);
    const expected = '999\'999\'999\'999';
    expect(result).to.eql(expected);
  });
  it('shorten decimal', () => {
    const result = numToString(1.1243124);
    const expected = '1.1243';
    expect(result).to.eql(expected);
  });
  it('remove irrelevant 0s', () => {
    const result = numToString(1.120024223);
    const expected = '1.12';
    expect(result).to.eql(expected);
  });
  it('remove decimal entirely', () => {
    const result = numToString(1.0000142334913595);
    const expected = '1';
    expect(result).to.eql(expected);
  });
  it('remove decimal when value too big', () => {
    const result = numToString(4129.2);
    const expected = '4\'129';
    expect(result).to.eql(expected);
  });

  /**
     * Test values above 1+e12
     */
  it('1+e12', () => {
    const result = numToString(999999999999 + 1);
    const expected = '1e+12';
    expect(result).to.eql(expected);
  });
});
