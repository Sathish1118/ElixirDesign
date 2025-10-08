import type { Meta, StoryObj } from '@storybook/angular';
import { LeftNavComponent } from './left-nav.component';

const meta: Meta<LeftNavComponent> = {
  title: 'Components/LeftNav',
  component: LeftNavComponent,
  tags: ['autodocs'],
  argTypes: {
    isCollapsed: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<LeftNavComponent>;

// Default (expanded)
export const Default: Story = {
  args: {
    isCollapsed: false,
  },
};

// Collapsed
export const Collapsed: Story = {
  args: {
    isCollapsed: true,
  },
};
