import type { Meta, StoryObj } from '@storybook/angular';
import { CalendarComponent } from './calendar.component';

const meta: Meta<CalendarComponent> = {
  title: 'Components/Calendar',
  component: CalendarComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<CalendarComponent>;

export const DateView: Story = {
  args: {
    type: 'date',
    currentDate: new Date(2025, 8, 1), // September 2025
    selectedDate: new Date(2025, 8, 2),
  },
};

export const MonthView: Story = {
  args: {
    type: 'month',
    currentDate: new Date(2025, 8, 1),
    selectedDate: new Date(2025, 8, 1),
  },
};

export const YearView: Story = {
  args: {
    type: 'year',
    currentDate: new Date(2025, 8, 1),
    selectedDate: new Date(2025, 8, 1),
  },
};
