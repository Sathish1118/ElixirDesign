import { Meta, StoryObj } from '@storybook/angular';
import { BentoComponent } from './bento.component';

const meta: Meta<any> = {
  title: 'Components/Bento',
  component: BentoComponent,
  tags: ['autodocs'],
  argTypes: {
    // Bento uses `items` input (array of menu items)
    items: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<any>;

export const Default: Story = {
  args: {
    items: [
      { icon: 'fa-solid fa-user', title: 'Profile', label: 'User settings' },
      { icon: 'fa-solid fa-gear', title: 'Settings', label: 'App config' },
      { icon: 'fa-solid fa-bell', title: 'Notifications', label: 'Alerts', active: true },
    ],
  },
};