import {it, describe, expect} from "vitest";
import { toggleSortState } from "./toggleSortState";
import type { TableSortSort } from "../../../types/sort";
import type { TableColumnsColumn } from "../../../types/columns";

interface Data {
    id: string,
    size: number,
    options: ['a','b']
}

describe('toggleSortState', () => {
  const colA:TableColumnsColumn<Data> = {
    id: 'id',
    label: 'sdsd',
    visible: true,
    render: function (): React.ReactNode {
      throw new Error("Function not implemented.");
    }
  };
    const colB:TableColumnsColumn<Data> = {
    id: 'size',
    label: 'dssdsd',
    visible: false,
    render:()=>null
  };

  it('switches direction when clicking same column', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'asc' };
    const result = toggleSortState<Data>(prev, colA);
    expect(result.direction).toBe('desc');
  });

  it('resets to asc when clicking different column', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'desc' };
    const result = toggleSortState<Data>(prev, colB);
    expect(result).toEqual({ column: colB, direction: 'asc' });
  });

  it('handles null column', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'asc' };
    const result = toggleSortState<Data>(prev, null);
    expect(result).toEqual({ column: null, direction: 'asc' });
  });

  it('does not mutate previous state', () => {
    const prev:TableSortSort<Data> = { column: colA, direction: 'asc' };
    const result = toggleSortState<Data>(prev, colA);
    expect(result).not.toBe(prev);
  });
});
