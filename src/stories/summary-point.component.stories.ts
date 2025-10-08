import type { Meta, StoryObj } from '@storybook/angular';
import { SummaryPointComponent } from './summary-point.component';

const meta: Meta<SummaryPointComponent> = {
  title: 'Components/SummaryPoint',
  component: SummaryPointComponent,
  tags: ['autodocs'],
  args: {
    title: 'Employees By Team',
    value: 43,
    description: 'Sample description about employees.',
    showMenu: true,
  },
};
export default meta;

type Story = StoryObj<SummaryPointComponent>;

export const Default: Story = {};

export const WithoutMenu: Story = {
  args: {
    showMenu: false,
  },
};

export const CustomData: Story = {
  args: {
    title: 'Projects Completed',
    value: 128,
    description: 'Completed in the last 6 months',
  },
};
