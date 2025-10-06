// ...existing code...
import type { Meta, StoryObj } from '@storybook/angular';
import { TableComponent } from './table.component';

const meta: Meta<TableComponent> = {
    title: 'Components/Table',
    component: TableComponent,
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TableComponent>;

const sampleColumns = [
    { header: 'Template', accessor: 'template' },
    { header: 'Section', accessor: 'section' },
    { header: 'Module', accessor: 'module' },
    { header: 'Category', accessor: 'category' },
    { header: 'Status', accessor: 'status' },
    { header: 'Updated On', accessor: 'updatedOn' },
];
const sampleColumns1 = [
    {header:'',accessor:'',isCheckbox: true},
    { header: 'Template', accessor: 'template' },
    { header: 'Section', accessor: 'section' },
    { header: 'Module', accessor: 'module' },
    { header: 'Category', accessor: 'category' },
    { header: 'Status', accessor: 'status' },
    { header: 'Updated On', accessor: 'updatedOn' },
];
const sampleActions = [
  { type: 'edit', className: 'btn btn-primary btn-sm fw-bold', iconClass: 'fas fa-edit' },

];
const sampleData = [
  { 
    template: 'Offer Letter', 
    section: 'Candidate Letters', 
    module: 'Onboarding', 
    category: 'Welcome Letter', 
    status: 'Disabled', 
    updatedOn: '03/02/2025', 
  },
];

export const Default: Story = {
    args: {
        columns: sampleColumns,
        data: sampleData,
        actions: sampleActions, 
    },
};
export const checkbox: Story = {
    args: {
        columns: sampleColumns1,
        data: sampleData,
        actions: sampleActions,
    },
};
