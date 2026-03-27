import { render, screen } from '@testing-library/react';
import TableWrapper from './TableWrapper';
import { filterMock, newData, newDataColumns } from '@/modules/nn/pages/testMock';
import { Theme } from '@radix-ui/themes';

describe('TableWrapper renders without crashing and shows basic UI elements', () => {
    it('renders table menu', () => {
        render(<Theme><TableWrapper columns={newDataColumns} data={newData} filters={filterMock} /></Theme>);

        expect(screen.getByText("table.tablemenu")).toBeInTheDocument();
    });
    
    it('renders table menu2', () => {
        render(<Theme><TableWrapper columns={newDataColumns} data={newData} filters={filterMock} /></Theme>);
screen.debug();
        expect(screen.getByText("table wrapper test")).toBeInTheDocument();
    })
})
    
