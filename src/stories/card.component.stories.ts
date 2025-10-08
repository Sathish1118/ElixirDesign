import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardComponent],
      imports: [CommonModule]
    })
  ],
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  render: (args) => ({
    component: CardComponent,
    props: args
  })
};
