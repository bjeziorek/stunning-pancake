import { fireEvent, render, screen } from '@testing-library/react';
import TableWrapper from './TableWrapper';
import { filterMock, newData, newDataColumns } from '@/modules/nn/pages/testMock';
import { Theme } from '@radix-ui/themes';
import { vi } from 'vitest';
import userEvent from "@testing-library/user-event";

describe('TableWrapper renders and has required interactions', () => {
    it('renders table menu', () => {
        render(
            <Theme>
                <TableWrapper columns={newDataColumns} data={newData} filters={filterMock} />
            </Theme>
        );
        expect(screen.getByText("table.tableMenu")).toBeInTheDocument();
    });
    it('renders simple search', () => {
        render(
            <Theme>
                <TableWrapper columns={newDataColumns} data={newData} filters={filterMock} />
            </Theme>
        );
        expect(screen.getByText("table.simpleSearch")).toBeInTheDocument();
    });

    it("renders search box", () => {

        render(
            <Theme>
                <TableWrapper columns={newDataColumns} data={newData} filters={filterMock} />
            </Theme>
        );
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    })

    //     it("filters results after debounce", async () => {
    // //         console.error = vi.fn();
    // // console.warn = vi.fn();
    //         vi.useFakeTimers();
    //         const user = userEvent.setup({ delay: null });

    //         try {
    //   render(
    //     <Theme>
    //       <TableWrapper columns={newDataColumns} data={newData} filters={filterMock} />
    //     </Theme>
    //   );
    // } catch (e) {
    //   console.log("ERROR:", e);
    // }
    // // console.log(console.error.mock.calls);
    //        screen.debug(undefined, Infinity);

    //         const input = screen.getByRole("textbox");

    //         await user.type(input, "gpt");
    //         expect(screen.queryByText("resnet50")).toBeInTheDocument();

    //         vi.advanceTimersByTime(300);
    //         await Promise.resolve();
    //         expect(screen.getByText("gpt")).toBeInTheDocument();
    //         expect(screen.queryByText("resnet50")).not.toBeInTheDocument();
    //     });

// it("filters results after debounce", async () => {
//   vi.useFakeTimers();

// //   const user = userEvent.setup({
// //     advanceTimers: vi.advanceTimersByTime,
// //   });
//    const user = await userEvent.setup({ advanceTimers: vi.advanceTimersByTime });

//   render(
//     <Theme>
//       <TableWrapper columns={newDataColumns} data={newData} filters={filterMock} />
//     </Theme>
//   );

//   const input = screen.getByRole("textbox");

//   // wpisujemy tekst
// //   await user.type(input, "gpt");
// // fireEvent.change(input, { target: { value: "gpt" } });

// await user.clear(input);
// await user.type(input, "gpt", { delay: 0 });

//   // przed debounce — dane jeszcze nie przefiltrowane
//   expect(screen.getByText(/resnet50/i)).toBeInTheDocument();

//   // odpalamy debounce
//   vi.advanceTimersByTime(300);

//   // czekamy na re-render
//   await Promise.resolve();
//   await Promise.resolve();

//   // po debounce — powinno być przefiltrowane
//  const results = screen.getAllByText(/gpt/i);
// expect(results.length).toBeGreaterThan(0);
//   expect(screen.queryByText(/resnet50/i)).not.toBeInTheDocument();
// });

it("filters results after debounce", async () => {
  vi.useFakeTimers();
// function triggerRadixThemesChange(input: HTMLElement, value: string) {
//   const reactPropsKey = Object.keys(input).find(k => k.startsWith("__reactProps$"));
//   const props = (input as any)[reactPropsKey!];
//   props.onChange({ target: { value } });
// }


  const { container } =   render(
    <Theme>
      <TableWrapper columns={newDataColumns} data={newData} filters={filterMock} />
    </Theme>
  );
//screen.debug()
  const input = screen.getByRole("textbox");

  // jedno zdarzenie zmiany — kluczowe
//   fireEvent.change(input, { target: { value: "gpt" } });
const realInput = container.querySelector("input.rt-TextFieldInput")  as HTMLInputElement | null;

fireEvent.input(input, { target: { value: "gpt" } });
//   triggerRadixThemesChange(realInput!, "gpt");
// console.log(realInput)

  // przed debounce
  expect(screen.getByText(/resnet50/i)).toBeInTheDocument();

  // odpal debounce
  vi.advanceTimersByTime(300);

  // React 18 potrzebuje dwóch microtasków
  await Promise.resolve();
  await Promise.resolve();

  // po debounce
  expect(screen.queryByText(/resnet50/i)).not.toBeInTheDocument();
  expect(screen.getAllByText(/gpt/i).length).toBeGreaterThan(0);
});

})

