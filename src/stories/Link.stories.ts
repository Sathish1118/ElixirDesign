import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { LinkComponent } from './link.component';
const meta: Meta<LinkComponent> = {
  title: 'Components/Link',
  component: LinkComponent,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    href: { control: 'text' },
    size: { control: { type: 'radio' }, options: ['sm','md','lg'] },
    className: { control: 'text' },
    disabled: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  args: {
    label: 'Link',
    href: '#',
    size: 'md',
    className: 'link-primary',
    disabled: false,
    onClick: fn(),
  },
};

export default meta; // ✅ This is mandatory

type Story = StoryObj<LinkComponent>;

// export const Default: Story = {
//   args: { label: 'Default Link' },
// };

// Link small
export const Small : Story = {
  args: {
    label: 'Small Link',
    className: 'Link-primary',
    size: 'sm',
  },
};
// Link medium
export const medium : Story = {
  args: {
    label: 'Medium Link',
    className: 'Link-primary',
    size: 'md',
  },
};
// Link medium
export const Large : Story = {
  args: {
    label: 'Large Link',
    className: 'Link-primary',
    size: 'lg',
  },
};
// Link Disabled
export const Disabled : Story = {
  args: {
    label: 'Disabled Link',
    className: 'Link-primary',
    size: 'lg',
    disabled: true,
  },
};