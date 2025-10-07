import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorybookSearchComponent } from './search.component';
import { PaginationComponent } from './pagination.component';
import { FilterDropdownComponent } from './filter-dropdown.component';
export type TableColumn = {
  style?: { [key: string]: string };
  headerStyle?: { [key: string]: string };
  isSerialNo?: boolean;
  header: string;
  accessor: string;
  underline?: boolean;
  className?: string;
  headerClass?: string;
  isCheckbox?: boolean;
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
  imports: [CommonModule, FormsModule, StorybookSearchComponent, FilterDropdownComponent, PaginationComponent],
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
                <span *ngIf="filter && !col.isSerialNo && !col.isCheckbox" class="ms-2" style="cursor:pointer;" (click)="toggleFilter(col)">
                  <i class="fa fa-filter"></i>
                </span>
      <storybook-filter-dropdown
        *ngIf="activeFilter === col.accessor"
        [values]="getFilteredUniqueValues(col.accessor)"
        [selectedValues]="selectedFilters[col.accessor]"
        [(searchText)]="searchText[col.accessor]"
        (onApply)="applyColumnFilter(col.accessor)"
        (onReset)="resetColumnFilter(col.accessor)"
        (close)="activeFilter = null">
      </storybook-filter-dropdown>
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
                <span class="btn btn-sm btnaction" (click)="onAction(action, row)" [ngClass]="action.className">
                  <i [class]="action.iconClass"></i>
                  <span *ngIf="action.label">{{ action.label }}</span>
                </span>
              </ng-container>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination Component -->
    <storybook-pagination
      [totalItems]="allFilteredData.length"
      [pageSize]="pageSize"
      [pageIndex]="pageIndex"
      [pageSizeOptions]="pageSizeOptions"
      [size]="paginationSize"
      (pageChange)="changePage($event)"
      (pageSizeChange)="changePageSize($event)">
    </storybook-pagination>
  `,
  styleUrls: ['./table.css'],
})
export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() paginationSize: 'small' | 'medium' | 'large' = 'medium';
  @Input() filter: boolean = false;
  @Output() actionClick = new EventEmitter<{ action: TableAction; row: any }>();
  filteredData: any[] = [];
  allFilteredData: any[] = [];
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  gotoPageInput: number | null = null;
  activeFilter: string | null = null;
  selectedFilters: { [key: string]: { [val: string]: boolean } } = {};
  searchText: { [key: string]: string } = {};
  globalSearch: string = '';
  ngOnInit() {
    this.allFilteredData = [...this.data];
    this.applyPaging();
    this.columns.forEach(c => this.selectedFilters[c.accessor] = {});
  }
  onAction(action: any, row: any) {
    this.actionClick.emit({ action, row });
  }
  toggleAllRows(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.filteredData.forEach(row => row.selected = checked);
  }
  changePage(newIndex: number) {
    this.pageIndex = newIndex;
    this.applyPaging();
  }
  changePageSize(size: number) {
    this.pageSize = size;
    this.pageIndex = 0;
    this.applyPaging();
  }
  applyPaging() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.filteredData = this.allFilteredData.slice(start, end);
  }
  toggleFilter(col: TableColumn) {
    this.activeFilter = this.activeFilter === col.accessor ? null : col.accessor;
  }
  toggleFilterValue(accessor: string, value: string) {
    if (!this.selectedFilters[accessor]) this.selectedFilters[accessor] = {};
    this.selectedFilters[accessor][value] = !this.selectedFilters[accessor][value];
  }
  applyColumnFilter(accessor: string) {
    const selected = this.selectedFilters[accessor];
    const activeValues = Object.keys(selected).filter(v => selected[v]);
    this.allFilteredData = activeValues.length
      ? this.data.filter(row => activeValues.includes(String(row[accessor])))
      : [...this.data];
    this.activeFilter = null;
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
  getUniqueValues(accessor: string): string[] {
    return [...new Set(this.data.map(row => row[accessor]).filter(v => v != null))];
  }
  onDropdownSearch(accessor: string, text: string) {
    this.searchText[accessor] = text.toLowerCase();
  }
  getFilteredUniqueValues(accessor: string): string[] {
    const allValues = this.getUniqueValues(accessor);
    const text = this.searchText[accessor] || '';
    return text ? allValues.filter(v => v.toLowerCase().includes(text)) : allValues;
  }
  applyGlobalSearch() {
    const query = this.globalSearch?.toLowerCase();
    this.allFilteredData = query
      ? this.data.filter(row =>
        this.columns.some(col => !col.isCheckbox && !col.isSerialNo &&
          String(row[col.accessor]).toLowerCase().includes(query))
      )
      : [...this.data];
    this.pageIndex = 0;
    this.applyPaging();
  }
}
