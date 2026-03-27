import { type TableColumnsColumn } from '../../../types/columns';
import { describe, it, expect } from 'vitest'
import { toggleColumnVisibility } from "./toggleColumnVisibility";

interface Data {
  id: string
}

const cols: TableColumnsColumn<Data> = {
  id: 'id',
  visible: true,
  label: 'test',
  render: () => null
};

describe('toggleColumnVisibility', () => {
  it('toggles visibility of the correct column', () => {
    const result = toggleColumnVisibility<Data>(cols, 'id');
    expect(result.visible).toBe(false);
  });

  it('does not mutate original array', () => {
    const result = toggleColumnVisibility<Data>(cols, 'id');
    expect(result).not.toBe(cols);
  });

  it('returns same array when id not found', () => {
    const result = toggleColumnVisibility(cols, 'x');
    expect(result).toEqual(cols);
  });

});
