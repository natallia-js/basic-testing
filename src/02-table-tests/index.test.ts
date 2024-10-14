import { simpleCalculator, Action } from './index';

export type TestCaseType = {
  a: unknown;
  b: unknown;
  action: unknown;
  expected: unknown;
};

const testCases: TestCaseType[] = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 0, b: 20, action: Action.Add, expected: 20 },
    { a: -2.5, b: 2, action: Action.Add, expected: -0.5 },

    { a: 1, b: 2, action: Action.Subtract, expected: -1 },
    { a: 16.7, b: 2, action: Action.Subtract, expected: 14.7 },
    { a: -3, b: -6, action: Action.Subtract, expected: 3 },

    { a: 15, b: 2, action: Action.Multiply, expected: 30 },
    { a: -1.5, b: 2, action: Action.Multiply, expected: -3 },
    { a: 0, b: 2, action: Action.Multiply, expected: 0 },

    { a: 16, b: 2, action: Action.Divide, expected: 8 },
    { a: -16, b: 2, action: Action.Divide, expected: -8 },
    { a: 1.6, b: -2, action: Action.Divide, expected: -0.8 },

    { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
    { a: 2, b: -3, action: Action.Exponentiate, expected: 0.125 },
    { a: -5, b: 2, action: Action.Exponentiate, expected: 25 },

    { a: 1, b: 2, action: 'Integral', expected: null },

    { a: '1', b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator table tests', () => {
  test.each(testCases)('%#. %j', ({ a, b, action, expected }: TestCaseType) => {
    expect(simpleCalculator({ a, b, action })).toBe(expected);
  });
});
