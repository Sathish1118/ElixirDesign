// storybook-dropdown.stories.ts
import { Meta, StoryObj } from '@storybook/angular';
import { StorybookDropdownComponent, DropdownOption } from './dropdown.component';
import { moduleMetadata } from '@storybook/angular';

const options: DropdownOption[] = [
  { label: 'Option 1', value: '1', count: '10' },
  { label: 'Option 2', value: '2', count: '20' },
  { label: 'Option 3', value: '3', count: '30' },
];

const meta: Meta<StorybookDropdownComponent> = {
  title: 'Form/Dropdown',
  component: StorybookDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<StorybookDropdownComponent>;

// Default dropdown story
export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option',
    mode: 'default',
    showIndex: true,
    showBadge: true,
  },
};

// Checkbox dropdown story
export const Checkbox: Story = {
  args: {
    options,
    placeholder: 'Select multiple options',
    mode: 'checkbox',
    showIndex: false,
    showBadge: true,
  },
};

// Radio dropdown story
export const Radio: Story = {
  args: {
    options,
    placeholder: 'Select one option',
    mode: 'radio',
    showIndex: false,
    showBadge: true,
  },
};
