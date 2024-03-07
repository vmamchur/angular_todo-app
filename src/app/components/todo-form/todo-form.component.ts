import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  @Output() add = new EventEmitter();

  todoForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  get title() {
    return this.todoForm.get('title') as FormControl;
  }

  handleSubmit() {
    if (this.todoForm.invalid) {
      return;
    }

    this.add.emit(this.title.value);
    this.todoForm.reset();
  }
}
