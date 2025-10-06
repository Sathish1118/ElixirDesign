import { Meta, StoryObj } from '@storybook/angular';
import { StorybookModalComponent } from './popup.component';
import { moduleMetadata } from '@storybook/angular';

const meta: Meta<StorybookModalComponent> = {
  title: 'Components/Modal',
  component: StorybookModalComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    visible: { control: 'boolean' },
    title: { control: 'text' },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
    confirm: { action: 'confirmed' },
    visibleChange: { action: 'closed' },
  },
};
export default meta;
type Story = StoryObj<StorybookModalComponent>;

export const Default: Story = {
  args: {
    visible: true,
    title: 'Default Modal',
    size: 'md',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="min-height:300px;">
        <storybook-modal [(visible)]="visible" [title]="title" [size]="size" (confirm)="confirm()">
          <div>
            <p>This is the default modal body content.</p>
          </div>
        </storybook-modal>
      </div>
    `,
  }),
};

export const Small: Story = {
  args: {
    visible: true,
    title: 'Small Modal',
    size: 'sm',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="min-height:300px;">
        <storybook-modal [(visible)]="visible" [title]="title" [size]="size" (confirm)="confirm()">
          <div>
            <p>This is a small modal body.</p>
          </div>
        </storybook-modal>
      </div>
    `,
  }),
};

export const Large: Story = {
  args: {
    visible: true,
    title: 'Large Modal',
    size: 'lg',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="min-height:300px;">
        <storybook-modal [(visible)]="visible" [title]="title" [size]="size" (confirm)="confirm()">
          <div>
            <p>This is a large modal body.</p>
          </div>
        </storybook-modal>
      </div>
    `,
  }),
};

