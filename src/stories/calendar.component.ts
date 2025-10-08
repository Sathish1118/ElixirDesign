import { Component, Input ,ElementRef, HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type CalendarType = 'date' | 'month' | 'year';

@Component({
  selector: 'storybook-calendar',
  imports: [CommonModule, FormsModule],
  template: `
<!-- ================= Search Bar ================= -->
<div class="calendar-searchbar">
  <input
    type="text"
    [placeholder]="getPlaceholder()"
    [(ngModel)]="searchText"
    (input)="onSearchChange(searchText)" (click)="toggleCalendar()"
  />
  <span (click)="toggleCalendar()"><i class="fa-regular fa-calendar"></i></span>
</div>

<!-- ================= Calendar Wrapper ================= -->
<div class="calendar" *ngIf="isOpen">

  <!-- Header -->
  <div class="calendar-header month-header">
    <ng-container *ngIf="type === 'month'; else yearOrFullHeader">
      <span class="icon" (click)="prevDouble()"><i class="fa-solid fa-angles-left"></i></span>
      <span class="year center">{{ currentDate | date:'yyyy' }}</span>
      <span class="icon" (click)="nextDouble()"><i class="fa-solid fa-angles-right"></i></span>
    </ng-container>
    <ng-template #yearOrFullHeader>
      <ng-container *ngIf="type === 'year'; else fullHeader">
        <span class="icon" (click)="prevDouble()"><i class="fa-solid fa-angles-left"></i></span>
        <span class="year center">{{ currentDate | date:'MMMM' }}</span>
        <span class="icon" (click)="nextDouble()"><i class="fa-solid fa-angles-right"></i></span>
      </ng-container>
      <ng-template #fullHeader>
        <span class="icon" (click)="prevDouble()"><i class="fa-solid fa-angles-left"></i></span>
        <span class="icon" (click)="prev()"><i class="fa-solid fa-angle-left"></i></span>
        <span class="year center">{{ currentDate | date:'yyyy' }}</span>
        <span class="icon" (click)="next()"><i class="fa-solid fa-angle-right"></i></span>
        <span class="icon" (click)="nextDouble()"><i class="fa-solid fa-angles-right"></i></span>
      </ng-template>
    </ng-template>
  </div>

  <!-- Body -->
  <div class="calendar-body">
    <ng-container *ngIf="type === 'date'">
      <div class="day" *ngFor="let day of days">{{ day }}</div>
      <div
        class="date"
        *ngFor="let date of dates"
        [class.active]="isSelectedDate(date)"
        [class.disabled]="isDisabled(date)"
        (click)="selectDate(date)"
      >
        {{ date.getDate() }}
      </div>
    </ng-container>

    <ng-container *ngIf="type === 'month'">
      <div class="month-grid">
        <div
          class="date"
          *ngFor="let month of months; let i = index"
          [class.active]="currentDate.getMonth() === i && isSelectedMonth(i)"
          (click)="selectMonth(i)"
        >
          {{ month }}
        </div>
      </div>
    </ng-container>

    <ng-container *ngIf="type === 'year'">
        <div class="month-grid">
      <div
        class="date"
        *ngFor="let year of years"
        [class.active]="year === selectedDate.getFullYear()"
        (click)="selectYear(year)"
      >
        {{ year }}
      </div>
        </div>

    </ng-container>
  </div>
</div>

`,
})

export class CalendarComponent {
  
  @Input() type: 'date' | 'month' | 'year' = 'date';
  @Input() currentDate: Date = new Date();
  @Input() selectedDate: Date = new Date();
  searchText: string = '';
 isOpen: boolean = false; 
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = [
    'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'
  ];
  years = Array.from({ length: 12 }, (_, i) => this.currentDate.getFullYear() - 6 + i);
  dates: Date[] = [];
  constructor(private eRef: ElementRef) {
    this.generateDates();
  }
  toggleCalendar() {
    this.isOpen = !this.isOpen; 
  }
  @HostListener('document:click', ['$event'])
onOutsideClick(event: MouseEvent) {
  // if click is NOT inside this calendar component → close it
  if (this.isOpen && !this.eRef.nativeElement.contains(event.target)) {
    this.isOpen = false;
  }
}
  getPlaceholder(): string {
  switch (this.type) {
    case 'date':
      return 'Select Date';
    case 'month':
      return 'Select Month';
    case 'year':
      return 'Select Year';
    default:
      return 'Select';
  }
}
   clearSearch() {
    this.searchText = '';
    this.isOpen = true; // optional: open calendar when cleared
  }
  generateDates() {
    if (this.type !== 'date') return;
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    this.dates = Array.from({ length: lastDate }, (_, i) => new Date(year, month, i + 1));
  }

  isSelectedDate(date: Date) {
    return date.toDateString() === this.selectedDate.toDateString();
  }

  isDisabled(date: Date) {
    return false; // implement if needed
  }

  isSelectedMonth(monthIndex: number) {
    return this.selectedDate.getMonth() === monthIndex;
  }

  prevDouble() {
    if (this.type === 'date' || this.type === 'month') {
      this.currentDate = new Date(this.currentDate.getFullYear() - 1, this.currentDate.getMonth(), 1);
    } else if (this.type === 'year') {
      this.currentDate = new Date(this.currentDate.getFullYear() - 12, this.currentDate.getMonth(), 1);
    }
    this.generateDates();
  }

  nextDouble() {
    if (this.type === 'date' || this.type === 'month') {
      this.currentDate = new Date(this.currentDate.getFullYear() + 1, this.currentDate.getMonth(), 1);
    } else if (this.type === 'year') {
      this.currentDate = new Date(this.currentDate.getFullYear() + 12, this.currentDate.getMonth(), 1);
    }
    this.generateDates();
  }

//   selectMonth(monthIndex: number) {
//   this.selectedDate = new Date(this.currentDate.getFullYear(), monthIndex, 1);
//   this.currentDate = new Date(this.currentDate.getFullYear(), monthIndex, 1);
//   this.generateDates();
//   }

//   selectYear(year: number) {
//     this.selectedDate.setFullYear(year);
//     this.currentDate.setFullYear(year);
//   }

prev() {
  if (this.type === 'date') {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
  }
  if (this.type === 'month') {
    this.currentDate = new Date(this.currentDate.getFullYear() - 1, this.currentDate.getMonth(), 1);
  }
  if (this.type === 'year') {
    this.currentDate = new Date(this.currentDate.getFullYear() - 12, this.currentDate.getMonth(), 1);
  }
  this.generateDates();
}

next() {
  if (this.type === 'date') {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
  }
  if (this.type === 'month') {
    this.currentDate = new Date(this.currentDate.getFullYear() + 1, this.currentDate.getMonth(), 1);
  }
  if (this.type === 'year') {
    this.currentDate = new Date(this.currentDate.getFullYear() + 12, this.currentDate.getMonth(), 1);
  }
  this.generateDates();
}

  onSearchChange(value: string) {
    const parsed = new Date(value);
    if (!isNaN(parsed.getTime())) {
      this.selectedDate = parsed;
      this.currentDate = parsed;
      this.generateDates();
    }
  }

selectDate(date: Date) {
  this.selectedDate = date;

  const day = String(date.getDate()).padStart(2, '0');     // 2 digits
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  this.searchText = `${day}/${month}/${year}`; // e.g., "29/09/2025"
  this.isOpen = false; // close calendar after selection
}

selectMonth(monthIndex: number) {
  this.selectedDate = new Date(this.currentDate.getFullYear(), monthIndex, 1);
  this.currentDate = new Date(this.currentDate.getFullYear(), monthIndex, 1);
  this.generateDates();
  this.searchText = this.months[monthIndex] + ' ' + this.currentDate.getFullYear(); // e.g., "Sep 2025"
  this.isOpen = false; // close calendar after selection
}

selectYear(year: number) {
  this.selectedDate.setFullYear(year);
  this.currentDate.setFullYear(year);
  this.searchText = year.toString(); // show selected year
  this.isOpen = false; // close calendar after selection
}

}
