import { render, screen } from '@testing-library/react';

function Hello() {
  return <div>Hello world</div>;
}

describe('RTL sanity check', () => {
  it('renders text', () => {
    render(<Hello />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
