import type { Meta, StoryObj } from '@storybook/angular';

import { TabsComponent } from './tab.component';
import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';

const meta: Meta<TabsComponent> = {
  title: 'components/Tabs',
  component: TabsComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<TabsComponent>;
@Component({
  selector: 'story-tabs-demo-with-badge',
  template: `
    <ng-template #homeTpl>
      <div>Home content — welcome!</div>
    </ng-template>
    <ng-template #profileTpl>
      <div>Profile content — user details go here.</div>
    </ng-template>
    <ng-template #messagesTpl>
      <div>Messages content — list of messages.</div>
    </ng-template>

    <storybook-tabs [tabs]="tabs" [tabClass]="tabClass"></storybook-tabs>
  `,
  standalone: true,
  imports: [TabsComponent],
})
class TabsDemoWithBadgeComponent implements AfterViewInit {
  @ViewChild('homeTpl', { static: true }) homeTpl!: TemplateRef<any>;
  @ViewChild('profileTpl', { static: true }) profileTpl!: TemplateRef<any>;
  @ViewChild('messagesTpl', { static: true }) messagesTpl!: TemplateRef<any>;

  tabs: any[] = [];
  tabClass: 'tab-headers' | 'tab-secondary' = 'tab-headers';

  ngAfterViewInit() {
    this.tabs = [
      { label: 'Home', template: this.homeTpl, badge: 9 },
      { label: 'Profile', template: this.profileTpl },
      { label: 'Messages', template: this.messagesTpl },
    ];
  }
}

@Component({
  selector: 'story-tabs-demo-no-badge',
  template: `
    <ng-template #homeTpl>
      <div>Home content — welcome!</div>
    </ng-template>
    <ng-template #profileTpl>
      <div>Profile content — user details go here.</div>
    </ng-template>
    <ng-template #messagesTpl>
      <div>Messages content — list of messages.</div>
    </ng-template>

    <storybook-tabs [tabs]="tabs" [tabClass]="tabClass"></storybook-tabs>
  `,
  standalone: true,
  imports: [TabsComponent],
})
class TabsDemoNoBadgeComponent implements AfterViewInit {
  @ViewChild('homeTpl', { static: true }) homeTpl!: TemplateRef<any>;
  @ViewChild('profileTpl', { static: true }) profileTpl!: TemplateRef<any>;
  @ViewChild('messagesTpl', { static: true }) messagesTpl!: TemplateRef<any>;

  tabs: any[] = [];
  tabClass: 'tab-headers' | 'tab-secondary' = 'tab-headers';

  ngAfterViewInit() {
    this.tabs = [
      { label: 'Home', template: this.homeTpl },
      { label: 'Profile', template: this.profileTpl },
      { label: 'Messages', template: this.messagesTpl },
    ];
  }
}
export const Default: Story = {
  render: () => ({
    template: `<story-tabs-demo-no-badge></story-tabs-demo-no-badge>`,
    moduleMetadata: { imports: [TabsDemoNoBadgeComponent] },
  }),
};

export const WithBadges: Story = {
  render: () => ({
    template: `<story-tabs-demo-with-badge></story-tabs-demo-with-badge>`,
    moduleMetadata: { imports: [TabsDemoWithBadgeComponent] },
  }),
};

@Component({
  selector: 'story-tabs-demo-secondary',
  template: `
    <ng-template #homeTpl>
      <div>Home content — welcome!</div>
    </ng-template>
    <ng-template #profileTpl>
      <div>Profile content — user details go here.</div>
    </ng-template>

    <storybook-tabs 
      [tabs]="tabs" 
      [tabClass]="'tab-secondary'">
    </storybook-tabs>
  `,
  standalone: true,
  imports: [TabsComponent],
})
class TabsDemoSecondaryComponent implements AfterViewInit {
  @ViewChild('homeTpl', { static: true }) homeTpl!: TemplateRef<any>;
  @ViewChild('profileTpl', { static: true }) profileTpl!: TemplateRef<any>;

  tabs: any[] = [];

  ngAfterViewInit() {
    this.tabs = [
      { label: 'Home', template: this.homeTpl },
      { label: 'Profile', template: this.profileTpl }, 
    ];
  }
}

export const SecondaryStyle: Story = {
  render: () => ({
    template: `<story-tabs-demo-secondary></story-tabs-demo-secondary>`,
    moduleMetadata: {
      imports: [TabsDemoSecondaryComponent],
    },
  }),
};
