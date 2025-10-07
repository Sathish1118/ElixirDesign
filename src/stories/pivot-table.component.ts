import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';

@Component({
  selector: 'storybook-pivot-table',
  standalone: true,
  imports: [CommonModule,PaginationComponent],
  template: `
    <div class="table-responsive pivot-table">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Row</th>
            <th *ngFor="let col of columns">{{ col }}</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <ng-container *ngFor="let bu of pivotData">
            <tr class="business-unit-row">
              <td>{{ bu.businessUnit }}</td>
              <td *ngFor="let col of columns">{{ bu[col] || 0 }}</td>
              <td>{{ getRowTotal(bu) }}</td>
            </tr>
            <tr *ngFor="let st of bu.salesTypes" class="sales-type-row">
              <td>{{ st.salesType }}</td>
              <td *ngFor="let col of columns">{{ st[col] || 0 }}</td>
              <td>{{ getRowTotal(st) }}</td>
            </tr>
          </ng-container>
        </tbody>
      </table>
    </div>
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
  styles: [`
  `]
})
export class StorybookPivotTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() businessField: string = 'businessUnit';
  @Input() typeField: string = 'salesType';
  @Input() columnField: string = 'division';
  @Input() valueField: string = 'amount';
  allFilteredData: any[] = [];
 pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pivotData: any[] = [];
  columns: string[] = [];
  filteredData: any[] = [];
  @Input() paginationSize: 'small' | 'medium' | 'large' = 'medium';

  ngOnChanges(changes: SimpleChanges) {
    this.generatePivot();
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
  this.pivotData = this.filteredData;
}

  getRowTotal(row: any): number {
    return this.columns.reduce((t, c) => t + (row[c] || 0), 0);
  }
private generatePivot() {
  if (!this.data || this.data.length === 0) {
    this.pivotData = [];
    this.columns = [];
    this.allFilteredData = [];
    this.filteredData = [];
    return;
  }
  const allColumns = new Set<string>();
  this.data.forEach(item => allColumns.add(item[this.columnField]));
  this.columns = Array.from(allColumns).sort();

  const buMap = new Map<string, any>();
  this.data.forEach(item => {
    const buKey = item[this.businessField];
    const stKey = item[this.typeField];
    const colKey = item[this.columnField];
    const value = parseFloat(item[this.valueField]) || 0;

    if (!buMap.has(buKey)) {
      buMap.set(buKey, { businessUnit: buKey, salesTypes: {}, totals: {} });
    }
    const buObj = buMap.get(buKey);
    buObj[colKey] = (buObj[colKey] || 0) + value;
    if (!buObj.salesTypes[stKey]) {
      buObj.salesTypes[stKey] = { salesType: stKey };
    }
    buObj.salesTypes[stKey][colKey] = (buObj.salesTypes[stKey][colKey] || 0) + value;
  });

  const pivot = Array.from(buMap.values()).map(bu => ({
    ...bu,
    salesTypes: Object.values(bu.salesTypes)
  }));

  this.allFilteredData = pivot;      
  this.pageIndex = 0;              
  this.applyPaging();                 

  this.pivotData = this.filteredData; 
}

}
