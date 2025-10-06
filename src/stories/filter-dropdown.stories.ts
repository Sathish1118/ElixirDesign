import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { FilterDropdownComponent } from './filter-dropdown.component';
import { StorybookSearchComponent } from './search.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
const meta: Meta<FilterDropdownComponent> = {
  title: 'Components/Filter Dropdown',
  component: FilterDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, FormsModule, StorybookSearchComponent],
    }),
  ],
  tags: ['autodocs'],
  argTypes: {
    onApply: { action: 'Apply Clicked' },
    onReset: { action: 'Reset Clicked' },
    searchTextChange: { action: 'Search Changed' },
  },
};
export default meta;
type Story = StoryObj<FilterDropdownComponent>;
export const Default: Story = {
  args: {
    values: ['Present', 'Absent', 'Leave', 'WFH', 'OD', 'Holiday', 'Half Day', 'Privilege Leave', 'Unpaid Leave'],
    selectedValues: { 'Present': true, 'Absent': false, 'Leave': false },
    searchText: '',
  },
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
      },
    },
    backgrounds: { default: 'light' },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height: 200px; width: 250px; overflow: auto;">
        <storybook-filter-dropdown
          [values]="values"
          [selectedValues]="selectedValues"
          [(searchText)]="searchText"
          (onApply)="onApply($event)"
          (onReset)="onReset()">
        </storybook-filter-dropdown>
      </div>
    `,
  }),
};