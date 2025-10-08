import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BreadcrumbHistoryService } from '../app/breadcrumb-history.service';


@Component({
  selector: 'storybook-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="breadcrumb">
      <ng-container *ngFor="let item of breadcrumbItems; let last = last; let i = index">
        <span *ngIf="i > 0" class="breadcrumb-separator">&gt;</span>
        <span class="breadcrumb-item" [ngClass]="{ 'active': last }">
          <a *ngIf="!last" [routerLink]="item.url" class="breadcrumb-link" (click)="onBreadcrumbClick(i)">{{ item.label }}</a>
          <span *ngIf="last" class="breadcrumb-active">{{ item.label }}</span>
        </span>
      </ng-container>
    </nav>
    `,
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbItems: { label: string; url: string }[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private breadcrumbHistory: BreadcrumbHistoryService
  ) {}

  ngOnInit() {
    this.updateBreadcrumbFromHistory();
    this.router.events.subscribe(() => {
      this.updateBreadcrumbFromHistory();
    });
  }

  onBreadcrumbClick(index: number) {
    this.breadcrumbHistory.trimHistory(index);
    this.updateBreadcrumbFromHistory();
  }

  private updateBreadcrumbFromHistory() {
    const config = this.router.config;
    this.breadcrumbItems = this.breadcrumbHistory.getHistory()
      .map(url => {
        // Parse last segment for label
        const segments = url.split('/').filter(Boolean);
        const lastSeg = segments[segments.length - 1];
        const route = config.find(r => r.path === lastSeg);
        const label = route && route.data && route.data['breadcrumb'] ? route.data['breadcrumb'] : lastSeg;
        return { label, url };
      })
      .filter(item => item.label && item.label.trim() !== '');
  }
}
