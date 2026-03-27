import { describe, it, expect } from 'vitest'
import { reorderColumns } from './reorderColumns';
import type { TableColumnsColumns } from '../../../types/columns';

interface Data {
    id: string,
    size: number,
    options: ['a','b']
}

describe('reorderColumns', () => {
  const cols:TableColumnsColumns<Data> = [
    {
        id: 'id',
        label: '',
        visible: false,
        render: function (): React.ReactNode {
            throw new Error('Function not implemented.');
        }
    },
    {
        id: 'size',
        label: '',
        visible: false,
        render: function (): React.ReactNode {
            throw new Error('Function not implemented.');
        }
    },
    {
        id: 'options',
        label: '',
        visible: false,
        render: function (): React.ReactNode {
            throw new Error('Function not implemented.');
        }
    }
  ];

  it('moves item from one index to another', () => {
    const result = reorderColumns<Data>(cols, 'id', 'options');
    expect(result.map(c => c.id)).toEqual(['size', 'options', 'id']);
  });

  it('moves item backwards', () => {
    const result = reorderColumns<Data>(cols, 'options', 'id');
    expect(result.map(c => c.id)).toEqual(['options', 'id', 'size']);
  });

  it('does not mutate original array', () => {
    const result = reorderColumns<Data>(cols, 'id', 'options');
    expect(result).not.toBe(cols);
  });

  it('returns original array when id not found', () => {
    const result = reorderColumns<Data>(cols, 'x', 'id');
    expect(result).toEqual(cols);
  });

  it('works with empty array', () => {
    expect(reorderColumns<Data>([], 'id', 'size')).toEqual([]);
  });
});
