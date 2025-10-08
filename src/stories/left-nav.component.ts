import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-leftnav',
  standalone: true,
  imports: [CommonModule],
styleUrls: ['./left-nav.component.scss'],
  template: `
<div class="leftnav " [ngClass]="[variant, isCollapsed ? 'leftnav-collapse' : '']">
  <!-- Collapse button -->
  <div class="collapse-btn" (click)="toggleCollapse()">
    <i class="fa" [ngClass]="isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'"></i>
  </div>
  <!-- Menu Items -->
  <ul class="menus">
    <li *ngFor="let item of menuItems; let i = index"
        [title]="isCollapsed ? item.title : ''"
        [ngClass]="{'active-menu': i === activeIndex}"
        (click)="setActive(i)">
      <i [class]="item.icon + ' leftnav-icon'"></i>
      <span class="leftnav-title" *ngIf="!isCollapsed">{{ item.title }}</span>
    </li>
  </ul>
</div>
  `,
 
})
export class LeftNavComponent {
  isCollapsed = false;
  activeIndex = 0; // Track active menu

  @Input() variant:
    'leftnav-default' |
    'leftnav-active' |
    'leftnav-hover' |
    'leftnav-inactive' |
    'leftnav-submenu' = 'leftnav-default';

  menuItems = [
    { title: 'Home', icon: 'fa fa-home' },
    { title: 'Elixir Template Library', icon: 'fa fa-file' },
    { title: 'Company Letter Library', icon: 'fa fa-copy' },
    { title: 'User Management', icon: 'fa fa-user' },
    { title: 'Signature Management', icon: 'fa fa-pen' },
    { title: 'Letter History', icon: 'fa fa-clock' },
    { title: 'Letter Generator', icon: 'fa fa-file-alt' },
  ];

  setActive(index: number) {
    this.activeIndex = index;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

