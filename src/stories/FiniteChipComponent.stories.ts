import { Meta, StoryObj } from '@storybook/angular';
import { FiniteChipComponent } from './FiniteChipComponent';

const meta: Meta<FiniteChipComponent> = {
  title: 'Components/FiniteChip',
  component: FiniteChipComponent,
  argTypes: {
    type: { control: 'select', options: ['category', 'query'] },
    category: { control: 'text' },
    status: { control: 'text' },
    label: { control: 'text' },
  },
  parameters: {
    backgrounds: { default: 'light' }
  }
};
export default meta;

type Story = StoryObj<FiniteChipComponent>;

export const CategoryChip: Story = {
  args: {
    type: 'category',
    category: 'sales',
    label: 'Sales'
  }
};

export const QueryChip: Story = {
  args: {
    type: 'query',
    status: 'inprogress',
    label: 'In Progress'
  }
};

export const MultipleDynamicChips: Story = {
  render: (args) => ({
    template: `
      <storybook-finite type="category" category="sales" label="Sales"></storybook-finite>
      <storybook-finite type="category" category="financial" label="Financial"></storybook-finite>
      <storybook-finite type="query" status="inprogress" label="In Progress"></storybook-finite>
      <storybook-finite type="query" status="resolution" label="Resolution"></storybook-finite>
    `,
  }),
  args: {},
};
