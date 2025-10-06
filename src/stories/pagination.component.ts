import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'storybook-pagination',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <div class="d-flex align-items-center justify-content-between mt-2 pagination-wrapper" [ngClass]="size">
      <div class="d-flex align-items-center">
        <small class="me-3">Total {{ totalItems }} items</small>
        <nav class="pagination-nav">
          <button class="btn page-btn" [disabled]="pageIndex === 0" (click)="changePage(pageIndex - 1)">&lt;</button>
          <ng-container *ngFor="let p of getPageArray()">
            <button *ngIf="p !== '...'; else dots" class="btn page-btn" [class.active]="p === pageIndex + 1" (click)="changePage(p - 1)">{{ p }}</button>
            <ng-template #dots>
              <button class="btn page-btn dots">...</button>
            </ng-template>
          </ng-container>
          <button class="btn page-btn" [disabled]="pageIndex >= getPageCount() - 1" (click)="changePage(pageIndex + 1)">&gt;</button>
        </nav>
      </div>
      <div class="d-flex align-items-center text-nowrap">
        <div class="custom-select-wrapper position-relative me-2">
        <div class="custom-select-selected p-1 d-flex justify-content-between align-items-center" (click)="toggleDropdown()">
            {{ selectedOption }} / page     <i class="fa-solid fa-angle-down dropdown-icon"></i>
        </div>
        <div class="position-absolute custom-select-options w-100 mt-1" *ngIf="isOpen">
            <div 
            class="custom-option p-1" 
            *ngFor="let opt of pageSizeOptions"
             [class.active]="opt === selectedOption"
            (click)="selectOption(opt)">
            {{ opt }} / page
            </div>
        </div>
        </div>
        <small class="me-2">Go to</small>
        <input type="number" class="form-control page-go" [(ngModel)]="gotoPageInput" (keyup.enter)="goToPage()">
      </div>
    </div>
  `,
})
export class PaginationComponent {
    @Input() totalItems: number = 0;
    @Input() pageSize: number = 10;
    @Input() pageIndex: number = 0;
    @Input() pageSizeOptions: number[] = [5, 10, 20, 50];
    @Input() size: 'small' | 'medium' | 'large' = 'medium';
    selectedOption = 10;
    isOpen = false;

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    selectOption(opt: number) {
        this.selectedOption = opt;
        this.pageSize = opt;
        this.isOpen = false;
        this.changePageSize(opt);
    }

    @Output() pageChange = new EventEmitter<number>();
    @Output() pageSizeChange = new EventEmitter<number>();

    gotoPageInput: number | null = null;

    getPageCount() {
        return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
    }

    getPageArray() {
        const total = this.getPageCount();
        const current = this.pageIndex + 1;
        const pages: (number | '...')[] = [];
        if (total <= 7) {
            for (let i = 1; i <= total; i++) pages.push(i);
            return pages;
        }
        pages.push(1);
        if (current > 4) pages.push('...');
        const start = Math.max(2, current - 2);
        const end = Math.min(total - 1, current + 2);
        for (let i = start; i <= end; i++) pages.push(i);
        if (current < total - 3) pages.push('...');
        pages.push(total);
        return pages;
    }

    changePage(newIndex: number) {
        const total = this.getPageCount();
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= total) newIndex = total - 1;
        this.pageIndex = newIndex;
        this.pageChange.emit(this.pageIndex);
    }

    changePageSize(size: number | string) {
        this.pageSize = Number(size) || 10;
        this.pageIndex = 0;
        this.pageSizeChange.emit(this.pageSize);
    }

    goToPage() {
        if (!this.gotoPageInput) return;
        const p = Math.max(1, Math.min(this.getPageCount(), Math.floor(this.gotoPageInput)));
        this.changePage(p - 1);
        this.gotoPageInput = null;
    }
}
