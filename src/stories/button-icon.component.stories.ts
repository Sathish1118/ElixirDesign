import { Meta, StoryObj } from '@storybook/angular';
import { ButtonIconComponent } from './button-icon.component';

const meta: Meta<any> = {
  title: 'Components/Button-Icon',
  component: ButtonIconComponent,
  tags: ['autodocs'],
  argTypes: {
    icon: { control: 'text' },          // dynamic icon input
    disabled: { control: 'boolean' },
    className: { control: 'text' },     // choose sm/md/lg class
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    icon: 'fa fa-search',        // dynamic icon
    className: 'btn-primary-icon-md',
  },
};

export const Small: Story = {
  args: {
    icon: 'fa fa-plus',
    className: 'btn-primary-icon-sm',
  },
};

export const Large: Story = {
  args: {
    icon: 'fa fa-trash',
    className: 'btn-primary-icon-lg',
  },
};

export const Disabled: Story = {
  args: {
    icon: 'fa fa-user',
    className: 'btn-primary-icon-md',
    disabled: true,
  },
};
//---circle icons
export const Defaultcircle: Story = {
  args: {
    icon: 'fa fa-search',        // dynamic icon
    className: 'btn-icon-primary-circle-md',
  },
};

export const Smallcircle: Story = {
  args: {
    icon: 'fa fa-plus',
    className: 'btn-icon-primary-circle-sm',
  },
};

export const Largecircle: Story = {
  args: {
    icon: 'fa fa-trash',
    className: 'btn-icon-primary-circle-lg',
  },
};

export const Disabledcircle: Story = {
  args: {
    icon: 'fa fa-user',
    className: 'btn-icon-primary-circle-lg',
    disabled: true,
  },
};