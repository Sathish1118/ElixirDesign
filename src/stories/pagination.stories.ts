import type { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';


const meta: Meta<PaginationComponent> = {
  title: 'Components/Pagination',
  component: PaginationComponent,
  tags: ['autodocs'],
  argTypes: {
    totalItems: { control: 'number' },
    pageSize: { control: 'number' },
    pageIndex: { control: 'number' },
    size: { control: 'radio', options: ['small', 'medium', 'large'] },
  },
};

export default meta;
type Story = StoryObj<PaginationComponent>;

export const Default: Story = {
  args: {
    totalItems: 120,
    pageSize: 10,
    pageIndex: 0,
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    totalItems: 100,
    pageSize: 5,
    pageIndex: 2,
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    totalItems: 100,
    pageSize: 20,
    pageIndex: 3,
    size: 'large',
  },
};
