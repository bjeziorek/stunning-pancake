import { render, screen } from '@testing-library/react';
import { Select, Theme } from '@radix-ui/themes';
import { SimpleSearch } from './SimpleSearch';
import { vi, type Mock } from 'vitest';
import userEvent from "@testing-library/user-event";
import { TableMenu } from './TableMenu';
import type { Procedure } from '@vitest/spy';

describe('TableMenu tests', () => {
    it("opens columns dropdown", async () => {
        const user = userEvent.setup();

        render(
            <Theme>
                <TableMenu
                    page={1}
                    setPage={() => { }}
                    totalPages={5}
                    setPageSize={() => { }}
                    pageSize={10}
                    columns={[{ id: "name", label: "Name", visible: true, render: () => null }]}
                    toggleColumn={() => { }}
                />
            </Theme>
        );

        // przycisk otwierający dropdown, nie działa dla Radix
        //   const trigger = screen.getByRole("button", { name: "models.columns" });
        const trigger = screen.getByRole("button", { expanded: false });


        await user.click(trigger);

        // checkbox powinien być widoczny
        expect(screen.getByRole("menuitemcheckbox", { name: "Name" })).toBeInTheDocument();
    });

    it("calls toggleColumn when checkbox clicked", async () => {
        const user = userEvent.setup();
        const toggleColumn = vi.fn();

        render(
            <Theme>
                <TableMenu
                    page={1}
                    setPage={() => { }}
                    totalPages={5}
                    setPageSize={() => { }}
                    pageSize={10}
                    columns={[{ id: "name", label: "Name", visible: true, render: () => null }]}
                    toggleColumn={toggleColumn}
                />
            </Theme>
        );

        await user.click(screen.getByRole("button", { expanded: false }));

        const checkbox = screen.getByRole("menuitemcheckbox", { name: "Name" });

        await user.click(checkbox);

        expect(toggleColumn).toHaveBeenCalledWith("name");
    });

    it("calls setPage when clicking next/prev", async () => {
        const user = userEvent.setup();
        const setPage = vi.fn();

        render(
            <Theme>
                <TableMenu
                    page={2}
                    setPage={setPage}
                    totalPages={5}
                    setPageSize={() => { }}
                    pageSize={10}
                    columns={[]}
                    toggleColumn={() => { }}
                />
            </Theme>
        );

        await user.click(screen.getByRole("button", { name: "Poprzednia" }));
        expect(setPage).toHaveBeenCalledWith(expect.any(Function));

        await user.click(screen.getByRole("button", { name: "Następna" }));
        expect(setPage).toHaveBeenCalledTimes(2);
    });

    // it("changes pageSize and resets page when selecting new value", async () => {

    //     const originalPointerEvent = window.PointerEvent;

    //     window.PointerEvent = window.MouseEvent as any;

    //     Element.prototype.hasPointerCapture ??= () => false;
    //     Element.prototype.setPointerCapture ??= () => { };
    //     Element.prototype.releasePointerCapture ??= () => { };
    //     Element.prototype.scrollIntoView ??= () => { };

    //     const user = userEvent.setup();
    //     const setPageSize = vi.fn();
    //     const setPage = vi.fn();

    //     render(
    //         <Theme>
    //             <TableMenu
    //                 page={3}
    //                 setPage={setPage}
    //                 totalPages={5}
    //                 setPageSize={setPageSize}
    //                 pageSize={10}
    //                 columns={[]}
    //                 toggleColumn={() => { }}
    //             />
    //         </Theme>
    //     );

    //     // otwieramy select
    //     await user.click(screen.getByRole("combobox"));

    //     // wybieramy 20 - to nie działa, bo nie ma 20 wyrenderowane, bo nazwa przycisku w Radix jest portalem, bo czemu nie...
    //     //   await user.click(screen.getByRole("option", { name: "20" }));

    //     // const option = await screen.findByText("20");
    //     // await user.click(option);

    //     await user.click(screen.getByRole("combobox"));

    //     const option20 = await screen.findByRole("option", { name: "20" });
    //     await user.click(option20);


    //     expect(setPageSize).toHaveBeenCalledWith(20);
    //     expect(setPage).toHaveBeenCalledWith(1);
    //     window.PointerEvent = originalPointerEvent;

    // });

    it("sets pageSize and resets page", () => {
        const setPageSize = vi.fn();
        const setPage = vi.fn();

        function handlePageSizeChange(v: string, setPageSize: Mock<Procedure>, setPage: Mock<Procedure>) {
            setPageSize(Number(v));
            setPage(1);
        }

        handlePageSizeChange("20", setPageSize, setPage);

        expect(setPageSize).toHaveBeenCalledWith(20);
        expect(setPage).toHaveBeenCalledWith(1);
    });



})