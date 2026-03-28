import { render, screen } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import { SimpleSearch } from './SimpleSearch';
import { vi } from 'vitest';
import userEvent from "@testing-library/user-event";

describe('SimpleSearch tests',()=>{
    it("renders search input", () => {
  render(<Theme><SimpleSearch search="" setSearch={() => {}} /></Theme>);

  expect(screen.getByRole("textbox")).toBeInTheDocument();
});
it("renders correct placeholder", () => {
  render(<Theme><SimpleSearch search="" setSearch={() => {}} /></Theme>);

  const input = screen.getByRole("textbox");

  expect(input).toHaveAttribute("placeholder", "models.searchSimplePlaceholder");
});
it("calls setSearch when typing", async () => {
  const setSearch = vi.fn();
  const user = userEvent.setup();

  render(<Theme><SimpleSearch search="" setSearch={setSearch} /></Theme>);

  const input = screen.getByRole("textbox");

  await user.type(input, "abc");

  // that will work for classinc input but not for Radix' TextField.Root
//   expect(setSearch).toHaveBeenCalledTimes(3);
//   expect(setSearch).toHaveBeenCalledWith("a");
//   expect(setSearch).toHaveBeenCalledWith("ab");
//   expect(setSearch).toHaveBeenCalledWith("abc");

  // that what works for Radix's TextField.Root :
  expect(setSearch).toHaveBeenCalledTimes(3);
expect(setSearch).toHaveBeenNthCalledWith(1, "a");
expect(setSearch).toHaveBeenNthCalledWith(2, "b");
expect(setSearch).toHaveBeenNthCalledWith(3, "c");
  
});

it("shows the value from props", () => {
  render(<Theme><SimpleSearch search="hello" setSearch={() => {}} /></Theme>);

  const input = screen.getByRole("textbox");

  expect(input).toHaveValue("hello");
});

})