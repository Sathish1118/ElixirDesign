import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-menubutton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="menu-button"
      [class.open]="isOpen"
      [class.active]="selectedOption"
      (click)="toggleMenu()"
    >
      <span>{{ selectedOption || placeholder }}</span>
      <i class="fa-solid fa-chevron-down"></i>
    </div>

    <ul class="menu-list" *ngIf="isOpen">
      <li
        *ngFor="let option of options"
        [class.active]="option === selectedOption"
        (click)="selectOption(option)"
      >
        {{ option }}
      </li>
    </ul>
  `
})
export class MenuButtonComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Select';
  selectedOption: string = '';
  isOpen: boolean = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
}
