import { Meta, StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordian.component';
const meta: Meta<AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],

};
export default meta;

type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  args: {
    items: [
      { title: 'Accordion Item 1', content: 'This is the content of item 1.' },
    ],
  },
};
