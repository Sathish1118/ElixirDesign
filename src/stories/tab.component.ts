import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type Tab = {
  label: string;
  template: TemplateRef<any>;
  badge?: string | number; 
   type?: 'tab-headers' | 'tab-secondary'; 
};

@Component({
  selector: 'storybook-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs-wrapper">
      <ul class=" gap-2 d-flex list-unstyled m-0 p-0"[ngClass]="tabClass"  >
        <li class="position-relative px-3 py-2 text-nowrap"
          *ngFor="let tab of tabs; let i = index"
          [class.active]="i === activeIndex"
          (click)="selectTab(i)"
        >
          {{ tab.label }}
           <span *ngIf="tab.badge" class="inputbadge ms-2">{{ tab.badge }}</span>
        </li>
      </ul>
      <div class="tab-content p-3">
        <ng-container *ngIf="tabs[activeIndex] as activeTab">
          <ng-container *ngTemplateOutlet="activeTab.template"></ng-container>
        </ng-container>
      </div>
    </div>
  `,
styles: [`

`]

})
export class TabsComponent {
  @Input() tabs: Tab[] = [];
  activeIndex = 0;
@Input() tabClass: 'tab-headers' | 'tab-secondary' = 'tab-headers'; // default parent class

  selectTab(index: number) {
    this.activeIndex = index;
  }
}
