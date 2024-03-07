import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../types/todo';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoComponent {
  @Output() delete = new EventEmitter();
  @Output() rename = new EventEmitter();
  @Output() toggle = new EventEmitter();

  @Input() todo!: Todo;

  @ViewChild('titleField')
  set titleField(field: ElementRef) {
    if (field) {
      field.nativeElement.focus();
    }
  }

  isEditing = false;
  title = '';

  edit() {
    this.isEditing = true;
    this.title = this.todo.title;
  }

  save() {
    this.isEditing = false;
    this.rename.emit(this.title);
  }
}
