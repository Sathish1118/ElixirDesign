import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './charts.component';
export default {
  title: 'Components/Charts',
  component: ChartsComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule]
    })
  ],
  argTypes: {
    type: {
      control: 'select',
      options: [
        'piechart',
        'donutchart',
        'linechart',
        'areachart',
        'radarchart',
        'stackedbarchart',
        'barchart'
      ]
    },
    variant: { control: 'select', options: ['default', 'widget'] },
    showLegend: { control: 'boolean' }
  }
} as Meta<ChartsComponent>;

type Story = StoryObj<ChartsComponent>;

export const DefaultChart: Story = {
  args: {
    type: 'barchart',
    variant: 'default',
    title: 'Quarterly Sales',
    data: [
      { label: 'Q1', value: 40, color: '#1886ed' },
      { label: 'Q2', value: 60, color: '#ffb703' },
      { label: 'Q3', value: 80, color: '#06d6a0' },
      { label: 'Q4', value: 50, color: '#fb8500' }
    ]
  }
};

