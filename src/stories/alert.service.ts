import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType =
  'primary' | 'success' | 'danger' | 'warning' |
  'expand-primary' | 'expand-secondary' | 'expand-success' |
  'expand-warning' | 'expand-alert' | 'secondary';

export interface AlertData {
  type: AlertType;
  message: string;
  closable?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alertSubject = new BehaviorSubject<AlertData | null>(null);
  alert$ = this.alertSubject.asObservable();

  show(alert: AlertData) {
    this.alertSubject.next(alert);
  }

  clear() {
    this.alertSubject.next(null);
  }
}
