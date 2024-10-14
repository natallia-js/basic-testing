import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 0, b: 20, action: Action.Add })).toBe(20);
    expect(simpleCalculator({ a: -2.5, b: 2, action: Action.Add })).toBe(-0.5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toBe(-1);
    expect(simpleCalculator({ a: 16.7, b: 2, action: Action.Subtract })).toBe(14.7);
    expect(simpleCalculator({ a: -3, b: -6, action: Action.Subtract })).toBe(3);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 15, b: 2, action: Action.Multiply })).toBe(30);
    expect(simpleCalculator({ a: -1.5, b: 2, action: Action.Multiply })).toBe(-3);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Multiply })).toBe(0);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 16, b: 2, action: Action.Divide })).toBe(8);
    expect(simpleCalculator({ a: -16, b: 2, action: Action.Divide })).toBe(-8);
    expect(simpleCalculator({ a: 1.6, b: -2, action: Action.Divide })).toBe(-0.8);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate })).toBe(8);
    expect(simpleCalculator({ a: 2, b: -3, action: Action.Exponentiate })).toBe(0.125);
    expect(simpleCalculator({ a: -5, b: 2, action: Action.Exponentiate })).toBe(25);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'Integral' })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBe(null);
  });
});
