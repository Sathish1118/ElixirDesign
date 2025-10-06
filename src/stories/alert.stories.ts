import { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

const meta: Meta<AlertComponent> = {
  title: 'Components/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  parameters: {
    // Use fullscreen so position:fixed alerts are not clipped by the story's small centered iframe
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Success: Story = {
  render: (args, { globals }) => ({
    props: args,
    // provide a container with some height so fixed alerts can anchor without being clipped
    template: `<div style="min-height:100px;"> <storybook-alert [alert]="alert"></storybook-alert> </div>`,
  }),
  args: {
    alert: { type: 'success', message: 'Operation Successful!' }
  },
};

export const ExpandAlert: Story = {
  render: (args) => ({
    props: args,
    template: `<div style="min-height:100px;"> <storybook-alert [alert]="alert"></storybook-alert> </div>`,
  }),
  args: {
    alert: { type: 'expand-alert', message: 'Something went wrong!' }
  },
};

export const ExpandWarning: Story = {
  render: (args) => ({
    props: args,
    template: `<div style="min-height:100px;"> <storybook-alert [alert]="alert"></storybook-alert> </div>`,
  }),
  args: {
    alert: { type: 'expand-warning', message: 'This is a warning!' }
  },
};
