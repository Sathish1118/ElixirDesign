import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { User } from './user';
import { ButtonIconComponent } from "./button-icon.component";
import { BentoComponent } from './bento.component';
@Component({
  selector: 'storybook-header',
  standalone: true,
  imports: [CommonModule, ButtonIconComponent,BentoComponent],
  template: `
<header class="header-default px-3 d-flex justify-content-between align-items-center">
  <div class="d-flex align-items-center" (click)="bentoMenu()">
    <i class="fa fa-th-large bento-icon me-2"></i>
    
    <span class="header-logo">Company Logo</span>


  </div>
  <div class="d-flex flex-row flex-wrap align-items-center">
    <storybook-button-icon icon="fa-solid fa-search"
      className="btn-icon-outline-circle-md me-2">
    </storybook-button-icon>
    <storybook-button-icon icon="fa-brands fa-buffer"
      className="btn-icon-outline-circle-md me-2">
    </storybook-button-icon>
    <div class="header-user-group d-flex align-items-center px-3 py-2"
         [ngClass]="{ 'active': menuOpen }"
         (click)="toggleMenu()">
      <div class="header-icon me-2">
        <storybook-button-icon
          icon="fa-regular fa-user"
          className="btn-icon-primary-circle-md">
        </storybook-button-icon>
      </div>
      <div class="header-info d-none d-sm-block" *ngIf="user">
        <div class="header-username">{{ user.name }}</div>
        <div class="header-account">My Account</div>
      </div>
    <div class="header-username">
      <i class="fa-solid fa-chevron-down ms-2"></i>
    </div>
    </div>
      <ul class="header-menu" *ngIf="menuOpen">
          <li class="header-menu-item">Menu Item 1</li>
          <li class="header-menu-item">Menu Item 2</li>
          <li class="header-menu-item">Menu Item 3</li>
          <li class="header-menu-item">Menu Item 4</li>
          <li class="header-menu-item disabled">Logout</li>
        </ul>
  </div>

</header>
<div *ngIf="bentoOpen">
  <storybook-bento [items]="bentoItems" [horizontals]="horizontals"></storybook-bento>
</div>

  `,
})
export class HeaderComponent {
  @Input() user: User | null = null;

  @Output() onLogin = new EventEmitter<Event>();
  @Output() onLogout = new EventEmitter<Event>();
  @Output() onCreateAccount = new EventEmitter<Event>();
  @Input() bentoItems: any[] = [];    
  @Input() horizontals: any[] = []; 
  menuOpen = false;
  bentoOpen = false;
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  } 
  bentoMenu(){
    this.bentoOpen = !this.bentoOpen;
  }
}

