import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleSwitchComponent } from './toggle.component';
const meta: Meta<ToggleSwitchComponent> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitchComponent,
      tags: ['autodocs'],

  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    cssclass: { control: 'text' },
    checkedChange: { action: 'checkedChange' },
  },
};
export default meta;

type Story = StoryObj<ToggleSwitchComponent>;

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    cssclass: '',
  },
};

export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    cssclass: '',
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
    cssclass: '',
  },
};

export const Valid: Story = {
  args: {
    checked: true,
    cssclass: 'is-valid',
  },
};

export const Invalid: Story = {
  args: {
    checked: false,
    cssclass: 'is-invalid',
  },
};
