import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Buttons',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text', description: 'Custom CSS classes' },
    size: { 
      control: { type: 'radio' }, 
      options: ['sm', 'md', 'lg'], 
      description: 'Button size' 
    },
    label: { control: 'text' },
  },
  args: { onClick: fn(), size: 'md', className: '' },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// Primary button
export const Primary: Story = {
  args: {
    label: 'Primary Button',
    className: 'btn-primary',
    size: 'md',
  },
};

// Secondary button
export const Secondary: Story = {
  args: {
    label: 'Secondary Button',
    className: 'btn-secondary',
    size: 'md',
  },
};

// Large button
export const Large: Story = {
  args: {
    label: 'Large Button',
    className: 'btn-primary',
    size: 'lg',
  },
};

// Small button
export const Small: Story = {
  args: {
    label: 'Small Button',
    className: 'btn-primary',
    size: 'sm',
  },
  
};
// gradient button
export const gradient: Story = {
  args: {
    label: 'Gradient Button',
    className: 'bg-gradients',
    size: 'sm',
  },
  
};
// Outline-primary button
export const Outline: Story = {
  args: {
    label: 'Outline Button',
    className: 'btn-outline-primary',
    size: 'sm',
  },
};
// Success button
export const Success: Story = {
  args: {
    label: 'Success Button',
    className: 'btn-success',
    size: 'sm',
  },
};
// Disabled button
export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    className: 'btn-secondary',
    size: 'sm',
    disabled: true,
  },
};