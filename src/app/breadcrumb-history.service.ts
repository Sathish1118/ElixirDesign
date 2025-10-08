import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BreadcrumbHistoryService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      // If navigating back, remove last item
      if (this.history.length > 1 && this.history[this.history.length - 2] === url) {
        this.history.pop();
      } else if (this.history.length === 0 || this.history[this.history.length - 1] !== url) {
        this.history.push(url);
      }
    });
  }

  getHistory(): string[] {
    return this.history;
  }

  clearHistory(): void {
    this.history = [];
  }

  /**
   * Trim history to a specific index (used when clicking a breadcrumb)
   */
  trimHistory(index: number): void {
    this.history = this.history.slice(0, index + 1);
  }
}
