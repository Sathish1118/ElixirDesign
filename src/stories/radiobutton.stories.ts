// radio-button.stories.ts
import type { Meta, StoryObj } from '@storybook/angular';
import { RadioButtonComponent } from './radiobutton.component';
const meta: Meta<RadioButtonComponent> = {
  title: 'Components/RadioButton',
  component: RadioButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    cssclass: { control: 'text' },
    name: { control: 'text' },
    checkedChange: { action: 'checkedChange' },
  },
};

export default meta;
type Story = StoryObj<RadioButtonComponent>;

export const Default: Story = {
  args: {
    label: 'Option 1',
    checked: false,
    name: 'group1',
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Option 2',
    checked: true,
    name: 'group1',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Option',
    checked: false,
    disabled: true,
    name: 'group1',
  },
};
export const valid: Story = {
  args: {
    label: 'Disabled Option',
    checked: false,
    disabled: false,
    name: 'group1',
        cssclass:'is-valid'

  },
};
export const invalid: Story = {
  args: {
    label: 'Disabled Option',
    checked: true,
    disabled: false,
    name: 'group1',
        cssclass:'is-invalid'

  },
};
