import { describe, it, expect } from 'vitest'
import { paginate } from './paginate'

const DATA = Array.from({ length: 12 }, (_, i) => i + 1);

describe('paginate', () => {
  it('returns first page', () => {
    expect(paginate(DATA, 1, 5)).toEqual([1,2,3,4,5]);
  });

  it('returns second page', () => {
    expect(paginate(DATA, 2, 5)).toEqual([6,7,8,9,10]);
  });

  it('returns last page with leftovers', () => {
    expect(paginate(DATA, 3, 5)).toEqual([11,12]);
  });

  it('returns empty array when page is out of range', () => {
    expect(paginate(DATA, 5, 5)).toEqual([])
  });
});
