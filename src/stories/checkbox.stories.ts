import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
    tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    cssclass: { control: 'text' },
    label: { control: 'text' },
    checkedChange: { action: 'checkedChange' },
  },
};
export default meta;

type Story = StoryObj<CheckboxComponent>;
export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    cssclass: '',
    label: 'Default Checkbox',
  },
};
export const Checked: Story = {
  args: {
    checked: true,
    disabled: false,
    cssclass: '',
    label: 'Checked Checkbox',
  },
};
export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
    cssclass: '',
    label: 'Disabled Checkbox',
  },
};
export const Valid: Story = {
  args: {
    checked: true,
    disabled: false,
    cssclass: 'is-valid',
    label: 'Valid Checkbox',
  },
};
export const Invalid: Story = {
  args: {
    checked: true,
    disabled: false,
    cssclass: 'is-invalid',
    label: 'Invalid Checkbox',
  },
};
