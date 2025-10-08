import { Meta, StoryObj } from '@storybook/angular';
import { HyperlinkValueComponent } from './hyperlinkvalue.component';
const meta: Meta<HyperlinkValueComponent> = {
  title: 'Components/HyperlinkValue',
  component: HyperlinkValueComponent,
  argTypes: {
    label: { control: 'text' },
    // badge: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<HyperlinkValueComponent>;

export const Default: Story = {
  args: {
    label: 'Element 01',
    // badge: '+03',
  },
};

export const CustomBadge: Story = {
  args: {
    label: 'Element 02',
    // badge: '+10',
  },
};
