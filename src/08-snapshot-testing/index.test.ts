import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const element2 = { value: '2', next: null };
    const element1 = { value: '1', next: element2 }
    const elements = [element1, element2];
    const res = generateLinkedList(elements);
    expect(res).toStrictEqual({
      value: {
        value: '1',
        next: {
          value: '2',
          next: null,
        },
      },
      next: {
        value: {
          value: '2',
          next: null,
        },
        next: {
          value: null,
          next: null,
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const element2 = { value: '2', next: null };
    const element1 = { value: '1', next: element2 }
    const elements = [element1, element2];
    const res = generateLinkedList(elements);
    expect(res).toMatchSnapshot();
  });
});
