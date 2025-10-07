import type { Meta, StoryObj } from '@storybook/angular';
import { StorybookPivotTableComponent } from './pivot-table.component';
const meta: Meta<StorybookPivotTableComponent> = {
  title: 'Components/Pivot Table',
  component: StorybookPivotTableComponent,
  tags: ['autodocs'],
  argTypes: {
    businessField: { control: 'text' },
    typeField: { control: 'text' },
    columnField: { control: 'text' },
    valueField: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<StorybookPivotTableComponent>;

// Sample data
const sampleData = [
  { businessUnit: 'Business Unit 1', salesType: 'Sales A', division: 'Division 1', amount: 1000 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales A', division: 'Division 2', amount: 1000 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales A', division: 'Division 3', amount: 1000 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales B', division: 'Division 1', amount: 1 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales B', division: 'Division 2', amount: 1 },
  { businessUnit: 'Business Unit 1', salesType: 'Sales B', division: 'Division 3', amount: 1 },
  { businessUnit: 'Business Unit 2', salesType: 'Sales A', division: 'Division 1', amount: 500 },
  { businessUnit: 'Business Unit 2', salesType: 'Sales A', division: 'Division 2', amount: 500 },
  { businessUnit: 'Business Unit 2', salesType: 'Sales A', division: 'Division 3', amount: 500 },
];

export const Default: Story = {
  args: {
    data: sampleData,
    businessField: 'businessUnit',
    typeField: 'salesType',
    columnField: 'division',
    valueField: 'amount',
  },
};
