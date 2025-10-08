import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'storybook-draganddrop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [ngClass]="dragging ? 'grabbing' : ''"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)">
      
      <ul class="drag-list">
        <li *ngFor="let item of items; let i = index"
            [ngClass]="{ 'hover': hovered === item, 'grabbing': (dragging && grabbed === item) || (grabbed === item) }"
            (mouseenter)="hovered = item"
            (mouseleave)="hovered = null"
            (mousedown)="grabbed = item; dragIndex = i"
            (mouseup)="grabbed = null"
            draggable="true"
            (dragstart)="onItemDragStart(i)"
            (dragover)="onItemDragOver($event, i)"
            (drop)="onItemDrop(i)">
          
          <span class="list-icon"><i class="fa-solid fa-grip-vertical"></i></span>
          <div class="list-content">
            <div class="list-title">{{ item.title }}</div>
            <div class="list-desc">{{ item.desc }}</div>
          </div>
          <span *ngIf="dragging && grabbed === item" class="grabbing-icon">
            <i class="fa-solid fa-hand-grab"></i>
          </span>
        </li>
      </ul>

      <input type="file" (change)="onFileSelected($event)" hidden #fileInput />
    </div>
  `,
})
export class DragDropComponent {
  dragIndex: number | null = null;

  @Input() items: { title: string; desc: string }[] = []; // now comes from parent
  @Input() heading: string = 'Drag & Drop files here';
  @Input() body: string = 'or click to browse';

  @Output() fileSelected = new EventEmitter<File>();

  hovered: any = null;
  grabbed: any = null;
  dragging = false;

  onItemDragStart(index: number) {
    this.dragIndex = index;
  }

  onItemDragOver(event: DragEvent, index: number) {
    event.preventDefault();
  }

  onItemDrop(index: number) {
    if (this.dragIndex !== null && this.dragIndex !== index) {
      const movedItem = this.items[this.dragIndex];
      this.items.splice(this.dragIndex, 1);
      this.items.splice(index, 0, movedItem);
    }
    this.dragIndex = null;
    this.grabbed = null;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.dragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    if (event.dataTransfer?.files.length) {
      this.fileSelected.emit(event.dataTransfer.files[0]);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      this.fileSelected.emit(event.target.files[0]);
    }
  }
}
