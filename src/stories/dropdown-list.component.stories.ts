import { Meta, StoryObj } from '@storybook/angular';
import { DropdownlistComponent } from './dropdown-list.component';

export default {
  title: 'Components/Dropdown',
  component: DropdownlistComponent,
} as Meta;

type Story = StoryObj<DropdownlistComponent>;

export const Default: Story = {
  args: {
    options: ['Edit','Delete'],
    placeholder: 'Select Option',
  },
};
