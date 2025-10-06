import type { Meta, StoryObj } from '@storybook/angular';

import { TooltipComponent } from './tooltip.component';

const meta: Meta<TooltipComponent> = {
  title: 'components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
    parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<TooltipComponent>;
export const Placements: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div class="gap-3 d-flex">
        <storybook-tooltip placement="top"><button class="btn btn-sm btn-secondary" data-bs-toggle="tooltip" title="Top">Top</button></storybook-tooltip>
        <storybook-tooltip placement="right"><button class="btn btn-sm btn-secondary" data-bs-toggle="tooltip" title="Right">Right</button></storybook-tooltip>
        <storybook-tooltip placement="bottom"><button class="btn btn-sm btn-secondary" data-bs-toggle="tooltip" title="Bottom">Bottom</button></storybook-tooltip>
        <storybook-tooltip placement="left"><button class="btn btn-sm btn-secondary" data-bs-toggle="tooltip" title="Left">Left</button></storybook-tooltip>
      </div>
    `,
  }),
};
