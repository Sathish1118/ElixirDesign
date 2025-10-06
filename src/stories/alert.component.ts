import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, AlertData } from './alert.service';

@Component({
  selector: 'storybook-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="alert"
         class="alert d-flex flex-column align-items-start position-fixed top-0 end-0 m-3 shadow"
         [ngClass]="'alert-' + alert.type"
         role="alert"
         style="min-width: 250px; max-width: 400px; width: auto;">

      <div class="d-flex align-items-center w-100">
        <i [ngClass]="iconClass" class="me-2"></i>
        <strong *ngIf="isExpandType()" [ngClass]="getHeadingColorClass()">{{ getHeading() }}</strong>
        <span *ngIf="!isExpandType()">{{ alert.message }}</span>
        <button *ngIf="alert.closable !== false"
                type="button"
                class="btn-close ms-auto"
                [ngClass]="closeBtnClass"
                aria-label="Close"
                (click)="onClose()"></button>
      </div>

      <div *ngIf="isExpandType()" class="mt-1">
        {{ alert.message }}
      </div>
    </div>
  `,
  styles: [`
  `]
})
export class AlertComponent {
  alert: AlertData | null = null;

  constructor(private alertService: AlertService) {
    this.alertService.alert$.subscribe(a => this.alert = a);
  }

  get iconClass(): string {
    if (!this.alert) return '';
    switch (this.alert.type) {
      case 'success': return 'fa-solid fa-circle-check';
      case 'danger': return 'fa-solid fa-circle-exclamation';
      case 'warning': return 'fa-solid fa-triangle-exclamation';
      case 'secondary': return 'fa-solid fa-circle-info';
      case 'primary': return 'fa-solid fa-circle-info';
      case 'expand-success': return 'fa-solid fa-circle-check text-success';
      case 'expand-warning': return 'fa-solid fa-triangle-exclamation text-warning';
      case 'expand-alert': return 'fa-solid fa-circle-exclamation text-danger';
      default: return '';
    }
  }

  getHeadingColorClass(): string {
    if (!this.alert) return '';
    switch (this.alert.type) {
      case 'expand-success': return 'text-success';
      case 'expand-warning': return 'text-warning';
      case 'expand-alert': return 'text-danger';
      default: return '';
    }
  }

  get closeBtnClass(): string {
    if (!this.alert) return 'close-white';
    if (['warning','expand-warning','expand-success','expand-alert'].includes(this.alert.type)) {
      return 'close-black';
    }
    return 'close-white';
  }

  onClose() {
    this.alertService.clear();
  }

  isExpandType(): boolean {
    return this.alert?.type?.startsWith('expand-') || false;
  }

  getHeading(): string {
    if (this.isExpandType()) {
      return this.alert!.type.replace('expand-', '').replace(/^\w/, c => c.toUpperCase());
    }
    return '';
  }
}
