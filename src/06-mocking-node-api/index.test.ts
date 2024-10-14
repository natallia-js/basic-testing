import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import * as mockFunc from './mocking.functions';
import { join, existsSync, readFile } from './mocking.functions';

jest.mock('./index', () => {
  const originalModule = jest.requireActual<typeof import('./index')>('./index');
  return {
    __esModule: true,
    ...originalModule,
    readFileAsynchronously: async (pathToFile: string) => {
      const fullPath = join('./', pathToFile);
      if (existsSync(fullPath)) {
        const fileContent = await readFile(fullPath);
        return fileContent.toString();
      }
      return null;
    },
  };
});

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    // replacing the original implementation of setTimeout() and other timer functions
    jest.useFakeTimers();
  });

  afterAll(() => {
    // restoring timers to their normal behavior
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    // Fast-forward until all timers have been executed
    jest.runAllTimers();
     
    expect(setTimeoutSpy).toHaveBeenLastCalledWith(callback, 1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback only after timeout', () => {
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    // At this point in time, the callback should not have been called yet
    expect(callback).not.toHaveBeenCalled();
    // But setTimeout was already called
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);

    // Fast-forward until all timers have been executed
    jest.runAllTimers();
     
    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenLastCalledWith(callback, 1000);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toHaveBeenCalled();
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const join_spy = jest.spyOn(mockFunc, 'join');
    const pathToFile = 'path/to/file';
    readFileAsynchronously(pathToFile);
    expect(join_spy.mock.calls.length).toBe(1);
    const joinFunctionParamValue = join_spy.mock.lastCall?.length ? join_spy.mock.lastCall[1] : null;
    expect(join_spy.mock.lastCall?.[1]).toBe(joinFunctionParamValue);
    join_spy.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    await expect(readFileAsynchronously('path/to/file/not_exist')).resolves.toBe(null);
  });

  test('should return file content if file exists', async () => {
    await expect(readFileAsynchronously('path/to/file/exists')).resolves.toBe('file content');
  });
});
