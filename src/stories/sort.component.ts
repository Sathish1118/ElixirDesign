import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-sort',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul>
      <li *ngFor="let item of items"
          class="sort-item"
          [ngClass]="{ 'hover': hovered === item, 'active': selected === item }"
          (mouseenter)="hovered = item"
          (mouseleave)="hovered = null"
          (click)="selectItem(item)">
        <div class="sort-title">{{ item.title }}</div>
        <div class="sort-desc" *ngIf="item.desc">{{ item.desc }}</div>
      </li>
    </ul>
  `
})
export class SortComponent {
  @Input() items: { title: string; desc?: string }[] = [
    { title: 'Recent' },
    { title: 'High to Low' },
    { title: 'Low to High' },
  ];

  @Output() selectedChange = new EventEmitter<string>();

  hovered: any = null;
  selected: any = null;

  selectItem(item: any) {
    this.selected = item;
    this.selectedChange.emit(item.title);
  }
}
