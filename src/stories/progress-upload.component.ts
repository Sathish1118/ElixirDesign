import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-upload" [ngClass]="status">
      <div class="header">Getting Started</div>
      <div class="file-row">
        <div class="file-info">
          <div class="file-image"><i class="fa-regular fa-file"></i></div>
          <div class="file-name">{{ fileName }}</div>
        </div>
    
        <div class="file-meta">
          <span class="file-size">{{ fileSize }}</span>
          <span class="status-icon"
             [ngClass]="{
               error: status !== 'completed',
               success: status === 'completed'
             }">
            <i *ngIf="status !== 'completed'" class="fa-solid fa-xmark"></i>
            <i *ngIf="status === 'completed'" class="fa-solid fa-check"></i>
          </span>
        </div>
     
      </div>
             <div class="progress-track">
          <div class="progress-fill"
               [style.width.%]="status === 'completed' ? 100 : progress"></div>
          <div class="progress-text" *ngIf="status !== 'default'">
            {{ status === 'completed' ? '100%' : progress + '%' }}
          </div>
        </div>
    </div>
  `
})
export class ProgressUploadComponent {
  @Input() fileName: string = 'File_Name.jpg';
  @Input() fileSize: string = '0.0 Mb';
  @Input() progress: number = 0;
  @Input() status: 'default' | 'progress' | 'completed' = 'default';
}
