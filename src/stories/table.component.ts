import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorybookSearchComponent } from './search.component';
export type TableColumn = {
  style?: { [key: string]: string };       // cell inline styles
  headerStyle?: { [key: string]: string }; isSerialNo?: boolean; header: string; accessor: string, underline?: boolean; className?: string; headerClass?: string; isCheckbox?: boolean;
};
export type TableAction = {
  type?: string;
  className?: string;
  iconClass?: string;
  label?: string;
};
@Component({
  selector: 'storybook-table',
  standalone: true,
  imports: [CommonModule, FormsModule, StorybookSearchComponent],
  template: `
    <div class="mb-2">
  <storybook-search 
      [placeholder]="'Search'"
      [(value)]="globalSearch"
      (search)="applyGlobalSearch()">
  </storybook-search>
</div>
     <div class="table-responsive">
    <table class="table">
      <thead>
        <tr class="text-nowrap">
          <th *ngFor="let col of columns" [ngClass]="col.headerClass">
            <ng-container *ngIf="!col.isCheckbox; else checkboxHeader">
              {{ col.header }}
              <span *ngIf="filter && !col.isSerialNo && !col.isCheckbox" 
                    class="ms-2" style="cursor:pointer;"
                    (click)="toggleFilter(col)">
                <i class="fa fa-filter"></i>
              </span>
      <div class="dropdown-filter p-2 shadow-sm rounded" *ngIf="activeFilter === col.accessor" >
  <storybook-search 
      [placeholder]="'Search...'" 
      [(value)]="searchText[col.accessor]"
      (search)="onDropdownSearch(col.accessor, $event)">
  </storybook-search>
  <div class="filter-options mt-2">
    <div 
  class="filter-row d-flex align-items-center p-1" 
  [class.selected]="selectedFilters[col.accessor][val]"
  *ngFor="let val of getFilteredUniqueValues(col.accessor)" 
  (click)="toggleFilterValue(col.accessor, val)"
>
  <input 
    type="checkbox" 
    class="form-check-input me-2"
    [(ngModel)]="selectedFilters[col.accessor][val]"  
    (click)="$event.stopPropagation()"
  >
  <span class="mt-1">{{ val }}</span>
</div>
  </div>
  <div class="filter-actions d-flex justify-content-between mt-2">
    <button class="btn btn-sm btn-outline-primary" (click)="resetColumnFilter(col.accessor)">Reset</button>
    <button class="btn btn-sm btn-primary" (click)="applyColumnFilter(col.accessor)">Apply</button>
  </div>
</div>
            </ng-container>
            <ng-template #checkboxHeader>
              <input type="checkbox" class="form-check-input" (change)="toggleAllRows($event)">
            </ng-template>
          </th>
          <th *ngIf="actions?.length">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of filteredData; let i = index">
          <td *ngFor="let col of columns" [ngClass]="col.className">
            <ng-container *ngIf="col.isSerialNo">{{ i + 1 }}</ng-container>
            <ng-container *ngIf="col.isCheckbox">
              <input type="checkbox" class="form-check-input" [(ngModel)]="row.selected">
            </ng-container>
            <ng-container *ngIf="!col.isCheckbox && !col.isSerialNo">
              <ng-container *ngIf="col.underline; else normalText">
                <u>{{ row[col.accessor] }}</u>
              </ng-container>
              <ng-template #normalText>{{ row[col.accessor] }}</ng-template>
            </ng-container>
          </td>
          <td *ngIf="actions?.length">
            <ng-container *ngFor="let action of actions">
              <span class="btn btn-sm btnaction"  (click)="onAction(action, row)" 
                    [ngClass]="action.className"
                   >
                <i [class]="action.iconClass"></i>
                <span *ngIf="action.label">{{ action.label }}</span>
              </span>
            </ng-container>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="d-flex align-items-center justify-content-between mt-2 pagination-wrapper" [ngClass]="paginationSize">
  <div class="d-flex align-items-center">
    <small class="me-3">Total {{ filteredData.length }} items</small>
    <nav class="pagination-nav">
      <button class="btn page-btn" [disabled]="pageIndex === 0" (click)="changePage(pageIndex - 1)">&lt;</button>
      <ng-container *ngFor="let p of getPageArray(); let idx = index">
        <button *ngIf="p !== '...'; else dots" class="btn page-btn" [class.active]="p === pageIndex + 1" (click)="changePage(p - 1)">{{ p }}</button>
        <ng-template #dots>
          <button class="btn page-btn dots">...</button>
        </ng-template>
      </ng-container>
      <button class="btn page-btn" [disabled]="pageIndex >= getPageCount() - 1" (click)="changePage(pageIndex + 1)">&gt;</button>
    </nav>
  </div>
  <div class="d-flex align-items-center text-nowrap">
    <select class="form-select form-select-sm me-2 page-number" [(ngModel)]="pageSize" (change)="changePageSize($any($event.target).value)">
      <option *ngFor="let s of pageSizeOptions" [value]="s">{{ s }} / page</option>
    </select>
    <small class="me-2">Go to</small>
    <input type="number" class="form-control page-go" [(ngModel)]="gotoPageInput" (keyup.enter)="goToPage()">
  </div>
</div>
     <!-- <div class="d-flex align-items-center justify-content-between mt-2 pagination-wrapper" [ngClass]="paginationSize">
  <small class="me-3">Total {{ filteredData.length }} items</small>
  <nav class="pagination-nav">
    <button class="btn page-btn" [disabled]="pageIndex === 0" (click)="changePage(pageIndex - 1)">&lt;</button>
    <ng-container *ngFor="let p of getPageArray(); let idx = index">
      <button *ngIf="p !== '...'; else dots" class="btn page-btn" [class.active]="p === pageIndex + 1" (click)="changePage(p - 1)">{{ p }}</button>
      <ng-template #dots>
        <button class="btn page-btn dots">...</button>
      </ng-template>
    </ng-container>
    <button class="btn page-btn" [disabled]="pageIndex >= getPageCount() - 1" (click)="changePage(pageIndex + 1)">&gt;</button>
  </nav>
  <div class="d-flex align-items-center gap-2 text-nowrap">
    <select class="form-select form-select-sm" [(ngModel)]="pageSize" (change)="changePageSize($any($event.target).value)">
      <option *ngFor="let s of pageSizeOptions" [value]="s">{{ s }} / page</option>
    </select>
    <small>Go to</small>
    <input type="number" class="form-control page-go" [(ngModel)]="gotoPageInput" (keyup.enter)="goToPage()">
  </div>
</div> -->
  </div>
  `,
  styleUrls: ['./table.css'],
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = []; // action types
  filteredData: any[] = [];
  allFilteredData: any[] = []; // full filtered set before paging
  // Pagination
  @Input() paginationSize: 'small' | 'medium' | 'large' = 'medium';
  pageIndex: number = 0; // zero-based
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  gotoPageInput: number | null = null;
  @Input() filter: boolean = false;
  activeFilter: string | null = null;
  selectedFilters: { [key: string]: { [val: string]: boolean } } = {};
  @Output() actionClick = new EventEmitter<{ action: TableAction; row: any }>()
  onAction(action: any, row: any) {
    this.actionClick.emit({ action, row });
  }
  toggleAllRows(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.data.forEach(row => row.selected = checked);
  }
  ngOnInit() {
    this.allFilteredData = [...this.data];
    this.applyPaging();
    this.columns.forEach(c => this.selectedFilters[c.accessor] = {});
  }
  getPageCount() {
    return Math.max(1, Math.ceil(this.allFilteredData.length / this.pageSize));
  }
  getPageArray() {
    const total = this.getPageCount();
    const current = this.pageIndex + 1;
    const pages: (number | '...')[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
      return pages;
    }
    // always show first two, last two, and surrounding pages
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
    this.applyPaging();
  }
  changePageSize(size: number | string) {
    this.pageSize = Number(size) || 10;
    this.pageIndex = 0;
    this.applyPaging();
  }
  goToPage() {
    if (!this.gotoPageInput) return;
    const p = Math.max(1, Math.min(this.getPageCount(), Math.floor(this.gotoPageInput)));
    this.changePage(p - 1);
    this.gotoPageInput = null;
  }
  applyPaging() {
    // ensure pageIndex is valid
    const total = this.getPageCount();
    if (this.pageIndex < 0) this.pageIndex = 0;
    if (this.pageIndex >= total) this.pageIndex = total - 1;
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.filteredData = this.allFilteredData.slice(start, end);
  }
  applyColumnFilter(accessor: string) {
    const selected = this.selectedFilters[accessor];
    const activeValues = Object.keys(selected).filter(v => selected[v]);
    if (activeValues.length > 0) {
      this.allFilteredData = this.data.filter(row => activeValues.includes(String(row[accessor])));
    } else {
      this.allFilteredData = [...this.data];
    }
    this.activeFilter = null; // close dropdown after apply
    this.pageIndex = 0;
    this.applyPaging();
  }
  resetColumnFilter(accessor: string) {
    this.selectedFilters[accessor] = {};
    this.allFilteredData = [...this.data];
    this.pageIndex = 0;
    this.applyPaging();
    this.activeFilter = null;
  }
  toggleFilter(col: TableColumn) {
    this.activeFilter = this.activeFilter === col.accessor ? null : col.accessor;
  }
  toggleFilterValue(accessor: string, value: string) {
    if (!this.selectedFilters[accessor]) {
      this.selectedFilters[accessor] = {};
    }
    this.selectedFilters[accessor][value] = !this.selectedFilters[accessor][value];
  }
  getUniqueValues(accessor: string): string[] {
    const values = this.data.map(row => row[accessor]).filter(v => v != null);
    return [...new Set(values)];
  }
  searchText: { [key: string]: string } = {};
  onSearchColumn(accessor: string, text: string) {
    this.searchText[accessor] = text.toLowerCase();
    this.allFilteredData = this.data.filter(row => {
      const matchesSearch = String(row[accessor]).toLowerCase().includes(this.searchText[accessor] || '');
      const selected = this.selectedFilters[accessor];
      const activeValues = Object.keys(selected).filter(v => selected[v]);
      const matchesCheckbox = activeValues.length ? activeValues.includes(String(row[accessor])) : true;
      return matchesSearch && matchesCheckbox;
    });
    this.pageIndex = 0;
    this.applyPaging();
  }
  onDropdownSearch(accessor: string, text: string) {
    this.searchText[accessor] = text.toLowerCase();
  }
  // filter the checkbox options inside dropdown
  getFilteredUniqueValues(accessor: string): string[] {
    const allValues = this.getUniqueValues(accessor);
    const text = this.searchText[accessor] || '';
    if (!text) return allValues;
    return allValues.filter(v => v.toLowerCase().includes(text));
  }
  globalSearch: string = '';
  applyGlobalSearch() {
    const query = this.globalSearch?.toLowerCase();
    if (!query) {
      this.allFilteredData = [...this.data];
      this.applyPaging();
      return;
    }
    this.allFilteredData = this.data.filter(row =>
      this.columns.some(col => {
        if (col.isCheckbox || col.isSerialNo) return false;
        const val = row[col.accessor];
        return val != null && String(val).toLowerCase().includes(query);
      })
    );
    this.pageIndex = 0;
    this.applyPaging();
  }
}
