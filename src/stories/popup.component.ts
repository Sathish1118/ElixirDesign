import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="visible">
      <div class="modal fade show d-block" tabindex="-1">
        <div class="modal-dialog" [ngClass]="sizeClass">
          <div class="modal-content">
            <div class="modal-header bg-primary text-white">
              <h5 class="modal-title">{{ title }}</h5>
              <button type="button" class="btn-close close-white" aria-label="Close" (click)="close()"></button>
            </div>
            <div class="modal-body">
              <ng-content></ng-content>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" (click)="close()">Cancel</button>
              <button type="button" class="btn btn-primary" (click)="confirm.emit()">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-backdrop fade show"></div>
    </div>
  `,
  styles: [`
    .close-white {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 2l12 12M14 2L2 14'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: center;
      opacity: 1;
    }
  `]
})
export class StorybookModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() title = 'Modal Title';
  @Output() confirm = new EventEmitter<void>();

  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md'; // default medium

  get sizeClass() {
    switch (this.size) {
      case 'sm': return 'modal-sm';
      case 'lg': return 'modal-lg';
      case 'xl': return 'modal-xl';
      default: return '';
    }
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
