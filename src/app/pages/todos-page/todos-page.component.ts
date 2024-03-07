import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { map, switchMap, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { TodoComponent } from '../../components/todo/todo.component';
import { TodoFormComponent } from '../../components/todo-form/todo-form.component';
import { MessageComponent } from '../../components/message/message.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { TodosService } from '../../services/todos.service';
import { MessageService } from '../../services/message.service';
import { Todo } from '../../types/todo';
import { Status } from '../../types/status';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    TodoComponent,
    TodoFormComponent,
    MessageComponent,
    FilterComponent,
  ],
  templateUrl: './todos-page.component.html',
  styleUrl: './todos-page.component.scss',
})
export class TodosPageComponent implements OnInit {
  todos$ = this.todosService.todos$;
  activeTodos$ = this.todos$.pipe(
    map((todos) => todos.filter((todo) => !todo.completed)),
  );
  activeCount$ = this.activeTodos$.pipe(map((todos) => todos.length));
  completedTodos$ = this.todos$.pipe(
    map((todos) => todos.filter((todo) => todo.completed)),
  );
  visibleTodos$ = this.route.params.pipe(
    switchMap((params) => {
      switch (params['status'] as Status) {
        case 'active':
          return this.activeTodos$;

        case 'completed':
          return this.completedTodos$;

        default:
          return this.todos$;
      }
    }),
  );

  constructor(
    private todosService: TodosService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.todosService.getTodos().subscribe({
      error: () => this.messageService.showMessage('Unable to load todos'),
    });
  }

  trackById(_i: number, todo: Todo) {
    return todo.id;
  }

  addTodo(title: string) {
    this.todosService.createTodo(title).subscribe();
  }

  handleTodoDelete(todo: Todo) {
    this.todosService.deleteTodo(todo).subscribe();
  }

  handleTodoRename(todo: Todo, title: string) {
    if (!title.trim().length) {
      this.handleTodoDelete(todo);
    } else {
      this.todosService.updateTodo({ ...todo, title }).subscribe();
    }
  }

  handleTodoToggle(todo: Todo) {
    this.todosService
      .updateTodo({ ...todo, completed: !todo.completed })
      .subscribe();
  }

  handleClearCompleted() {
    this.completedTodos$.pipe(take(1)).subscribe((todos) => {
      todos.forEach((todo) => this.handleTodoDelete(todo));
    });
  }
}
