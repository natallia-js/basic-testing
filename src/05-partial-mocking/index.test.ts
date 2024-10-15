import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => {},
    mockTwo: () => {},
    mockThree: () => {},
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const console_log_spy = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(console_log_spy.mock.calls.length).toBe(0);
    console_log_spy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const console_log_spy = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(console_log_spy.mock.calls.length).toBe(1);
    console_log_spy.mockRestore();
  });
});
