import { Meta, StoryObj } from '@storybook/angular';
import { StorybookSearchComponent } from './search.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<StorybookSearchComponent> = {
  title: 'Components/Search',
  component: StorybookSearchComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [StorybookSearchComponent],
    }),
  ],
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
    search: { action: 'search triggered' }
  },
};

export default meta;

type Story = StoryObj<StorybookSearchComponent>;
export const Default: Story = {
  args: {
    placeholder: 'Type to search...',
    value: '',
  },
};

