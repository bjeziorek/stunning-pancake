import { fireEvent, render, screen } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import { vi } from 'vitest';
import userEvent from "@testing-library/user-event";
import { TableHeader } from './TableHeader';
import type { TableColumnsColumns } from '../../../types/columns';

describe('TableHeader tests', () => {
  interface Data {
    name: string,
    age: string
  }

  const columns: TableColumnsColumns<Data> = [
    { id: "name", label: "Name", visible: true, render: () => null },
    { id: "age", label: "Age", visible: false, render: () => null },
  ];

  it("renders only visible columns", () => {
    render(
      <Theme>
        <TableHeader
          columns={columns}
          setDragged={() => { }}
          handleDrop={() => { }}
          toggleSort={() => { }}
          sort={{ column: columns[0], direction: 'asc' }}
        />
      </Theme>
    );

    expect(screen.getByText("Name ▲")).toBeInTheDocument();
    expect(
      screen.getByText((text) => text.includes("Name"))
    ).toBeInTheDocument();
    expect(screen.queryByText("age")).not.toBeInTheDocument();
  });

  it("calls toggleSort when clicking a column header", async () => {
    const user = userEvent.setup();
    const toggleSort = vi.fn();

    render(
      <Theme>
        <TableHeader
          columns={columns}
          setDragged={() => { }}
          handleDrop={() => { }}
          toggleSort={toggleSort}
          sort={{ column: columns[0], direction: 'asc' }}
        />
      </Theme>
    );

    const header = screen.getByText((t) => t.includes("Name"));
    await user.click(header);

    expect(toggleSort).toHaveBeenCalledWith(columns[0]);
  });

  it("calls setDragged and handleDrop on drag events", () => {
    const setDragged = vi.fn();
    const handleDrop = vi.fn();

    render(
      <Theme>
        <TableHeader
          columns={columns}
          setDragged={setDragged}
          handleDrop={handleDrop}
          toggleSort={() => { }}
          sort={{ column: columns[0], direction: 'asc' }}
        />
      </Theme>
    );

    const header = screen.getByText((t) => t.includes("Name"));

    fireEvent.dragStart(header);
    fireEvent.drop(header);

    expect(setDragged).toHaveBeenCalledWith("name");
    expect(handleDrop).toHaveBeenCalledWith("name");
  });
  it("shows sort indicator for sorted column", () => {

    render(
      <Theme>
        <TableHeader
          columns={columns}
          setDragged={() => { }}
          handleDrop={() => { }}
          toggleSort={() => { }}
          sort={{ column: columns[0], direction: 'asc' }}
        />
      </Theme>
    );

    const header = screen.getByText((t) => t.includes("Name"));
    expect(header).toHaveTextContent("▲");
  });


})