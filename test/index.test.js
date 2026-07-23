const { capitalizeWords, filterActiveUsers, logAction } = require('../index')
describe('capitalizeWords', () => {
  test('capitalizes each word in a normal sentence', () => {
    expect(capitalizeWords('hello world')).toBe('Hello World');
  });

  test('returns an empty string when given an empty string', () => {
    expect(capitalizeWords('')).toBe('');
  });

  test('capitalizes letters after hyphens as well as word starts', () => {
    expect(capitalizeWords('hello-world')).toBe('Hello-World');
  });

  test('capitalizes a single-word string', () => {
    expect(capitalizeWords('hello')).toBe('Hello');
  });
});

describe('filterActiveUsers', () => {
  test('returns only active users from a mixed array', () => {
    const users = [
      { name: 'Alice', isActive: true },
      { name: 'Bob', isActive: false },
      { name: 'Carol', isActive: true },
    ];
    expect(filterActiveUsers(users)).toEqual([
      { name: 'Alice', isActive: true },
      { name: 'Carol', isActive: true },
    ]);
  });

  test('returns an empty array when all users are inactive', () => {
    const users = [
      { name: 'Bob', isActive: false },
      { name: 'Dave', isActive: false },
    ];
    expect(filterActiveUsers(users)).toEqual([]);
  });

  test('returns an empty array when given an empty array', () => {
    expect(filterActiveUsers([])).toEqual([]);
  });
});

describe('logAction', () => {
  test('generates a correctly formatted log string for valid inputs', () => {
    const result = logAction('login', 'Alice');
    expect(result).toMatch(
      /^User Alice performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
    );
  });

  test('throws an error when action is missing', () => {
    expect(() => logAction(undefined, 'Alice')).toThrow(
      'Both action and username are required.'
    );
  });

  test('throws an error when username is missing', () => {
    expect(() => logAction('login', undefined)).toThrow(
      'Both action and username are required.'
    );
  });

  test('throws an error when both action and username are empty strings', () => {
    expect(() => logAction('', '')).toThrow(
      'Both action and username are required.'
    );
  });
});

