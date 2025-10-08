import { Meta, StoryObj } from '@storybook/angular';
import { DragDropComponent } from './drag-drop.component';

export default {
  title: 'Components/DragandDrop',
  component: DragDropComponent,
  argTypes: {
    heading: { control: 'text' },
    body: { control: 'text' },
    fileSelected: { action: 'fileSelected' },
  },
} as Meta<DragDropComponent>;

type Story = StoryObj<DragDropComponent>;

export const Default: Story = {
  args: {
    heading: 'Drag & Drop files here',
    body: 'or click to browse',
    items: [
      { title: 'List Item 1', desc: 'Description of the first item in the list.' },
      { title: 'List Item 2', desc: 'Description of the second item in the list.' },
      { title: 'List Item 3', desc: 'Description of the third item in the list.' },
      { title: 'List Item 4', desc: 'Description of the fourth item in the list.' },
    ],
  },
};
