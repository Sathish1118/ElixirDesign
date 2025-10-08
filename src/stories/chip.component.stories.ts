import { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ChipComponent } from './chip.component';

const meta: Meta<any> = {
  title: 'Components/Chip',
  component: ChipComponent,
  decorators: [
    moduleMetadata({
      imports: [ChipComponent], // ✅ standalone component
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    label: 'Dynamic Chip',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Chip',
    disabled: true,
  },
};
