import type { Meta, StoryObj } from '@storybook/angular';
import { FormulaComponent } from './formula.component';

const meta: Meta<FormulaComponent> = {
  title: 'Example/Formula',
  component: FormulaComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FormulaComponent>;

export const Default: Story = {
  render: () => ({
    template: `<storybook-formula></storybook-formula>`,
    moduleMetadata: { imports: [FormulaComponent] },
  }),
};

export const WithValidation: Story = {
  render: () => ({
    template: `<storybook-formula></storybook-formula>`,
    moduleMetadata: { imports: [FormulaComponent] },
  }),
};
