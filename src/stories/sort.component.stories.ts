import { Meta, StoryObj } from '@storybook/angular';
import { SortComponent } from './sort.component';

export default {
  title: 'Components/Sort',
  component: SortComponent,
  argTypes: {
    items: { control: 'object' },
    selectedChange: { action: 'selectedChange' },
  },
} as Meta<SortComponent>;

type Story = StoryObj<SortComponent>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Recent' },
      { title: 'High to Low' },
      { title: 'Low to High' },
    ],
  },
};
