import { Meta, StoryObj } from '@storybook/angular';
import { MenuButtonComponent } from './Menu-Button-Component';

export default {
  title: 'Components/MenuButtonComponent',
  component: MenuButtonComponent,
  argTypes: {
    placeholder: { control: 'text' },
    options: { control: 'object' },
    selectedOption: { control: 'text' },
  },
} as Meta<MenuButtonComponent>;

type Story = StoryObj<MenuButtonComponent>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Select Option',
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
};

// With pre-selected option
export const WithSelectedOption: Story = {
  args: {
    placeholder: 'Select Option',
    options: ['Option 1', 'Option 2', 'Option 3'],
    selectedOption: 'Option 2',
  },
};

// Empty dropdown
export const Empty: Story = {
  args: {
    placeholder: 'Select an item',
    options: [],
  },
};
