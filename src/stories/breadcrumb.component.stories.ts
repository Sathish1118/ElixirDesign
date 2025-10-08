// breadcrumb.stories.ts
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BreadcrumbComponent } from './breadcrumb.component';
import { RouterTestingModule } from '@angular/router/testing';

export default {
  title: 'Components/Breadcrumb',
  component: BreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule] // provide router context
    })
  ]
} as Meta<BreadcrumbComponent>;

type Story = StoryObj<BreadcrumbComponent>;

export const Default: Story = {
  args: {}
};
