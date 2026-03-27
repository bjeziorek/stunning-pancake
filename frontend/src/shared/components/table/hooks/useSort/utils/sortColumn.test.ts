import {describe, it, expect} from 'vitest';
import {sortColumn} from './sortColumn';

describe('sortColumn', () => {
  const data = [
    { age: 30, name: 'Anna' },
    { age: 20, name: 'John' }
  ];

  it('sorts numbers ascending', () => {
    const sortFn = sortColumn('age', 'asc');
    expect([...data].sort(sortFn).map(r => r.age)).toEqual([20, 30]);
  });

  it('sorts numbers descending', () => {
    const sortFn = sortColumn('age', 'desc');
    expect([...data].sort(sortFn).map(r => r.age)).toEqual([30, 20]);
  });

  it('sorts strings ascending', () => {
    const sortFn = sortColumn('name', 'asc');
    expect([...data].sort(sortFn).map(r => r.name)).toEqual(['Anna', 'John']);
  });

  it('returns 0 when no column provided', () => {
    const sortFn = sortColumn(null, 'asc');
    expect(sortFn(data[0], data[1])).toBe(0);
  });
});
