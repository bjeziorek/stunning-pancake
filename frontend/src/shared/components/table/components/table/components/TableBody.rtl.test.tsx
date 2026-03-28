import { render, screen } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import { vi } from 'vitest';
import type { TableColumnsColumns } from '../../../types/columns';
import { TableBody } from './TableBody';

describe('TableHeader tests', () => {

    interface Data {
        name: string,
        id: number,
        age: number
    }

    const columns1: TableColumnsColumns<Data> = [
        { id: "name", label: "Name", visible: true, render: (row: Data) => row.name },
    ];

    const columns2: TableColumnsColumns<Data> = [
        { id: "name", label: "Name", visible: true, render: (row: Data) => row.name },
        { id: "age", label: "Age", visible: false, render: (row: Data) => row.age },
    ];

    it("renders one row per item in paginated", () => {
        const data: Data[] = [
            { id: 1, name: "Alice", age: 30 },
            { id: 2, name: "Bob", age: 20 },
        ];


        render(<Theme><TableBody paginated={data} columns={columns1} /></Theme>);

        const rows = screen.getAllByRole("row");
        expect(rows.length).toBe(data.length);
    });

    it("renders only visible columns", () => {
        const data = [{ id: 1, name: "Alice", age: 30 }];


        render(<TableBody paginated={data} columns={columns2} />);

        expect(screen.getByText("Alice")).toBeInTheDocument();
        expect(screen.queryByText("30")).not.toBeInTheDocument();
    });

    it("calls render(model) for each visible column", () => {
        const data = [{ id: 1, name: "Alice", age: 40 }];

        const renderName = vi.fn().mockReturnValue("Alice");

        const columns: TableColumnsColumns<Data> = [
            { id: "name", label: "Name", visible: true, render: renderName },
        ];

        render(<TableBody paginated={data} columns={columns} />);

        expect(renderName).toHaveBeenCalledWith(data[0]);
    });

    it("renders cell content returned by render()", () => {
        const data = [{ id: 1, name: "Alice", age: 29 }];

        const columns: TableColumnsColumns<Data> = [
            { id: "name", label: "Name", visible: true, render: (row) => `Hello ${row.name}` },
        ];

        render(<TableBody paginated={data} columns={columns} />);

        expect(screen.getByText("Hello Alice")).toBeInTheDocument();
    });

});
